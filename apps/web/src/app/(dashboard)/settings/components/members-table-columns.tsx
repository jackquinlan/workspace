"use client";

import React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import type { User, Workspace, WorkspaceMember, WorkspaceMemberRole } from "@workspace/db/client";
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@workspace/ui";

import { cn } from "@/lib/utils";
import { LeaveWorkspaceModal } from "./leave-workspace-modal";
import { UpdateMemberRoles } from "./update-member-roles";
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
                    <DropdownMenuTrigger asChild disabled={row.original.currentRole === "member"}>
                        <Button className="flex items-center gap-1" size="sm" variant="ghost">
                            {row.original.role.charAt(0).toUpperCase() + row.original.role.slice(1)}
                            <ChevronDownIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64" align="end" sideOffset={-3}>
                        {row.original.currentRole === "owner" && row.original.user.id !== row.original.currentUser && (
                            <TransferOwnerModal workspace={row.original.workspace} newOwnerId={row.original.user.id} />
                        )}
                        <UpdateMemberRoles 
                            currentUser={row.original.currentUser} 
                            userId={row.original.user.id} 
                            workspace={row.original.workspace} 
                            userRole={row.original.role} />
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
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-end w-full outline-none">
                        <div className="p-1 rounded-lg hover:bg-accent">
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48" align="end" sideOffset={-3}>
                        <LeaveWorkspaceModal 
                            isCurrent={isCurrent} 
                            workspace={row.original.workspace} 
                            memberId={row.original.id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
