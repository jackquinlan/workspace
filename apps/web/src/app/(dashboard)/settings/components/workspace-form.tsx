"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { z } from "zod";

import type { Workspace } from "@workspace/db/client";
import { api } from "@workspace/api/react";
import { editWorkspaceSchema } from "@workspace/lib/validators/workspace";
import { Button, Form, useZodForm } from "@workspace/ui";

import { WorkspaceForm } from "@/app/onboarding/new-workspace-form";
import { slugify } from "@/lib/utils";

interface Props {
    activeWorkspace: Workspace;
}

export function EditWorkspace({ activeWorkspace }: Props) {
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();
    const form = useZodForm({
        schema: editWorkspaceSchema,
        defaultValues: {
            name: activeWorkspace.name, 
            slug: activeWorkspace.slug, 
            workspaceId: activeWorkspace.id,
            theme: activeWorkspace.color,
        },
        mode: "onChange",
    });
    const watchTheme = form.watch("theme");
    const watchName = form.watch("name");
    const watchSlug = form.watch("slug");
    const editWorkspace = api.workspace.editWorkspace.useMutation({
        onSuccess: (data) => {
            toast.success("Workspace updated successfully");
            // Refresh the page to reflect the changes
            router.refresh();
            form.setValue("theme", data.color!);
            form.setValue("name", data.name!);
            form.setValue("slug", data.slug!);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    async function handleEdit(data: z.infer<typeof editWorkspaceSchema>) {
        startTransition(async () => {
            await editWorkspace.mutateAsync({ ...data, slug: slugify(data.slug) });
        });
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEdit)}>
                <WorkspaceForm form={form} />
                <div className="flex justify-start gap-2 pt-1">
                    <Button type="submit" size="sm" disabled={isLoading} loading={isLoading}>
                        Update
                    </Button>
                    {(watchName !== activeWorkspace.name) || 
                     (watchSlug !== activeWorkspace.slug) || (watchTheme !== activeWorkspace.color) ? (
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                form.setValue("theme", activeWorkspace.color!);
                                form.setValue("name", activeWorkspace.name!);
                                form.setValue("slug", activeWorkspace.slug!);   
                            }}
                        >
                            Cancel
                        </Button>
                    ) : null}
                </div>
            </form>
        </Form>
    );
}