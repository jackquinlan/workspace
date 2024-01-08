"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Trash2, MoreHorizontal, PenSquare, Star } from "lucide-react";
import { toast } from "sonner";

import type { View } from "@workspace/db";
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
import { Loader } from "@/components/loading-animation";

interface Props {
    view: View;
}

export function ViewSettings({ view }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const deleteView = api.view.deleteView.useMutation({
        onSuccess: () => router.refresh(),
    });
    const [isLoading, startTransition] = useTransition();
    async function handleDeleteView() {
        startTransition(async () => {
            try {
                await deleteView.mutateAsync({ id: view.id });
                toast.success(`View "${view.name}" was successfully deleted.`);
                setOpen(false);
            } catch(error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            }
        });
    }
    
    return (
        <React.Fragment>
            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-md p-[2px] outline-none hover:bg-muted">
                    <MoreHorizontal className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52" sideOffset={-2} side="bottom" align="start">
                    <DropdownMenuItem disabled>
                        <Star className="mr-2 h-4 w-4" />
                        Add to favorites
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <PenSquare className="mr-2 h-4 w-4" />
                        Edit 
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className="hover:text-destructive"
                        onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                        }}
                    >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="top-[30%] w-[30%]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete view</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this view? All data associated with
                            the vieww will deleted.{" "}
                            <span className="font-medium text-destructive">This action cannot be undone.</span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteView} variant="danger">
                            {isLoading ? <Loader size="sm" /> : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </React.Fragment>
    );
}