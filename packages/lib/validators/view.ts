import * as z from "zod";

export const newViewSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    type: z.string().min(1),
    projectId: z.string().cuid(),
});

export const deleteViewSchema = z.object({
    id: z.string().cuid(),
});
