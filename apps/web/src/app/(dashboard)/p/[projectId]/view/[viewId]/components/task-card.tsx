"use client";

import React, { forwardRef } from "react";

import type { Task } from "@workspace/db/client";

interface TaskCardProps {
    task: Task;
}

export const TaskCard = forwardRef<HTMLLIElement, TaskCardProps>(
    ({ task }: TaskCardProps, ref) => {
    return (
        <li ref={ref} className="flex rounded-md p-2 border bg-card">{task.content}</li>
    );
});
TaskCard.displayName = "TaskCard";