import { addHours } from "date-fns";

import { hashPassword } from "@workspace/lib/next-auth/hash";
import { signUpSchema, forgotPasswordSchema, resetPasswordSchema } from "@workspace/lib/validators/auth";

import { createRouter, publicProcedure } from "../trpc";

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
        // const resetLink = `${url}/reset-password?token=${token.id}`;
        // return await resend.emails.send({
        //     from: "Jack <no-reply@jackquinlan.co>",
        //     to: [userExists.email],
        //     subject: "Reset your password",
        //     react: ResetPasswordEmail({ resetLink: resetLink }),
        // });
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
});