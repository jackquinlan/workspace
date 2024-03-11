import React from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { NewWorkspaceForm } from "./new-workspace-form";

export default async function OnboardingPage() {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    return (
        <div className="flex flex-col items-center space-y-4 w-full mt-32">
            <h1 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
                Create a workspace that works for you.
            </h1>
            <NewWorkspaceForm user={session.user} />
        </div>
    );
}
