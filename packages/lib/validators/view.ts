import * as z from "zod";

export const newViewSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    type: z.string().min(1),
    projectId: z.string().cuid(),
});