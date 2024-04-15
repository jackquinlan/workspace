"use client";

import React from "react";

import { Copy, Settings } from "lucide-react";

import type { View } from "@workspace/db/client";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui";

import { DeleteViewModal } from "./delete-view-modal";
import { EditViewModal } from "./edit-view-modal";

interface Props {
  projectId: string;
  view: View;
}

export function ViewSettingsDropdown({ projectId, view }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="xs" variant="ghost" className="flex items-center gap-1">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" align="end">
        <EditViewModal view={view} />
        <DropdownMenuItem className="flex items-center gap-1 py-0.5">
          <Copy className="h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DeleteViewModal projectId={projectId} view={view} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
