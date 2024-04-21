"use client";

import React, { forwardRef } from "react";

import type { Group, Task } from "@workspace/db/client";
import type { ProjectWithGroups } from "@workspace/lib/types/project";

import { GroupHeader } from "./group-header";

export interface GroupProps {
  children: React.ReactNode;
  handleProps?: React.HTMLAttributes<any>;
  group: Group;
  style: React.CSSProperties;
  handleAddTask: (task: Task) => void;
  project: ProjectWithGroups;
}

export const GroupContainer = forwardRef<HTMLDivElement, GroupProps>(
  ({ children, group, handleProps, handleAddTask, project, style }: GroupProps, ref) => {
    return (
      <div
        ref={ref}
        className="flex min-h-[700px] w-[400px] flex-col rounded-md border bg-zinc-50 shadow outline-none"
        style={style}
      >
        <div className="h-3 w-full cursor-grab rounded-t-md hover:bg-zinc-100" {...handleProps} />
        <div className="flex items-center justify-between pr-2">
          <GroupHeader group={group} handleAddTask={handleAddTask} project={project} />
        </div>
        <ul className="flex flex-col gap-2 p-3">{children}</ul>
      </div>
    );
  },
);
GroupContainer.displayName = "GroupContainer";
