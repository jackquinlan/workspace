"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

import { api } from "@workspace/api/react";
import type { Workspace } from "@workspace/db/client";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLink,
  DropdownMenuTrigger,
  Separator,
} from "@workspace/ui";

interface Props {
  activeWorkspace: Workspace;
  workspaces: Workspace[];
}

export function WorkspaceSelector({ activeWorkspace, workspaces }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-w-2/3 hover:bg-accent flex items-center gap-2 rounded-md px-2 py-1 outline-none">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback
              className="border-border border text-xs font-medium text-white"
              style={{ backgroundColor: activeWorkspace.color }}
            >
              {activeWorkspace.name[0]}
            </AvatarFallback>
          </Avatar>
          <p className="w-full overflow-hidden truncate font-semibold">{activeWorkspace.name}</p>
        </div>
        <ChevronsUpDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-72 flex-col gap-1" align="start" side="bottom">
        {workspaces.map((workspace) => (
          <WorkspaceInfo key={workspace.id} activeId={activeWorkspace.id} workspace={workspace} />
        ))}
        <Separator />
        <DropdownMenuLink href="/settings/workspace/general">Workspace settings</DropdownMenuLink>
        <DropdownMenuLink href="/onboarding">Create or join a workspace</DropdownMenuLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function WorkspaceInfo({ activeId, workspace }: { activeId: string; workspace: Workspace }) {
  const router = useRouter();
  const switchWorkspace = api.workspace.switchWorkspace.useMutation({
    onSuccess: () => {
      router.push("/inbox");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  async function handleSwitch() {
    if (activeId !== workspace.id) {
      await switchWorkspace.mutateAsync({ oldId: activeId, newId: workspace.id });
    }
  }
  return (
    <DropdownMenuItem
      className="flex items-center justify-between"
      onClick={() => {
        handleSwitch();
        close();
      }}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarFallback
            className="border-border border text-xs font-medium text-white"
            style={{ backgroundColor: workspace.color }}
          >
            {workspace.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-sm">{workspace.name}</h1>
      </div>
      {activeId === workspace.id && <Check className="h-4 w-4" />}
    </DropdownMenuItem>
  );
}
