import * as z from "zod";

export const addTaskSchema = z.object({
  content: z.string().min(1),
  description: z.string().optional(),
  groupId: z.string().min(1),
});
