import * as z from "zod";

export const addGroupSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    projectId: z.string().cuid(),
});