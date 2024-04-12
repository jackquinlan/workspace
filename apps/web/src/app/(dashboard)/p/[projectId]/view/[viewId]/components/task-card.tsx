"use client";

import React, { forwardRef, memo } from "react";

import { Calendar, Flag, MoreHorizontal, Tags } from "lucide-react";
import { DraggableSyntheticListeners } from "@dnd-kit/core";

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
    forwardRef<HTMLLIElement, TaskCardProps>(({ task, style, listeners, isDragging }: TaskCardProps, ref) => {
        return (
            <li ref={ref} className="list-none">
                <Card className={cn("flex flex-col justify-between h-28 bg-card p-3", isDragging && "border-2 border-primary")} style={style} {...listeners}>
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <h1 className="font-medium truncate">{task.content}</h1>
                            <MoreHorizontal className="w-4 h-4" />
                        </div>
                        <h2 className="text-sm truncate">
                            {task.description}
                        </h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-600">
                            <Tooltip>
                                <TooltipTrigger>
                                    <Calendar className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent side="bottom">Deadline</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Flag className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent side="bottom">Priority</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Tags className="w-4 h-4" />
                                </TooltipTrigger>
                                <TooltipContent side="bottom">Tags</TooltipContent>
                            </Tooltip>
                        </div>
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="border-border border text-xs text-white bg-orange-500">J</AvatarFallback>
                        </Avatar>
                    </div>
                </Card>
            </li>
        );
    }),
);
TaskCard.displayName = "TaskCard";
