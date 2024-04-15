import React from "react";

import { MoreHorizontal, Plus } from "lucide-react";

import type { Group } from "@workspace/db/client";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui";

import { ThemeSquare } from "@/components/theme-square";

interface GroupHeaderProps {
  group: Group;
}

export function GroupHeader({ group }: GroupHeaderProps) {
  return (
    <div className="flex w-full cursor-grab items-center justify-between px-3 py-1 font-medium">
      <div className="flex items-center gap-2">
        <ThemeSquare color={group.color} className="h-3 w-3" />
        {group.name}
      </div>
      <div className="flex items-center gap-2">
        <MoreHorizontal className="h-5 w-5" />
        <Tooltip>
          <TooltipTrigger>
            <Plus className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>Add Task</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
