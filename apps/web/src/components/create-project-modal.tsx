"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import type { Workspace } from "@workspace/db/client";
import { api } from "@workspace/api/react";
import { newProjectSchema } from "@workspace/lib/validators/project";
import { 
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    DialogTitle,
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useZodForm,
    DialogFooter,
} from "@workspace/ui";

import { ColorSelect } from "./theme-select";

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
            name: "", workspaceId: workspace.id, color: "#52525b",
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
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div onClick={() => setOpen(true)} className="p-0.5 rounded-md hover:bg-accent">
                            <Plus className="h-4 w-4" />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={4}>Create Project</TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="top-[25%]" showClose={false}>
                <DialogHeader>
                    <DialogTitle>Add project</DialogTitle>
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
                                variant="default" 
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