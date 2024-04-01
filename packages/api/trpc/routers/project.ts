import { TRPCError } from "@trpc/server";

import { 
    newProjectSchema,
} from "@workspace/lib/validators/project";

import { createRouter, protectedProcedure } from "../trpc";

export const projectRouter = createRouter({
    newProject: protectedProcedure.input(newProjectSchema).mutation(async (opts) => {
        const project = await opts.ctx.db.project.create({
            data: {
                name: opts.input.name,
                workspaceId: opts.input.workspaceId,
                color: opts.input.color,
            },
        });
        if (!project) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
        }
        return project;
    }),
});