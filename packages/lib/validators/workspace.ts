import * as z from "zod";

export const addWorkspaceSchema = z.object({
    name: z.string().min(1),
    type: z.enum(["personal", "team"]),
    color: z.string().min(1),
});

export const switchWorkspaceSchema = z.object({
    oldId: z.string().cuid(),
    newId: z.string().cuid(),
});
