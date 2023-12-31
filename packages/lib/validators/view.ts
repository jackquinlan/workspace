import * as z from "zod";

export const addViewSchema = z.object({
    name: z.string().min(1),
});

export const deleteViewSchema = z.object({
    id: z.string().cuid(),
});
