import * as z from "zod";

export const newWorkspaceSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    slug: z.string().min(1, { message: "Required" }),
    members: z.array(z.string().email({ message: "Invalid email" })).optional(),
    theme: z.string().min(1),
});

export const switchWorkspaceSchema = z.object({
    oldId: z.string().cuid(),
    newId: z.string().cuid(),
});

export const editWorkspaceSchema = z.object({
    workspaceId: z.string().cuid(),
    name:  z.string().min(1, { message: "Required" }),
    slug:  z.string().min(1, { message: "Required" }),
    theme: z.string().min(1),
});
