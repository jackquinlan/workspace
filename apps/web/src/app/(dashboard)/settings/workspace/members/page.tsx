import React from "react";
import { redirect } from "next/navigation";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { PageHeader } from "@/components/page-header";
import { columns } from "../../components/members-table-columns";
import { WorkspaceInviteLink } from "../../components/workspace-invite-link";
import { MembersTable } from "../../components/members-table";

export default async function MemberSettings() {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    const workspace = await db.workspace.findFirst({
        where: { id: session.user.activeWorkspace },
    });
    if (!workspace) {
        return redirect("/onboarding");
    }
    const members = await db.workspaceMember.findMany({
        where: { 
            workspaceId: workspace.id,
        },
        include: { user: true, workspace: true },
    });
    const extendedMembers = members.map((member) => ({ 
        ...member, 
        currentUser: session.user.id,
        currentRole: members.filter(m => m.userId === session.user.id)[0].role,
    }));
    return (
        <div className="mt-12 flex w-full flex-col">
            <PageHeader heading="Members" description="Manage who can access this workspace" />
            <WorkspaceInviteLink workspace={workspace} />
            <hr className="mb-4 mt-6" />
            <h1 className="font-medium mb-2">Manage members</h1>
            <h2 className="text-xs leading-4">
                Your workspace is currently on the Free plan. All new members will join as Administrators.
                <br />Upgrade to the <span className="underline underline-offset-2">Premium Plan</span> to manage roles and permissions.
            </h2>
            <MembersTable columns={columns} data={extendedMembers} />
        </div>
    );
}
