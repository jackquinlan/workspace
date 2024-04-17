import React from "react";

import { MoreHorizontal } from "lucide-react";

import type { Group, Task } from "@workspace/db/client";
import type { ProjectWithGroups } from "@workspace/lib/types/project";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui";

import { CreateTaskModal } from "@/components/projects/create-task-modal";
import { ThemeSquare } from "@/components/theme-square";

interface GroupHeaderProps {
  group: Group;
  handleAddTask: (task: Task) => void;
  project: ProjectWithGroups;
}

export function GroupHeader({ group, handleAddTask, project }: GroupHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between px-3 py-1 font-medium">
      <div className="flex items-center gap-2">
        <ThemeSquare color={group.color} className="h-3 w-3" />
        {group.name}
      </div>
      <div className="flex items-center gap-2">
        <MoreHorizontal className="h-5 w-5" />
        <Tooltip>
          <TooltipTrigger>
            <CreateTaskModal handleAddTask={handleAddTask} defaultGroup={group} project={project} />
          </TooltipTrigger>
          <TooltipContent>Add Task</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
