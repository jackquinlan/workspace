import React from "react";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { PageHeader } from "../components/page-header";

export default async function ProfileSettingsPage() {
    const session = await getServerAuthSession();
    return (
        <div className="flex flex-col w-full space-y-4 mt-12">
            <PageHeader heading="Profile" description="Manage settings for your personal Workspace profile" />
        </div>
    );
}