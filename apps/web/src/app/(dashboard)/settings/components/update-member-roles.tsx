"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Check } from "lucide-react";
import { toast } from "sonner";

import { api } from "@workspace/api/react";
import type { Workspace } from "@workspace/db/client";
import { Badge, DropdownMenuItem } from "@workspace/ui";

interface Props {
  workspace: Workspace;
  userId: string;
  userRole: "admin" | "member" | "owner";
  currentUser: string;
}

export function UpdateMemberRoles({ currentUser, userId, userRole, workspace }: Props) {
  const router = useRouter();
  const updateMemberRole = api.workspace.updateMemberRole.useMutation({
    onSuccess: () => {
      router.refresh();
      toast("Member role updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleSubmit(role: "admin" | "member") {
    if (role !== userRole) {
      await updateMemberRole.mutateAsync({
        workspaceId: workspace.id,
        userId: userId,
        role: role,
      });
    }
  }
  return (
    <React.Fragment>
      <DropdownMenuItem
        className="justify-between"
        disabled={userId === currentUser}
        onClick={() => handleSubmit("admin")}
      >
        <div className="grid grid-cols-1 gap-0">
          <h1 className="text-md font-medium">Admin</h1>
          <h2 className="text-xs">Can change settings, invite people, and create projects.</h2>
        </div>
        {userRole === "admin" && <Check className="h-6 w-6" />}
      </DropdownMenuItem>
      <DropdownMenuItem
        className="justify-between"
        disabled={workspace.plan === "free" || userId === currentUser}
        onClick={() => handleSubmit("member")}
      >
        <div className="grid grid-cols-1 gap-0">
          <h1 className="text-md flex items-center gap-1 font-medium">
            Member
            {workspace.plan === "free" && <Badge>Upgrade</Badge>}
          </h1>
          <h2 className="text-xs">
            Can&apos;t change settings, invite people. Can create projects.
          </h2>
        </div>
        {userRole === "member" && <Check className="h-6 w-6" />}
      </DropdownMenuItem>
    </React.Fragment>
  );
}
