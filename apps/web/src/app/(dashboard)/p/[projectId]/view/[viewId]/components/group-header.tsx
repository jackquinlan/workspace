import React from "react";
import { Plus, MoreHorizontal } from "lucide-react";

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
                <Tooltip>
                    <TooltipTrigger>
                        <Plus className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                        Add Task
                    </TooltipContent>
                </Tooltip> 
                <MoreHorizontal className="w-5 h-5" />
            </div>
        </div>
    );
}
