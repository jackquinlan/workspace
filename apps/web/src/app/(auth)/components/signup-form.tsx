"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { TRPCError } from "@trpc/server";
import { signIn } from "next-auth/react";
import { toast }  from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import { signUpSchema } from "@workspace/lib/validators/auth";
import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useZodForm,
} from "@workspace/ui";

import { Loader } from "@/components/loading-animation";

export function SignupForm() {
    const [isLoading, startTransition] = React.useTransition();
    const form = useZodForm({ schema: signUpSchema, defaultValues: { email: "", password: "" } });

    const router = useRouter();
    const signUp = api.user.signUp.useMutation({
        onSuccess: async () => {
            const res = await signIn("credentials", {
                email: form.getValues("email"),
                password: form.getValues("password"),
                redirect: false,
            });
            if (res?.error) {
                toast.error("Failed to sign in.");
                return;
            }
            router.push("/inbox");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    async function handleSubmit(data: z.infer<typeof signUpSchema>) {
        startTransition(async () => {
            await signUp.mutateAsync(data);
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 py-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="you@email.com" autoComplete="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••••" type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                                Password must contain at least one uppercase letter, one number, and
                                one special character.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader size="sm" /> : "Create your account"}
                </Button>
            </form>
        </Form>
    );
}