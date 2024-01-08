import { addViewSchema } from "@workspace/lib/validators/view";
import { ThemeColor } from "@workspace/db";


import { createRouter, protectedProcedure } from "../trpc";

export const viewRouter = createRouter({
    getViewsByActiveWorkspace: protectedProcedure.query(async (opts) => {
        return await opts.ctx.db.view.findMany({
            where: {
                workspaceId: opts.ctx.session.user.workspace!,
            },
        });
    }),
    addView: protectedProcedure.input(addViewSchema).mutation(async (opts) => {
        const color = opts.input.color in ThemeColor ? opts.input.color : "sky";
        if (!opts.ctx.session.user.workspace) {
            return new Error("Workspace not found");
        }
        return await opts.ctx.db.view.create({ 
            data: {
                color: color as ThemeColor,
                name:  opts.input.name,
                workspaceId: opts.ctx.session.user.workspace,
            }
        });
    }),
});