"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { MoreHorizontal, Trash2, PenSquare } from "lucide-react";
import { toast } from "sonner";

import type { Group } from "@workspace/db";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui";

import { api } from "@/trpc/react";

interface Props {
    group: Group;
}

export function GroupSettings({ group }: Props) {
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

    const router = useRouter();
    const deleteGroup = api.group.deleteGroup.useMutation({
        onSuccess: () => router.refresh(),
    });

    async function handleDeleteGroup() {
        try {
            await deleteGroup.mutateAsync({ id: group.id });
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message); 
            }
        }
    }

    return (
        <React.Fragment>
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-md p-[2px] outline-none hover:bg-muted">
                    <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52" side="bottom" align="end">
                    <DropdownMenuItem>
                        <PenSquare className="mr-2 h-4 w-4" />
                        Edit 
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:text-destructive" onClick={() => setConfirmOpen(true)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent className="top-[25%]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-1">
                            Delete group 
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this group? 
                            It will also remove all tasks associated with this group.{" "}
                            <span className="text-destructive font-medium">
                                This action cannot be undone.
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            variant="danger"
                            onClick={handleDeleteGroup}
                        >
                            Delete 
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </React.Fragment>
    );
}