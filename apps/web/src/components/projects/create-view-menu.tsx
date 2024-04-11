"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import type { Project, View } from "@workspace/db/client";
import { newViewSchema } from "@workspace/lib/validators/view";
import { Button, Form, Popover, PopoverContent, PopoverTrigger, useZodForm } from "@workspace/ui";

import { ViewForm } from "./view-form";

interface Props {
    project: Project;
}

export function CreateViewMenu({ project }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, startTransition] = useTransition();
    const form = useZodForm({
        schema: newViewSchema,
        defaultValues: {
            name: "",
            type: "board",
            projectId: project.id,
        },
    });
    const router = useRouter();
    const createView = api.view.newView.useMutation({
        onSuccess: (view: View) => {
            router.push(`/p/${project.id}/view/${view.id}`);
            router.refresh();
            setOpen(false);
            form.reset();
            toast("View created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    async function handleSubmit(data: z.infer<typeof newViewSchema>) {
        startTransition(async () => {
            await createView.mutateAsync(data);
        });
    }
    return (
        <Popover
            open={open}
            onOpenChange={() => {
                setOpen(!open);
                form.reset();
            }}
        >
            <PopoverTrigger asChild>
                <Button size="xs" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    View
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 px-3 py-2" align="start" sideOffset={4}>
                <h1 className="mb-2 text-sm font-medium">New view</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <ViewForm form={form} />
                        <p className="py-2 text-xs">
                            By creating a new view, all members in your workspace will have access
                            to it.
                        </p>
                        <Button
                            className="w-full"
                            type="submit"
                            size="xs"
                            disabled={isLoading}
                            loading={isLoading}
                        >
                            Create
                        </Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
}
