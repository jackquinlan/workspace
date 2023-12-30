import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { db } from "@workspace/db";
import { sendVerificationEmail } from "@workspace/lib/auth/send-verification-email";

import { verifyPassword } from "./crypto";

const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, token }) {
            // prettier-ignore
            const updatedSession: Session = {
                ...session,
                user: {
                    id: token.id, name: token.name, email: token.email, image: token.picture, emailVerified: token.emailVerified,
                },
            };
            return updatedSession;
        },
        jwt: async ({ user, token }) => {
            const userFromPrisma = await db.user.findFirst({
                where: { email: token.email },
            });
            if (!userFromPrisma) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }
            // prettier-ignore
            return {
                id: userFromPrisma.id, name: userFromPrisma.name, email: userFromPrisma.email, picture: userFromPrisma.image, 
                emailVerified: userFromPrisma.emailVerified ? new Date(userFromPrisma.emailVerified).toISOString() : null,
            } satisfies JWT;
        },
    },
    adapter: PrismaAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@email.com" },
                password: { label: "Password", type: "password", placeholder: "••••••••••" },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    throw new Error("No credentials were provided");
                }
                const { email, password } = credentials;

                const user = await db.user.findFirst({
                    where: {
                        email: email,
                    },
                });
                if (!user || !user.hashedPassword) {
                    throw new Error("No user found");
                }
                if (!(await verifyPassword(user.hashedPassword, password))) {
                    throw new Error("Invalid email or password.");
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    emailVerified: user.emailVerified?.toISOString() ?? null,
                } satisfies User;
            },
        }),
        /**
         * Add any more providers you want here
         *
         * @see https://next-auth.js.org/configuration/providers
         */
    ],
    session: {
        strategy: "jwt",
    },
    events: {
        signIn: async ({ user, isNewUser }) => {
            if (isNewUser) {
                const userExists = await db.user.findFirst({
                    where: { id: user.id },
                });
                if (!userExists) {
                    return;
                }
                await sendVerificationEmail(userExists);
            }
        },
    },
};

export { authOptions };
