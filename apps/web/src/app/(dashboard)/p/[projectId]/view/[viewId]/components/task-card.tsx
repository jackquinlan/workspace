"use client";

import React, { forwardRef, memo } from "react";

import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { Calendar, Flag, MoreHorizontal, Tags } from "lucide-react";

import type { Task } from "@workspace/db/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui";

import { cn } from "@/lib/utils";

interface TaskCardProps {
  listeners?: DraggableSyntheticListeners;
  task: Task;
  style?: React.CSSProperties;
  isDragging?: boolean;
}

export const TaskCard = memo(
  forwardRef<HTMLLIElement, TaskCardProps>(
    ({ task, style, listeners, isDragging }: TaskCardProps, ref) => {
      return (
        <li ref={ref} className="list-none">
          <Card
            className={cn(
              "bg-card flex h-28 flex-col justify-between p-3",
              isDragging && "border-primary border-2",
            )}
            style={style}
            {...listeners}
          >
            <div className="flex flex-col">
              <h1 className="truncate font-medium">{task.content}</h1>
              <h2 className="truncate text-sm">{task.description}</h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-600">
                <Tooltip>
                  <TooltipTrigger>
                    <Calendar className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Deadline</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Flag className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Priority</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <Tags className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Tags</TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <MoreHorizontal className="h-4 w-4" />
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="border-border border bg-orange-500 text-xs text-white">
                    J
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </Card>
        </li>
      );
    },
  ),
);
TaskCard.displayName = "TaskCard";
