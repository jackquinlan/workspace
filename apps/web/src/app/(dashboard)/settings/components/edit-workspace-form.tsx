"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import type { Workspace } from "@workspace/db/client";
import { editWorkspaceSchema } from "@workspace/lib/validators/workspace";
import { 
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button, 
    Form, 
    useZodForm 
} from "@workspace/ui";

import { WorkspaceForm } from "@/components/workspace-form";
import { slugify } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";
import { deleteWorkspaceLogo } from "@/actions/delete-image";
import { useAction } from "@/hooks/use-action";

interface Props {
    activeWorkspace: Workspace;
}

export function EditWorkspaceForm({ activeWorkspace }: Props) {
    const { execute } = useAction(deleteWorkspaceLogo, {
        onError: (error) => {
            toast(error);
        },
    });
    const router = useRouter();
    const [loading, startTransition] = useTransition();
    const form = useZodForm({
        schema: editWorkspaceSchema,
        defaultValues: {
            name: activeWorkspace.name, slug: activeWorkspace.slug, workspaceId: activeWorkspace.id, theme: activeWorkspace.color,
        },
        mode: "onChange",
    });
    const watch = form.watch();
    const editWorkspace = api.workspace.editWorkspace.useMutation({
        onSuccess: (data) => {
            toast("Workspace updated");
            router.refresh();
            updateForm(data);
        },
        onError: (err) => {
            toast(err.message);
        },
    });
    async function handleEdit(data: z.infer<typeof editWorkspaceSchema>) {
        startTransition(async () => {
            await editWorkspace.mutateAsync({ ...data, slug: slugify(data.slug) });
        });
    }
    function handleRemoveImage() {
        if (!activeWorkspace.image) {
            return;
        }
        execute({ file: activeWorkspace.image });
    }
    function updateForm(data: Workspace) {
        form.setValue("name", data.name);
        form.setValue("slug", data.slug);
        form.setValue("theme", data.color);
    }
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-4">
                <Avatar className="flex h-16 w-16 items-center justify-center">
                    <AvatarImage src={activeWorkspace?.image ?? undefined} />
                    <AvatarFallback
                        className="border-border border text-lg font-medium text-white"
                        style={{ backgroundColor: watch.theme }}
                    >
                        {form.getValues("name")[0] ?? "W"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                    <UploadButton 
                        className="ut-button:mt-4 ut-button:bg-primary ut-button:h-8 ut-button:px-3 ut-button:text-xs ut-button:hover:bg-red-600 ut-button:ring-0 ut-button:ut-uploading:after:bg-red-500"
                        endpoint="workspaceLogo"
                        onClientUploadComplete={() => {
                            toast("Logo updated successfully.");
                            router.refresh();
                        }}
                        onUploadError={() => {
                            toast.error("Failed to update workspace logo.");
                        }}
                    />
                    {activeWorkspace.image && (
                        <Button className="mt-4" variant="outline" size="sm" onClick={handleRemoveImage}>
                            Remove
                        </Button>
                    )}
                </div>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEdit)}>
                    <WorkspaceForm form={form} />
                    <div className="flex justify-start gap-2 pt-1">
                        <Button type="submit" size="sm" disabled={loading} loading={loading}>
                            Update
                        </Button>
                        {watch.name !== activeWorkspace.name || watch.slug !== activeWorkspace.slug || watch.theme !== activeWorkspace.color ? (
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => updateForm(activeWorkspace)}
                            >
                                Cancel
                            </Button>
                        ) : null}
                    </div>
                </form>
            </Form>
        </div>
    );
}
