import React from "react";

import type { Group } from "@workspace/db/client";

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
        </div>
    );
}
