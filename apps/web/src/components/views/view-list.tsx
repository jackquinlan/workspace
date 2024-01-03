import React from "react";

import type { Group, View } from "@workspace/db";

import { CreateNewTask } from "@/components/tasks/create-new-task";
import { CreateNewViewGroup } from "@/components/views/create-new-view-group";
import { GroupHeader } from "@/components/views/group-header";

interface Props {
    groups: Group[];
    view: View;
}

export function ViewList({ groups, view }: Props) {
    return (
        <div className="flex flex-col">
            {groups.map((group, i) => (
                <div key={i} className="space-y-2 mb-3">
                    {group.name !== "" && (
                        <GroupHeader group={group} />
                    )}
                    <CreateNewTask />
                </div>
            ))} 
            <div className="flex flex-col gap-1 -mt-2">
                <CreateNewViewGroup view={view} />
            </div>
        </div>
    );
}
