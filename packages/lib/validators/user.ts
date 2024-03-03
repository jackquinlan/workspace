import * as z from "zod";

export const editUserSchema = z.object({
    name: z.string().min(2).max(32),
});