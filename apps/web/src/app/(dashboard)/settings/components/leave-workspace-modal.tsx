"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import type { Workspace } from "@workspace/db/client";
import { api } from "@workspace/api/react";
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
    open: boolean;
    onOpenChange: () => void;
    memberId: string;
}

export function LeaveWorkspaceModal({ isCurrent, workspace, open, onOpenChange, memberId }: Props) {
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
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="top-[20%]">
                {isCurrent ? (
                    <AlertDialogTitle>Are you sure you want to leave {workspace.name}?</AlertDialogTitle>
                ) : (
                    <AlertDialogTitle>Are you sure you want to kick this user?</AlertDialogTitle>
                )}
                <p className="text-sm px-5">
                    {isCurrent ? "You" : "They"} will no longer have access to this workspace and its contents. <br />
                    {isCurrent ? "You" : "They"} can rejoin if you are invited back.
                </p>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>{isCurrent ? "Leave" : "Remove"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}