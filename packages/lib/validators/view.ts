import * as z from "zod";

export const addViewSchema = z.object({
    color: z.string().min(1),
    name:  z.string().min(1, { message: "Required" }),
});