"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { MoreHorizontal, PenSquare, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { View } from "@workspace/db";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@workspace/ui";

import { api } from "@/trpc/react";

interface Props {
    view: View;
}

export function ViewSettings({ view }: Props) {
    const router = useRouter();
    const deleteView = api.view.deleteView.useMutation({
        onSuccess: () => router.refresh(),
    });

    async function handleDeleteView() {
        try {
            await deleteView.mutateAsync({ id: view.id });
            toast.success("Your view was successfully deleted.");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md p-[2px] outline-none hover:bg-[#DDDDDC]">
                <MoreHorizontal className="h-4 w-4" />
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
                        handleDeleteView();
                    }}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
