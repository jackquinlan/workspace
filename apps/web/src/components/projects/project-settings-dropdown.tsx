"use client";

import React from "react";

import { MoreHorizontal } from "lucide-react";

import type { Project } from "@workspace/db/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@workspace/ui";

interface Props {
  project: Project;
}

export function ProjectSettingsDropdown({ project }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <MoreHorizontal className="hover:bg-accent h-7 w-7 rounded-md p-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {project.name} options
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
