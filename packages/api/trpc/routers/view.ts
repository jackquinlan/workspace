import { TRPCError } from "@trpc/server";

import type { ViewType } from "@workspace/db/client";
import { deleteViewSchema, editViewSchema, newViewSchema } from "@workspace/lib/validators/view";

import { createRouter, protectedProcedure } from "../trpc";

export const viewRouter = createRouter({
    newView: protectedProcedure.input(newViewSchema).mutation(async (opts) => {
        const projectViews = await opts.ctx.db.view.findFirst({
            where: {
                projectId: opts.input.projectId,
            },
            orderBy: {
                // get the # of views attached to the current project
                order: "desc" 
            },
        });
        const last = projectViews?.order || 0;
        const view = await opts.ctx.db.view.create({
            data: {
                name: opts.input.name,
                type: opts.input.type as ViewType,
                order: last + 1,
                projectId: opts.input.projectId,
            },
        });
        return view;
    }),
    deleteView: protectedProcedure.input(deleteViewSchema).mutation(async (opts) => {
        const view = await opts.ctx.db.view.delete({
            where: { id: opts.input.viewId },
        });
        return view;
    }),
    editView: protectedProcedure.input(editViewSchema).mutation(async (opts) => {
        const view = await opts.ctx.db.view.update({
            where: { id: opts.input.viewId },
            data: {
                name: opts.input.name,
                type: opts.input.type as ViewType,
            },
        });
        return view;
    }),
});
