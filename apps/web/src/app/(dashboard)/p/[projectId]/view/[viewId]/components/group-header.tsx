import React from "react";

import type { Group } from "@workspace/db/client";
import { ThemeSquare } from "@/components/theme-square";

interface GroupHeaderProps {
    group: Group;
}

export function GroupHeader({ group }: GroupHeaderProps) {
    return (
        <div className="flex items-center gap-2 w-full px-3 py-1 font-medium cursor-grab">
            <ThemeSquare color={group.color} className="w-3 h-3" />
            {group.name}
        </div>
    );
}