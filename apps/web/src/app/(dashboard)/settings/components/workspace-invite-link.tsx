"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import type { Workspace } from "@workspace/db/client";
import { editInviteLinkSchema } from "@workspace/lib/validators/workspace";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    Form,
    FormControl,
    FormField,
    Input,
    Switch,
    useZodForm,
} from "@workspace/ui";

import { Shell } from "@/components/shell";

interface WorkspaceInviteLinkProps {
    workspace: Workspace;
}

export function WorkspaceInviteLink({ workspace }: WorkspaceInviteLinkProps) {
    const router = useRouter();
    const [inviteLink, setInviteLink] = useState<string>(
        `${process.env.NEXT_PUBLIC_APP_URL}/invite/${workspace.inviteSlug}`,
    );
    const [showLink, setShowLink] = useState<boolean>(workspace.inviteSlugEnabled);
    const form = useZodForm({
        schema: editInviteLinkSchema,
        defaultValues: {
            workspaceId: workspace.id,
            inviteSlugEnabled: workspace.inviteSlugEnabled,
            inviteSlug: workspace.inviteSlug,
        },
    });
    const data = form.watch();
    useEffect(() => {
        async function handleSubmit(data: z.infer<typeof editInviteLinkSchema>) {
            const response = await fetch("/api/workspace/invite-link", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data }),
            });
            if (!response?.ok) {
                toast.error("Error updating link");
            }
            const json = await response.json();
            setInviteLink(`${process.env.NEXT_PUBLIC_APP_URL}/invite/${json.inviteSlug}`);
            router.refresh();
        }
        if (form.formState.isValid && !form.formState.isValidating) {
            handleSubmit(data);
        }
    }, [form, data, router]);
    const toggleChange = form.watch("inviteSlugEnabled");
    useEffect(() => {
        setShowLink(toggleChange);
    }, [toggleChange]);
    return (
        <Form {...form}>
            <Shell className="mt-4 flex flex-col">
                <div className="flex items-center justify-between space-x-4">
                    <div className="space-y-0">
                        <h1 className="font-medium">Invite link</h1>
                        <h2 className="text-xs leading-5 [&:not(:first-child)]:mt-6">
                            Share this secret link to invite people to your workspace. You can
                            disable this feature or{" "}
                            <ResetLinkModal
                                updateLink={(next: string) => setInviteLink(next)}
                                form={form}
                            />
                            .
                        </h2>
                    </div>
                    <FormField
                        name="inviteSlugEnabled"
                        control={form.control}
                        render={({ field }) => (
                            <FormControl>
                                <Switch
                                    type="submit"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        )}
                    />
                </div>
                {showLink && (
                    <Input
                        className="mt-2 bg-zinc-50 disabled:cursor-default disabled:opacity-100"
                        value={inviteLink}
                        addSuffix={<CopyButton slug={workspace.inviteSlug} />}
                        disabled
                    />
                )}
            </Shell>
        </Form>
    );
}

interface ResetModalProps<T extends FieldValues = any> {
    updateLink: (next: string) => void;
    form: UseFormReturn<T>;
}

function ResetLinkModal({ updateLink, form }: ResetModalProps) {
    function resetLink() {
        const uuid = uuidv4();
        form.setValue("inviteSlug", uuid);
        const newLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${uuid}`;
        updateLink(newLink);
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className="underline underline-offset-2 outline-none">
                reset this link
            </AlertDialogTrigger>
            <AlertDialogContent className="top-[30%] w-[20%]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Reset invite link</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    Are you sure you want to reset your invitation link? Your old link will no
                    longer be able to be used.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={resetLink}>Reset Invite Link</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function CopyButton({ slug }: { slug: string }) {
    return (
        <Button
            className="h-7"
            onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/invite/${slug}`);
                toast("Link copied to clipboard");
            }}
        >
            Copy
        </Button>
    );
}
