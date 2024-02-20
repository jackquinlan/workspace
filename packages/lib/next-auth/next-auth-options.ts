import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { db } from "@workspace/db";

import { verifyPassword } from "./hash";

const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, token }) {
            const updatedSession: Session = {
                ...session,
                user: {
                    id: token.id,
                    image: token.picture,
                    email: token.email,
                    emailVerified: token.emailVerified,
                    name: token.name,
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
            return {
                id: userFromPrisma.id,
                picture: userFromPrisma.image,
                name: userFromPrisma.name,
                email: userFromPrisma.email,
                emailVerified: userFromPrisma.emailVerified
                    ? new Date(userFromPrisma.emailVerified).toISOString()
                    : null,
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
                    emailVerified: user.emailVerified?.toISOString() ?? null,
                    name: user.name,
                } satisfies User;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
};

export { authOptions };
