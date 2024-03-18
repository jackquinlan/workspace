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
    AlertDialogTrigger
} from "@workspace/ui";

interface Props {
    workspace: Workspace;
    newOwnerId: string;
}

export function TransferOwnerModal({ workspace, newOwnerId }: Props) {
    const router = useRouter();
    const transferOwnership = api.workspace.transferOwnership.useMutation({
        onSuccess: () => {
            toast("Ownership transferred successfully");
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    async function handleSubmit() {
        await transferOwnership.mutateAsync({ workspaceId: workspace.id, userId: newOwnerId });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="grid grid-cols-1 gap-0 text-left hover:bg-accent hover:text-accent-foreground relative cursor-pointer select-none items-center rounded-sm px-2 py-1 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <h1 className="font-medium text-md">Transfer Ownership</h1>
                <h2 className="text-xs">Can change settings, disable admins, manage billing.</h2>   
            </AlertDialogTrigger>
            <AlertDialogContent className="top-[20%]">
                <AlertDialogTitle>Are you sure you want to transfer ownership?</AlertDialogTitle>
                <p className="text-sm px-5">
                    You will be demoted to an administrator and the new owner will have full control over the workspace.
                </p>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>Transfer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent> 
        </AlertDialog>
    );
}
