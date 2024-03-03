"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { z } from "zod";
import { toast } from "sonner";

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
        mode: "onSubmit",
        defaultValues: {
            name: user.name ?? "",
        },
    });
    const editUser = api.user.editUser.useMutation({
        onSuccess: () => {
            toast.success("Profile updated successfully");
            // Refresh the page to reflect the changes
            router.refresh();
        }, 
        onError: (err) => {
            toast.error(err.message);
        }
    })
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Display Name</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-start gap-2 pt-1">
                    <Button size="sm" type="submit" disabled={isLoading}>
                        {isLoading ? <Loader size="sm" /> : "Update"}
                    </Button>
                    {form.formState.isDirty && form.getValues("name") !== user.name && (
                        <Button size="sm" variant="outline" onClick={() => form.reset()}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}