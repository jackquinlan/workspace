import React from "react";
import { redirect } from "next/navigation";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { PageHeader } from "@/components/page-header";
import { EditWorkspace } from "../../components/workspace-form";

export default async function GeneralWorkspaceSettings() {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    const workspace = await db.workspace.findFirst({
        where: { id: session.user.activeWorkspace },
    });
    return (
        <div className="mt-12 flex w-full flex-col">
            <PageHeader
                heading="General"
                description="Manage settings for your Workspace"
            />
            <EditWorkspace activeWorkspace={workspace!} />
            <hr className="my-4" />
        </div>
    );
}