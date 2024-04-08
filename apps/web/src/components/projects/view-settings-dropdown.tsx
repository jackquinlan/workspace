"use client";

import React from "react";

import { Copy, Settings } from "lucide-react";

import type { View } from "@workspace/db/client";
import { 
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@workspace/ui";

import { DeleteViewModal } from "./delete-view-modal";
import { EditViewModal } from "./edit-view-modal";

interface Props {
    projectId: string;
    view: View;
}

export function ViewSettingsDropdown({ projectId, view }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="xs" variant="ghost" className="flex items-center gap-1">
                    <Settings className="w-4 h-4" /> Settings
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36" align="end" sideOffset={-2}>
                <DropdownMenuLabel>View options</DropdownMenuLabel>
                <EditViewModal view={view} />
                <DropdownMenuItem className="flex items-center gap-1 py-0.5">
                    <Copy className="h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DeleteViewModal projectId={projectId} view={view} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}