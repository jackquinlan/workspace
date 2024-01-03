"use client";

import React from "react";

import { ChevronDown } from "lucide-react";

import type { Group } from "@workspace/db";

import { GroupSettings } from "./group-settings-menu";

interface Props {
    group: Group;
}

export function GroupHeader({ group }: Props) {
    return (
        <div className="flex items-center justify-between border-b border-b-border">
            <h1 className="flex items-center gap-1 text-sm font-bold py-1 px-3 cursor-pointer">
                <ChevronDown className="w-4 h-4 rounded-md hover:bg-muted" />
                {group.name}
            </h1>
            <GroupSettings group={group} />
        </div>
    );
}