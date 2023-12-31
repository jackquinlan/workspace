import { addViewSchema, deleteViewSchema } from "@workspace/lib/validators/view";

import { createRouter, protectedProcedure } from "../trpc";

export const viewRouter = createRouter({
    getUserViews: protectedProcedure.query(async (opts) => {
        return await opts.ctx.db.view.findMany({
            where: {
                userId: opts.ctx.session.user.id,
            },
        });
    }),
    addView: protectedProcedure.input(addViewSchema).mutation(async (opts) => {
        return await opts.ctx.db.view.create({
            data: {
                userId: opts.ctx.session.user.id,
                name: opts.input.name,
            },
        });
    }),
    deleteView: protectedProcedure.input(deleteViewSchema).mutation(async (opts) => {
        return await opts.ctx.db.view.delete({
            where: {
                id: opts.input.id,
            },
        });
    }),
});
