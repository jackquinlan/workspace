"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { CardStackPlusIcon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import type { Workspace } from "@workspace/db/client";
import { newProjectSchema } from "@workspace/lib/validators/project";
import {
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    useZodForm,
} from "@workspace/ui";

import { ColorSelect } from "../theme-select";

interface Props {
    workspace: Workspace;
}

export function CreateProjectModal({ workspace }: Props) {
    const [isLoading, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const form = useZodForm({
        schema: newProjectSchema,
        defaultValues: {
            name: "",
            workspaceId: workspace.id,
            color: "#52525b",
        },
    });
    const newProject = api.project.newProject.useMutation({
        onSuccess: (data) => {
            router.push(`/p/${data.id}`);
            router.refresh();
            setOpen(false);
            form.reset();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    async function handleSubmit(data: z.infer<typeof newProjectSchema>) {
        startTransition(async () => {
            await newProject.mutateAsync(data);
        });
    }
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div onClick={() => setOpen(true)} className="hover:bg-accent rounded-md p-0.5">
                        <Plus className="h-4 w-4" />
                    </div>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={4}>
                    Create Project
                </TooltipContent>
            </Tooltip>
            <DialogContent className="top-[25%]" showClose={false}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-1">
                        <CardStackPlusIcon className="h-5 w-5" />
                        Add project
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="space-y-2 px-4">
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
                            <ColorSelect name="color" form={form} />
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                size="sm"
                                loading={isLoading}
                                disabled={isLoading || form.formState.isSubmitting}
                            >
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
