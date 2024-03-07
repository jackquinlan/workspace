"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { toast } from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import { editUserSchema } from "@workspace/lib/validators/user";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useZodForm,
} from "@workspace/ui";

import { Loader } from "@/components/loading-animation";

interface Props {
    user: User;
}

export function EditProfileForm({ user }: Props) {
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();

    const form = useZodForm({
        schema: editUserSchema,
        defaultValues: {
            email: user.email,
            name: user.name ?? "",
        },
    });
    const watch = form.watch("name");
    const editUser = api.user.editUser.useMutation({
        onSuccess: (data) => {
            toast.success("Profile updated successfully");
            // Refresh the page to reflect the changes
            router.refresh();
            form.setValue("name", data.name!);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    async function handleEditUser(data: z.infer<typeof editUserSchema>) {
        startTransition(async () => {
            if (data.name !== user.name) {
                await editUser.mutateAsync(data);
            } else {
                toast.message("No changes made to profile.");
            }
        });
    }
    return (
        <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(handleEditUser)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" disabled {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-start gap-2 pt-1">
                    <Button type="submit" size="sm" disabled={isLoading}>
                        {isLoading && <Loader size="xs" variant="light" className="me-1" />}
                        Update
                    </Button>
                    {watch !== user.name ? (
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => form.setValue("name", user.name ?? "")}
                        >
                            Cancel
                        </Button>
                    ) : null}
                </div>
            </form>
        </Form>
    );
}
