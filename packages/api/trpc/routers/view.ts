import { TRPCError } from "@trpc/server";

import type { ViewType } from "@workspace/db/client";
import { 
    newViewSchema,
} from "@workspace/lib/validators/view";

import { createRouter, protectedProcedure } from "../trpc";

export const viewRouter = createRouter({
    newView: protectedProcedure.input(newViewSchema).mutation(async (opts) => {
        const projectViews = await opts.ctx.db.link.findFirst({
            where: {
                projectId: opts.input.projectId,
            },
            include: { view: true },
            orderBy: {
                // get the # of views attached to the current project
                view: { order: "desc" },
            },
        });
        const last = projectViews?.view.order || 0;
        const view = await opts.ctx.db.view.create({
            data: {
                name: opts.input.name,
                type: opts.input.type as ViewType,
                order: last + 1,
            },
        });
        if (!view) {
            throw new TRPCError({ code: "NOT_FOUND", message: "View not found" });
        }
        await opts.ctx.db.link.create({
            data: {
                projectId: opts.input.projectId,
                viewId: view.id,
            },
        });
        return view;
    }),
});