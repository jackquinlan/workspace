"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import type { Workspace } from "@workspace/db";
import { addWorkspaceSchema } from "@workspace/lib/validators/workspace";
import {
    Avatar,
    AvatarFallback,
    Button,
    CancelButton,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    getButtonClasses,
    Input,
    Separator,
    useZodForm,
} from "@workspace/ui";

import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { themeColorsGradient } from "@/lib/colors";

interface Props {
    activeId: string;
    workspaces: Workspace[];
}

export function WorkspaceSelector({ activeId, workspaces }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const activeWorkspace = workspaces.find((workspace) => workspace.id === activeId);
    if (!activeWorkspace) {
        return null;
    }
    const theme = themeColorsGradient[activeWorkspace.color];
    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1 outline-none max-w-2/3 hover:bg-accent">
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarFallback className={cn("border-border border", theme)} />
                    </Avatar>
                    <p className="overflow-hidden truncate w-full font-semibold">{activeWorkspace.name}</p>
                </div>
                <ChevronsUpDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex w-72 flex-col gap-1" align="start" side="bottom">
                {workspaces.map((workspace) => (
                    <WorkspaceInfo key={workspace.id} activeId={activeWorkspace.id} workspace={workspace} close={() => setOpen(false)} />
                ))}
                <Separator />
                <AddWorkspace />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function AddWorkspace() {
    const [open, setOpen] = React.useState<boolean>(false);
    const router = useRouter();
    const addWorkspace = api.workspace.addWorkspace.useMutation({
        onSuccess: () => router.refresh(),
    });

    const form = useZodForm({
        schema: addWorkspaceSchema,
        defaultValues: {
            color: Object.keys(themeColorsGradient)[(Math.random() * Object.keys(themeColorsGradient).length) | 0],
            name: "",
            type: "personal",
        },
    });
    async function handleAddWorkspace(data: z.infer<typeof addWorkspaceSchema>) {
        try {
            await addWorkspace.mutateAsync(data);
            toast.success("Workspace created successfully.");
            form.reset();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={cn(
                    getButtonClasses({ variant: "ghost", size: "sm" }),
                    "flex items-center justify-start gap-1 px-1.5",
                )}
            >
                <Plus className="h-4 w-4" />
                Add workspace
            </DialogTrigger>
            <DialogContent className="w-1/3">
                <DialogTitle className="flex items-center gap-2">Create new workspace</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddWorkspace)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="off" autoFocus {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="pt-2">
                            <CancelButton close={() => setOpen(false)} size="sm">
                                Cancel
                            </CancelButton>
                            <Button type="submit" size="sm">
                                Create workspace
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export function WorkspaceInfo({ close, activeId, workspace }: { activeId: string; workspace: Workspace, close: () => void }) {
    const router = useRouter();
    const switchWorkspace = api.workspace.switchWorkspace.useMutation({
        onSuccess: () => router.refresh(),
    });
    async function handleSwitch() {
        if (activeId !== workspace.id) {
            return await switchWorkspace.mutateAsync({ oldId: activeId, newId: workspace.id });
        }
    }
    const theme = themeColorsGradient[workspace.color];
    return (
        <div
            className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-md p-1 outline-none"
            onClick={() => {
                handleSwitch();
                close();
            }}
        >
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className={cn("border-border border", theme)} />
                </Avatar>
                <h1 className="text-sm">{workspace.name}</h1>
            </div>
            {activeId === workspace.id && <Check className="h-4 w-4" />}
        </div>
    );
}
