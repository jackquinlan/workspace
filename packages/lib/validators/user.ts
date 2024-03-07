import * as z from "zod";

export const editUserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2).max(32),
});

export const deleteUserSchema = z.object({
    id: z.string().cuid(),
});
