import { addWorkspaceSchema, switchWorkspaceSchema } from "@workspace/lib/validators/workspace";
import { ThemeColor } from "@workspace/db";

import { createRouter, protectedProcedure } from "../trpc";

export const workspaceRouter = createRouter({
    getWorkspaces: protectedProcedure.query(async (opts) => {
        const workspaces = await opts.ctx.db.workspaceMember.findMany({
            where: {
                userId: opts.ctx.session.user.id,
            },
            include: {
                workspace: true,
            },
        });
        if (!opts.ctx.session.user.workspace && workspaces.length > 0) {
            await opts.ctx.db.user.update({
                where: {
                    id: opts.ctx.session.user.id,
                },
                data: { activeWorkspaceId: workspaces[0].id },
            });
        }
        return workspaces;
    }),
    addWorkspace: protectedProcedure.input(addWorkspaceSchema).mutation(async (opts) => {
        const color = opts.input.color in ThemeColor ? opts.input.color : "sky";
        const workspace = await opts.ctx.db.workspace.create({
            data: {
                color: color as ThemeColor,
                name: opts.input.name,
                type: opts.input.type,
            },
        });
        await opts.ctx.db.workspaceMember.create({
            data: {
                userId: opts.ctx.session.user.id,
                workspaceId: workspace.id,
                role: "owner",
            },
        });
        return workspace;
    }),
    switchWorkspace: protectedProcedure.input(switchWorkspaceSchema).mutation(async (opts) => {
        const workspace = await opts.ctx.db.workspace.findFirst({
            where: {
                id: opts.input.newId,
            },
        });
        if (!workspace) {
            throw new Error("Workspace not found");
        }
        const workspaceMember = await opts.ctx.db.workspaceMember.findFirst({
            where: {
                userId: opts.ctx.session.user.id,
                workspaceId: opts.input.newId,
            },
        });
        if (!workspaceMember) {
            throw new Error("You don't have permission to access this workspace");
        }
        return await opts.ctx.db.user.update({
            where: {
                id: opts.ctx.session.user.id,
            },
            data: {
                activeWorkspaceId: opts.input.newId,
            },
        });
    }),
});