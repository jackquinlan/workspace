"use client";

import React, { useState } from "react";

import { CircleBackslashIcon, ChevronDownIcon, DotsHorizontalIcon, ExitIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

import type { User, Workspace, WorkspaceMember, WorkspaceMemberRole } from "@workspace/db/client";
import { api } from "@workspace/api/react";
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage,
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui";

import { cn } from "@/lib/utils";
import { LeaveWorkspaceModal } from "./leave-workspace-modal";
import { TransferOwnerModal } from "./transfer-owner-modal";

export type MemberWithUser = WorkspaceMember & { 
    currentUser: string,
    currentRole: WorkspaceMemberRole
    user: User, 
    workspace: Workspace, 
};

export const columns: ColumnDef<MemberWithUser>[] = [
    {
        accessorKey: "info",
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
                        <h1 className="font-medium">
                            {row.original.user.name}
                            {row.original.user.id === row.original.currentUser && " (You)"}
                        </h1>
                        <h2>{row.original.user.email}</h2>
                    </div>
                </div>
            );
        },
        filterFn: (row, _, value) => {
            return row.original.user.email.includes(value) || row.original.user.name!.includes(value);
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={row.original.role === "member"}>
                        <Button className="flex items-center gap-1" size="sm" variant="ghost">
                            {row.original.role.charAt(0).toUpperCase() + row.original.role.slice(1)}
                            <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60" align="end" sideOffset={-3}>
                        {row.original.currentRole === "owner" && row.original.user.id !== row.original.currentUser && (
                            <TransferOwnerModal workspace={row.original.workspace} newOwnerId={row.original.user.id} />
                        )}
                        <DropdownMenuItem className="grid grid-cols-1 gap-0" disabled={row.original.user.id === row.original.currentUser}>
                            <h1 className="font-medium text-md">Admin</h1>
                            <h2 className="text-xs">
                                Can change settings, invite people, and create projects.
                            </h2>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="grid grid-cols-1 gap-0" disabled={row.original.workspace.plan === "free"}>
                            <h1 className="flex items-center gap-1 font-medium text-md">
                                Member
                                {row.original.workspace.plan === "free" && <Badge>Upgrade</Badge>}
                            </h1>
                            <h2 className="text-xs">
                                Can't change settings, invite people. Can create projects.
                            </h2>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const isCurrent = row.original.user.id === row.original.currentUser;
            const [open, setOpen] = useState<boolean>(false);
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-end w-full outline-none">
                        <div className="p-1 rounded-lg hover:bg-accent">
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48" align="end" sideOffset={-3}>
                        <div className="hover:bg-accent focus:text-accent-foreground relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:text-destructive" onClick={() => setOpen(!open)}>
                            {isCurrent ? (
                                <div className="flex items-center gap-1">
                                    <ExitIcon className="h-4 w-4" /> Leave Workspace
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <CircleBackslashIcon className="h-4 w-4" /> Disable User 
                                </div>
                            )}
                            <LeaveWorkspaceModal isCurrent={isCurrent} workspace={row.original.workspace} open={open} onOpenChange={() => setOpen(!open)} />
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }
];
