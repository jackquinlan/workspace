"use client";

import React, { forwardRef } from "react";

import type { Group } from "@workspace/db/client";

import { GroupHeader } from "./group-header";

export interface GroupProps {
    children: React.ReactNode;
    group: Group;
}

export const GroupContainer = forwardRef<HTMLDivElement, GroupProps>(
    ({ children, group }: GroupProps, ref) => {
        return (
            <div ref={ref} className="flex flex-col min-h-[200px] w-[400px] border rounded-md shadow bg-zinc-50 outline-none">
                <div className="flex items-center justify-between pr-2">
                    <GroupHeader group={group} />
                </div>
                <ul className="flex flex-col gap-2 p-3">{children}</ul>
            </div>
        );
});
GroupContainer.displayName = "GroupContainer";