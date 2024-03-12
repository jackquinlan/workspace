import type { User } from "next-auth";

import { editWorkspaceSchema, newWorkspaceSchema, switchWorkspaceSchema } from "@workspace/lib/validators/workspace";

import { createRouter, protectedProcedure } from "../trpc";

export const workspaceRouter = createRouter({
    newWorkspace: protectedProcedure.input(newWorkspaceSchema).mutation(async (opts) => {
        const workspace = await opts.ctx.db.workspace.create({
            data: {
                color: opts.input.theme,
                name: opts.input.name,
                slug: opts.input.slug,
            },
        });
        if (!workspace) {
            throw new Error("Failed to create workspace");
        }
        // Create owner 
        await opts.ctx.db.workspaceMember.create({
            data: {
                userId: (opts.ctx.session.user as User).id,
                workspaceId: workspace.id,
                role: "owner",
            },
        });
        await opts.ctx.db.user.update({
            where: { 
                id: (opts.ctx.session.user as User).id 
            },
            data: { activeWorkspace: workspace.id },
        });
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
                userId: (opts.ctx.session.user as User).id,
                workspaceId: opts.input.newId,
            },
        });
        if (!workspaceMember) {
            throw new Error("You don't have permission to access this workspace");
        }
        return await opts.ctx.db.user.update({
            where: {
                id: (opts.ctx.session.user as User).id  
            },
            data: {
                activeWorkspace: opts.input.newId,
            },
        });
    }),
    editWorkspace: protectedProcedure.input(editWorkspaceSchema).mutation(async (opts) => {
        const membership = await opts.ctx.db.workspaceMember.findFirst({
            where : {
                userId: (opts.ctx.session.user as User).id,
                workspaceId: opts.input.workspaceId,
            },
        });
        if (!membership || !["admin", "owner"].includes(membership.role)) {
            throw new Error("You don't have permission to edit this workspace");
        }
        return await opts.ctx.db.workspace.update({
            where: {
                id: opts.input.workspaceId,
            },
            data: {
                color: opts.input.theme,
                name: opts.input.name,
                slug: opts.input.slug,
            },
        });
    }),
});
