import * as z from "zod";

export const newWorkspaceSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  slug: z.string().min(1, { message: "Required" }),
  theme: z.string().min(1),
});

export const switchWorkspaceSchema = z.object({
  oldId: z.string().cuid(),
  newId: z.string().cuid(),
});

export const editWorkspaceSchema = z.object({
  workspaceId: z.string().cuid(),
  name: z.string().min(1, { message: "Required" }),
  slug: z.string().min(1, { message: "Required" }),
  theme: z.string().min(1),
});

export const deleteWorkspaceSchema = z.object({
  workspaceId: z.string().cuid(),
});

export const editInviteLinkSchema = z.object({
  workspaceId: z.string().cuid(),
  inviteSlugEnabled: z.boolean(),
  inviteSlug: z.string().uuid(),
});

export const leaveWorkspaceSchema = z.object({
  workspaceId: z.string().cuid(),
});

export const transferOwnshipSchema = z.object({
  workspaceId: z.string().cuid(),
  userId: z.string().cuid(),
});

export const updateMemberRoleSchema = z.object({
  workspaceId: z.string().cuid(),
  userId: z.string().cuid(),
  role: z.enum(["admin", "member"]),
});

export const removeMemberSchema = z.object({
  membershipId: z.string().cuid(),
});
