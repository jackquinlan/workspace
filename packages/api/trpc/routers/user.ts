import { addHours } from "date-fns";
import { User } from "next-auth";

import { sendEmail } from "@workspace/emails/send";
import { ForgotPasswordTemplate } from "@workspace/emails/templates";
import { hashPassword } from "@workspace/lib/next-auth/hash";
import { sendVerificationEmail } from "@workspace/lib/next-auth/send-verification-email";
import { getBaseUrl } from "@workspace/lib/utils/get-base-url";
import {
    forgotPasswordSchema,
    resetPasswordSchema,
    signUpSchema,
    verifyEmailSchema,
} from "@workspace/lib/validators/auth";
import { deleteUserSchema, editUserSchema } from "@workspace/lib/validators/user";

import { createRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createRouter({
    signUp: publicProcedure.input(signUpSchema).mutation(async (opts) => {
        const userExists = await opts.ctx.db.user.findFirst({
            where: {
                email: opts.input.email,
            },
        });
        if (userExists) {
            throw new Error("User already exists.");
        }
        const user = await opts.ctx.db.user.create({
            data: {
                email: opts.input.email,
                hashedPassword: await hashPassword(opts.input.password),
                name: opts.input.email.split("@")[0],
            },
        });
        if (!user) {
            throw new Error("Failed to create user.");
        }
    }),
    forgotPassword: publicProcedure.input(forgotPasswordSchema).mutation(async (opts) => {
        const userExists = await opts.ctx.db.user.findFirst({
            where: {
                email: opts.input.email,
            },
        });
        if (!userExists || !userExists.hashedPassword) {
            throw new Error("User does not exist.");
        }
        const token = await opts.ctx.db.resetPasswordToken.create({
            data: {
                userId: userExists.id,
                expiresAt: addHours(Date.now(), 2),
            },
        });
        const resetLink = `${getBaseUrl()}/reset-password?token=${token.id}`;
        return await sendEmail({
            react: ForgotPasswordTemplate({ resetLink: resetLink }),
            subject: "Reset your password",
            to: [userExists.email],
            from: process.env.SENDER_EMAIL_ADDRESS!,
        });
    }),
    resetPassword: publicProcedure.input(resetPasswordSchema).mutation(async (opts) => {
        const token = await opts.ctx.db.resetPasswordToken.findFirst({
            where: {
                id: opts.input.token,
            },
        });
        if (!token) {
            throw new Error("Invalid token.");
        }
        const user = await opts.ctx.db.user.findFirst({
            where: {
                id: token.userId,
            },
        });
        if (!user) {
            throw new Error("Invalid token.");
        }
        const newHashedPassword = await hashPassword(opts.input.password);
        await opts.ctx.db.user.update({
            where: {
                id: user.id,
            },
            data: {
                hashedPassword: newHashedPassword,
            },
        });
        await opts.ctx.db.resetPasswordToken.update({
            where: {
                id: token.id,
            },
            data: {
                used: true,
            },
        });
    }),
    sendVerificationEmail: publicProcedure.input(verifyEmailSchema).mutation(async (opts) => {
        const userExists = await opts.ctx.db.user.findFirst({
            where: {
                email: opts.input.email,
            },
        });
        if (!userExists) {
            throw new Error("User does not exist.");
        }
        return await sendVerificationEmail(userExists);
    }),
    editUser: protectedProcedure.input(editUserSchema).mutation(async (opts) => {
        const update = await opts.ctx.db.user.update({
            where: {
                id: (opts.ctx.session.user as User).id,
            },
            data: {
                name: opts.input.name,
            },
        });
        if (!update) {
            throw new Error("Failed to update user.");
        }
        return { name: update.name };
    }),
    deleteUser: protectedProcedure.input(deleteUserSchema).mutation(async (opts) => {
        const user = await opts.ctx.db.user.findUnique({
            where: {
                id: opts.input.id,
            },
        });
        if (!user) {
            throw new Error("User does not exist.");
        }
        await opts.ctx.db.user.delete({
            where: {
                id: user.id,
            },
        });
    }),
});
