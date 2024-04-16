import * as z from "zod";

export const newProjectSchema = z.object({
  name: z.string().min(1),
  workspaceId: z.string().cuid(),
  color: z.string().min(1),
});
