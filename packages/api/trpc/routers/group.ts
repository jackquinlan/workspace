import { TRPCError } from "@trpc/server";

import { addGroupSchema } from "@workspace/lib/validators/group";
import { createRouter, protectedProcedure } from "../trpc";

export const groupRouter = createRouter({
    addGroup: protectedProcedure.input(addGroupSchema).mutation(async (opts) => {
        const group = await opts.ctx.db.group.create({
            data: {
                name: opts.input.name, projectId: opts.input.projectId,
            },
        });
        return group;
    }),
});