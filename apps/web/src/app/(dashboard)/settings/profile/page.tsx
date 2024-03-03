import React from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { EditProfileForm } from "../components/edit-profile-form";
import { PageHeader } from "../components/page-header";

export default async function ProfileSettingsPage() {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    return (
        <div className="flex flex-col w-full space-y-4 mt-12">
            <PageHeader heading="Profile" description="Manage settings for your personal Workspace profile" />
            <EditProfileForm user={session?.user} />
        </div>
    );
}