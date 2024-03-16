"use client";

import React from "react";

import { ChevronDownIcon, CircleBackslashIcon, DotsHorizontalIcon, ExitIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import type { User, Workspace, WorkspaceMember } from "@workspace/db/client";
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui";

import { cn } from "@/lib/utils";

// export type MemberWithUser = WorkspaceMember & Omit<User, "hashedPassword">;
export type MemberWithUser = WorkspaceMember & { user: User, workspace: Workspace, currentUser: string };

export const columns: ColumnDef<MemberWithUser>[] = [
    {
        header: "User",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2 w-2/3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={row.original.user.image ?? undefined} />
                        <AvatarFallback className={cn(
                            "border border-border text-white",
                            row.original.user.image ? "bg-accent" : "bg-orange-500"
                        )}>
                            {row.original.user.name?.charAt(0).toUpperCase() ?? "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-xs">
                        <h1 className="font-medium">{row.original.user.name}</h1>
                        <h2>{row.original.user.email}</h2>
                    </div>
                </div>
            );
        },
    },
    {
        header: "Role",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="flex items-center gap-1" size="sm" variant="ghost">
                            {row.original.role.charAt(0).toUpperCase() + row.original.role.slice(1)}
                            <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48" align="end" sideOffset={-3}>
                        Content
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        header: "Actions",
        cell: ({ row }) => {
            const isCurrent = row.original.user.id === row.original.currentUser;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-end w-full outline-none">
                        <div className="p-1 rounded-lg hover:bg-accent">
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48" align="end" sideOffset={-3}>
                        <DropdownMenuItem className="hover:text-destructive">
                            {isCurrent ? (
                                <div className="flex items-center gap-1">
                                    <ExitIcon className="h-4 w-4" />
                                    Leave Workspace
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <CircleBackslashIcon className="h-4 w-4" />
                                    Suspend User 
                                </div>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }
];
