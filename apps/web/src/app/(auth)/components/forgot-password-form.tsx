"use client";

import * as React from "react";

import { toast } from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import { forgotPasswordSchema } from "@workspace/lib/validators/auth";
import {
    Alert,
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

export function ForgotPasswordForm() {
    const [success, setSuccess] = React.useState<boolean>(false);
    const [isLoading, startTransition] = React.useTransition();
    const form = useZodForm({ schema: forgotPasswordSchema, defaultValues: { email: "" } });

    const sendForgotEmail = api.user.forgotPassword.useMutation({
        onSuccess: async () => setSuccess(true),
        onError: (error) => {
            toast.error(error.message);
        },
    });

    async function handleSubmit(data: z.infer<typeof forgotPasswordSchema>) {
        setSuccess(false);
        startTransition(async () => {
            await sendForgotEmail.mutateAsync(data);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete="email"
                                    placeholder="you@email.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {success && (
                    <Alert variant="success">
                        An email has been sent to your inbox with instructions to reset your
                        password.
                    </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader size="sm" /> : "Reset password"}
                </Button>
            </form>
        </Form>
    );
}