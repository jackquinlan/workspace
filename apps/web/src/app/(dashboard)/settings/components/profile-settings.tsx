"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { toast } from "sonner";
import { z } from "zod";

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
import { api } from "@/trpc/react";

interface Props {
    user: User;
}

const updateProfileSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3).max(32),
});

export function ProfileSettings({ user }: Props) {
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();
    const form = useZodForm({
        schema: updateProfileSchema,
        defaultValues: {
            email: user.email,
            name: user.name ?? "",
        },
    });
    const updateUser = api.user.updateUser.useMutation({
        onSuccess: () => router.refresh(),
    });
    async function handleSubmit(data: z.infer<typeof updateProfileSchema>) {
        startTransition(async () => {
            try {
                await updateUser.mutateAsync({ id: user.id, name: data.name });
                toast.success("Profile updated successfully!");
                form.reset();
                form.setValue("name", data.name);
            } catch (err) {
                toast.error("An error occurred while updating your profile.");
            }
        });
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="johndoe" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <div className="flex justify-start gap-2 pt-1">
                    <Button size="sm" type="submit" disabled={isLoading}>
                        {isLoading ? <Loader size="sm" /> : "Update"}
                    </Button>
                    {form.formState.isDirty && (
                        <Button size="sm" variant="outline" onClick={() => form.reset()}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
