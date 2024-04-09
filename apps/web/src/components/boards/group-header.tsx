import React from "react";

import type { Group } from "@workspace/db/client";

interface GroupHeaderProps {
    group: Group;
}

export function GroupHeader({ group }: GroupHeaderProps) {
    return (
        <div className="flex items-center justify-between w-full px-3 py-1 font-medium cursor-grab">
            {group.name}
        </div>
    );
}