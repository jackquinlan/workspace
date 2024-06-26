import { TRPCError } from "@trpc/server";
import type { User } from "next-auth";

import {
  deleteWorkspaceSchema,
  editWorkspaceSchema,
  leaveWorkspaceSchema,
  newWorkspaceSchema,
  removeMemberSchema,
  switchWorkspaceSchema,
  transferOwnshipSchema,
  updateMemberRoleSchema,
} from "@workspace/lib/validators/workspace";

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
      throw new TRPCError({ code: "NOT_FOUND", message: "Workspace not found" });
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
        id: (opts.ctx.session.user as User).id,
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
      throw new TRPCError({ code: "NOT_FOUND", message: "Workspace not found" });
    }
    const workspaceMember = await opts.ctx.db.workspaceMember.findFirst({
      where: {
        userId: (opts.ctx.session.user as User).id,
        workspaceId: opts.input.newId,
      },
    });
    if (!workspaceMember) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You don't have permission to access this workspace",
      });
    }
    return await opts.ctx.db.user.update({
      where: {
        id: (opts.ctx.session.user as User).id,
      },
      data: {
        activeWorkspace: opts.input.newId,
      },
    });
  }),
  editWorkspace: protectedProcedure.input(editWorkspaceSchema).mutation(async (opts) => {
    const membership = await opts.ctx.db.workspaceMember.findFirst({
      where: {
        userId: (opts.ctx.session.user as User).id,
        workspaceId: opts.input.workspaceId,
      },
    });
    if (!membership || !["admin", "owner"].includes(membership.role)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You don't have permission to access this workspace",
      });
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
  deleteWorkspace: protectedProcedure.input(deleteWorkspaceSchema).mutation(async (opts) => {
    const membership = await opts.ctx.db.workspaceMember.findFirst({
      where: {
        userId: (opts.ctx.session.user as User).id,
        workspaceId: opts.input.workspaceId,
      },
    });
    if (!membership || !["owner"].includes(membership.role)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You don't have permission to access this workspace",
      });
    }
    await opts.ctx.db.workspace.delete({
      where: {
        id: opts.input.workspaceId,
      },
    });
    // TODO: Change all users activeWorkspace to another workspace
    await opts.ctx.db.user.update({
      where: {
        id: (opts.ctx.session.user as User).id,
      },
      data: { activeWorkspace: null },
    });
  }),
  leaveWorkspace: protectedProcedure.input(leaveWorkspaceSchema).mutation(async (opts) => {
    const membership = await opts.ctx.db.workspaceMember.findFirst({
      where: {
        userId: (opts.ctx.session.user as User).id,
        workspaceId: opts.input.workspaceId,
      },
    });
    if (!membership) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You don't have permission to access this workspace",
      });
    }
    if (membership.role === "owner") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You can't leave a workspace you own. Transfer ownership to another member first.",
      });
    }
    await opts.ctx.db.workspaceMember.delete({
      where: {
        id: membership.id,
      },
    });
    await opts.ctx.db.user.update({
      where: {
        id: (opts.ctx.session.user as User).id,
      },
      data: { activeWorkspace: null },
    });
  }),
  transferOwnership: protectedProcedure.input(transferOwnshipSchema).mutation(async (opts) => {
    const currentOwner = await opts.ctx.db.workspaceMember.findFirst({
      where: {
        userId: (opts.ctx.session.user as User).id,
        workspaceId: opts.input.workspaceId,
      },
    });
    if (!currentOwner || currentOwner.role !== "owner") {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You don't have permission to access this workspace",
      });
    }
    const newOwner = await opts.ctx.db.workspaceMember.findFirst({
      where: {
        userId: opts.input.userId,
        workspaceId: opts.input.workspaceId,
      },
    });
    if (!newOwner) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found in this workspace",
      });
    }
    await opts.ctx.db.workspaceMember.update({
      where: {
        id: currentOwner.id,
      },
      data: { role: "admin" },
    });
    return await opts.ctx.db.workspaceMember.update({
      where: {
        id: newOwner.id,
      },
      data: { role: "owner" },
    });
  }),
  updateMemberRole: protectedProcedure.input(updateMemberRoleSchema).mutation(async (opts) => {
    const currentUser = await opts.ctx.db.workspaceMember.findFirst({
      where: {
        userId: (opts.ctx.session.user as User).id,
        workspaceId: opts.input.workspaceId,
      },
    });
    if (!currentUser || !["admin", "owner"].includes(currentUser.role)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You don't have permission to update user roles in this workspace",
      });
    }
    const workspace = await opts.ctx.db.workspace.findUnique({
      where: { id: opts.input.workspaceId },
    });
    if (!workspace) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Workspace not found" });
    }
    if (workspace.plan !== "premium") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "You need to upgrade to the premium plan to manage roles",
      });
    }
    const member = await opts.ctx.db.workspaceMember.findFirst({
      where: {
        userId: opts.input.userId,
        workspaceId: opts.input.workspaceId,
      },
    });
    if (!member) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found in this workspace" });
    }
    await opts.ctx.db.workspaceMember.update({
      where: {
        id: member.id,
      },
      data: { role: opts.input.role },
    });
  }),
  removeMember: protectedProcedure.input(removeMemberSchema).mutation(async (opts) => {
    const membership = await opts.ctx.db.workspaceMember.findFirst({
      where: { id: opts.input.membershipId },
    });
    if (!membership) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Membership not found" });
    }
    const user = await opts.ctx.db.user.findFirst({
      where: { id: membership.userId },
    });
    if (user?.activeWorkspace === membership.workspaceId) {
      await opts.ctx.db.user.update({
        where: { id: user.id },
        data: { activeWorkspace: null },
      });
    }
    await opts.ctx.db.workspaceMember.delete({
      where: { id: membership.id },
    });
  }),
});
