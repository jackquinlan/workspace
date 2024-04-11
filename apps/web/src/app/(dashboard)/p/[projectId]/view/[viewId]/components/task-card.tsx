"use client";

import React, { forwardRef, memo } from "react";

import { DraggableSyntheticListeners } from "@dnd-kit/core";

import type { Task } from "@workspace/db/client";
import { Card } from "@workspace/ui";

interface TaskCardProps {
    listeners?: DraggableSyntheticListeners;
    task: Task;
    style?: React.CSSProperties;
}

export const TaskCard = memo(
    forwardRef<HTMLLIElement, TaskCardProps>(({ task, style, listeners }: TaskCardProps, ref) => {
        return (
            <li ref={ref} className="list-none">
                <Card className="bg-card p-3" style={style} {...listeners}>
                    {task.content}
                </Card>
            </li>
        );
    }),
);
TaskCard.displayName = "TaskCard";
