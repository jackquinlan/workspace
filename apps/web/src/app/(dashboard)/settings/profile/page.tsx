import React from "react";
import { redirect } from "next/navigation";

import { AlertTriangle } from "lucide-react";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { PageHeader } from "@/components/page-header";
import { Shell } from "@/components/shell";

import { DeleteUserModal } from "../components/delete-user-modal";
import { EditProfileForm } from "../components/edit-profile-form";

export default async function ProfileSettingsPage() {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    return (
        <div className="mt-12 flex w-full flex-col">
            <PageHeader
                heading="Profile"
                description="Manage settings for your Workspace profile"
            />
            <EditProfileForm user={session?.user} />
            <hr className="my-4" />
            <Shell className="flex items-center justify-between font-medium text-destructive border-[#FFA9A9] bg-[#FFF3F3] dark:border-[#7F1F1F] dark:bg-[#1F0E0E]">
                <div>
                    <h1 className="text-sm">Delete my account</h1>
                    <h2 className="font-normal text-xs text-black">
                        Permanently delete your account and all associated data.
                    </h2>
                </div>
                <DeleteUserModal user={session?.user} />
            </Shell>
        </div>
    );
}
