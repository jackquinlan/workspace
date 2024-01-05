"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import type { Workspace } from "@workspace/db";
import {
    Avatar,
    AvatarFallback,
    Button,
    CancelButton,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogFooter,
    DialogTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    getButtonClasses,
    Input,
    useZodForm,
} from "@workspace/ui";
import { addWorkspaceSchema } from "@workspace/lib/validators/workspace";

import { api } from "@/trpc/react";
import { themeColors } from "@/lib/colors";
import { cn } from "@/lib/utils";

interface Props {
    activeId: string;
    workspaces: Workspace[];
}

export function WorkspaceSelector({ activeId, workspaces }: Props) {
    const activeWorkspace = workspaces.find((workspace) => workspace.id === activeId);
    if (!activeWorkspace) {
        return null;
    }
    const theme = themeColors[activeWorkspace.color];
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 py-1 px-2 rounded-md outline-none hover:bg-accent">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className={cn("border border-border", theme)} />
                </Avatar>
                <h1 className="font-semibold">{activeWorkspace.name}</h1>
                <ChevronsUpDown className="w-3 h-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-1 w-72" align="start" side="bottom">
                {workspaces.map((workspace) => (
                    <WorkspaceInfo key={workspace.id} activeId={activeWorkspace.id} workspace={workspace} />
                ))}
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
            color: Object.keys(themeColors)[(Math.random() * Object.keys(themeColors).length) | 0], 
            name: "", 
            type: "personal" 
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
                    "flex items-center justify-start px-1.5 gap-1",
                )} 
            >
                <Plus className="w-4 h-4" />
                Add workspace 
            </DialogTrigger>
            <DialogContent className="w-1/3">
                <DialogTitle className="flex items-center gap-2">
                    Create new workspace
                </DialogTitle>
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
                            <CancelButton close={() => setOpen(false)} size="sm">Cancel</CancelButton>
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

export function WorkspaceInfo({ activeId, workspace }: { activeId: string, workspace: Workspace }) {
    
    const router = useRouter();
    const switchWorkspace = api.workspace.switchWorkspace.useMutation({
        onSuccess: () => router.refresh(),
    });
    async function handleSwitch() {
        if (activeId !== workspace.id) {
            return await switchWorkspace.mutateAsync({ oldId: activeId, newId: workspace.id });
        }
    }
    const theme = themeColors[workspace.color];
    return (
        <div 
            className="flex items-center justify-between p-1 rounded-md outline-none cursor-pointer hover:bg-accent"
            onClick={handleSwitch}
        >
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarFallback className={cn("border border-border", theme)} />
                </Avatar>
                <h1 className="font-medium text-sm">{workspace.name}</h1>
            </div>
            {activeId === workspace.id && <Check className="w-4 h-4" />}
        </div>
    );
}
