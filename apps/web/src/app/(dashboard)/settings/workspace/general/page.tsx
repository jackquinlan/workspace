import React from "react";
import { redirect } from "next/navigation";

import { AlertTriangle } from "lucide-react";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { PageHeader } from "@/components/page-header";
import { Shell } from "@/components/shell";
import { DeleteWorkspaceModal } from "../../components/delete-workspace-modal";
import { EditWorkspaceForm } from "../../components/edit-workspace-form";

export default async function GeneralWorkspaceSettings() {
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
    return (
        <div className="mt-12 flex w-full flex-col">
            <PageHeader heading="General" description="Manage settings for your Workspace" />
            <EditWorkspaceForm activeWorkspace={workspace} />
            <hr className="my-4" />
            <Shell className="flex items-center justify-between bg-zinc-50 font-medium">
                <div>
                    <h1 className="flex items-center gap-1 text-sm">
                        <AlertTriangle className="text-destructive h-4 w-4" />
                        Delete workspace 
                    </h1>
                    <h2 className="text-xs font-normal text-black">
                        Permanently delete this workspace and all associated data.
                    </h2>
                </div>
                <DeleteWorkspaceModal workspace={workspace} />
            </Shell>
        </div>
    );
}
