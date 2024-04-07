import { db } from "@workspace/db";
import type { Workspace } from "@workspace/db/client";

export async function addMemberToWorkspace(
    userId: string,
    workspace: Workspace,
    role: "admin" | "member",
) {
    // Make sure user is not already a member
    const existingMembership = await db.workspaceMember.findFirst({
        where: { userId, workspaceId: workspace.id },
    });
    if (existingMembership) {
        return existingMembership;
    }
    const membership = await db.workspaceMember.create({
        data: {
            userId,
            workspaceId: workspace.id,
            role: role,
        },
    });
    // set users default workspace
    await db.user.update({
        where: {
            id: userId,
        },
        data: { activeWorkspace: workspace.id },
    });
    return membership;
}
