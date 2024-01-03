import * as z from "zod";

import { 
    addViewSchema, 
    deleteViewSchema, 
} from "@workspace/lib/validators/view";

import { createRouter, protectedProcedure } from "../trpc";

export const viewRouter = createRouter({
    getUserViews: protectedProcedure.query(async (opts) => {
        return await opts.ctx.db.view.findMany({
            where: {
                userId: opts.ctx.session.user.id,
            },
        });
    }),
    getViewInfo: protectedProcedure.input(z.object({ id: z.string().cuid() })).query(async (opts) => {
        return await opts.ctx.db.view.findUnique({
            where: {
                id: opts.input.id,
            },
            include: {
                groups: true,
            },
        });
    }),
    addView: protectedProcedure.input(addViewSchema).mutation(async (opts) => {
        const view = await opts.ctx.db.view.create({
            data: {
                userId: opts.ctx.session.user.id,
                name: opts.input.name,
            },
        });
        // add default group for tasks
        await opts.ctx.db.group.create({
            data: {
                name: "",
                viewId: view.id,
            },
        });
        return view;
    }),
    deleteView: protectedProcedure.input(deleteViewSchema).mutation(async (opts) => {
        return await opts.ctx.db.view.delete({
            where: {
                id: opts.input.id,
            },
        });
    }),
});
