import { 
    addGroupSchema, 
    deleteGroupSchema, 
} from "@workspace/lib/validators/group";

import { createRouter, protectedProcedure } from "../trpc";

export const groupRouter = createRouter({
    addGroup: protectedProcedure.input(addGroupSchema).mutation(async (opts) => {
        return await opts.ctx.db.group.create({
            data: {
                name:   opts.input.name,
                viewId: opts.input.view,
            },
        }); 
    }),
    deleteGroup: protectedProcedure.input(deleteGroupSchema).mutation(async (opts) => {
        return await opts.ctx.db.group.delete({
            where: {
                id: opts.input.id,
            },
        });
    }),
});