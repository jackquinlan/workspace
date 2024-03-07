"use client";

import React from "react";

import { ChevronsUpDown } from "lucide-react";
import type { Workspace } from "@workspace/db/client";
import { 
    Avatar,
    AvatarFallback,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@workspace/ui";

interface Props {
    // activeWorkspace: Workspace;
    // workspaces: Workspace[];
}

export function WorkspaceSelector({ }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1 outline-none max-w-2/3 hover:bg-accent">
                <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                        <AvatarFallback
                            className="border-border border text-xs font-medium text-white"
                            style={{ backgroundColor: "#dc2626" }}
                        >
                            W
                        </AvatarFallback>
                    </Avatar>
                    <p className="w-full overflow-hidden truncate font-semibold">
                        workspace name
                    </p>
                </div>
                <ChevronsUpDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex w-72 flex-col gap-1" align="start" side="bottom">
                
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
