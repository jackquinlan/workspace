import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ExternalLink } from "lucide-react";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";
import { Alert, buttonVariants } from "@workspace/ui";

import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";
import { MembersTable } from "../../components/members-table";
import { columns } from "../../components/members-table-columns";
import { WorkspaceInviteLink } from "../../components/workspace-invite-link";

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
    currentRole: members.filter((m) => m.userId === session.user.id)[0].role,
  }));
  return (
    <div className="mt-12 flex w-full flex-col">
      <PageHeader heading="People" description="Manage who can access this workspace" />
      <WorkspaceInviteLink workspace={workspace} />
      <hr className="mb-4 mt-6" />
      <h1 className="mb-2 font-medium">Manage workspace access</h1>
      <Alert className="flex items-center justify-between text-xs" variant="info">
        <div className="flex flex-col">
          <p>
            Your workspace is currently on the Free plan. All new members will join as
            Administrators.
          </p>
          <p>
            Upgrade to <span className="font-medium">Premium</span> to manage permissions and roles.
          </p>
        </div>
        <Link
          href="/settings/workspace/billing"
          className={cn("flex items-center", buttonVariants({ size: "sm", variant: "outline" }))}
        >
          Upgrade <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </Alert>
      <MembersTable columns={columns} data={extendedMembers} />
    </div>
  );
}
