"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { CircleBackslashIcon, ExitIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { api } from "@workspace/api/react";
import type { Workspace } from "@workspace/db/client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTitle,
} from "@workspace/ui";

interface Props {
    isCurrent: boolean;
    workspace: Workspace;
    memberId: string;
}

export function LeaveWorkspaceModal({ isCurrent, workspace, memberId }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const leaveWorkspace = api.workspace.leaveWorkspace.useMutation({
        onSuccess: () => {
            router.push("/inbox");
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const removeMember = api.workspace.removeMember.useMutation({
        onSuccess: () => {
            router.refresh();
            toast("User removed.");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    async function handleSubmit() {
        if (isCurrent) {
            await leaveWorkspace.mutateAsync({ workspaceId: workspace.id });
        } else {
            await removeMember.mutateAsync({ membershipId: memberId });
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
            <div
                className="hover:bg-accent hover:text-accent-foreground hover:text-destructive relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onClick={() => setOpen(!open)}
            >
                {isCurrent ? (
                    <div className="flex items-center gap-1">
                        <ExitIcon className="h-4 w-4" /> Leave Workspace
                    </div>
                ) : (
                    <div className="flex items-center gap-1">
                        <CircleBackslashIcon className="h-4 w-4" /> Remove User
                    </div>
                )}
            </div>
            <AlertDialogContent className="top-[20%]">
                {isCurrent ? (
                    <AlertDialogTitle>
                        Are you sure you want to leave {workspace.name}?
                    </AlertDialogTitle>
                ) : (
                    <AlertDialogTitle>Are you sure you want to kick this user?</AlertDialogTitle>
                )}
                <p className="px-5 text-sm">
                    {isCurrent ? "You" : "They"} will no longer have access to this workspace and
                    its contents. <br />
                    {isCurrent ? "You" : "They"} can rejoin if you are invited back.
                </p>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                        {isCurrent ? "Leave" : "Remove"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
