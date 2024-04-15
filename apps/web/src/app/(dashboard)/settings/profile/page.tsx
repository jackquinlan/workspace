import React from "react";
import { redirect } from "next/navigation";

import { AlertTriangle } from "lucide-react";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { PageHeader } from "@/components/page-header";
import { Shell } from "@/components/shell";
import { DeleteUserModal } from "../components/delete-user-modal";
import { EditProfileForm } from "../components/profile-form";
import { UpdateAvatar } from "../components/update-avatar";

export default async function ProfileSettingsPage() {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/login");
  }
  return (
    <div className="mt-12 flex w-full flex-col">
      <PageHeader heading="Profile" description="Manage settings for your Workspace profile" />
      <UpdateAvatar user={session?.user} />
      <EditProfileForm user={session?.user} />
      <hr className="my-4" />
      <Shell className="flex items-center justify-between bg-zinc-50 font-medium">
        <div>
          <h1 className="flex items-center gap-1 text-sm">
            <AlertTriangle className="text-destructive h-4 w-4" />
            Delete my account
          </h1>
          <h2 className="text-xs font-normal text-black">
            Permanently delete your account and all associated data.
          </h2>
        </div>
        <DeleteUserModal user={session?.user} />
      </Shell>
    </div>
  );
}
