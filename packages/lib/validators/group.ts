import * as z from "zod";

export const addGroupSchema = z.object({
    name: z.string().min(1),
    view: z.string().cuid(),
});

export const deleteGroupSchema = z.object({
    id: z.string().cuid(),
});