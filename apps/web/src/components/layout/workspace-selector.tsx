"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { CaretSortIcon, CheckIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { api } from "@workspace/api/react";
import type { Workspace } from "@workspace/db/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui";

interface Props {
  active: Workspace;
  workspaces: Workspace[];
}

export function WorkspaceSelector({ active, workspaces }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-w-2/3 hover:bg-accent flex items-center gap-2 rounded-md px-2 py-1 outline-none">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={active.image ?? undefined} />
            <AvatarFallback
              className="border-border border text-sm font-medium text-white"
              style={{ backgroundColor: active.color }}
            >
              {active.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="w-full overflow-hidden truncate font-semibold text-sm">{active.name}</p>
        </div>
        <CaretSortIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-72 flex-col gap-1" align="start" side="bottom">
        <DropdownMenuLabel>My Workspaces</DropdownMenuLabel>
        {workspaces.map((workspace) => (
          <WorkspaceInfo key={workspace.id} activeId={active.id} workspace={workspace} />
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLink href="/settings/workspace/general">
          <GearIcon className="h-4 w-4" />
          Workspace settings
        </DropdownMenuLink>
        <DropdownMenuLink href="/onboarding">
          <PlusIcon className="h-4 w-4" />
          Create or join a workspace
        </DropdownMenuLink>
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
        <Avatar className="h-7 w-7">
          <AvatarImage src={workspace.image ?? undefined} />
          <AvatarFallback
            className="border-border border text-xs font-medium text-white"
            style={{ backgroundColor: workspace.color }}
          >
            {workspace.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-sm">{workspace.name}</h1>
      </div>
      {activeId === workspace.id && <CheckIcon className="h-4 w-4" />}
    </DropdownMenuItem>
  );
}
