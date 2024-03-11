"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { z } from "zod";

import { loginSchema } from "@workspace/lib/validators/auth";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    LoadingDots,
    useZodForm,
} from "@workspace/ui";

export function LoginForm() {
    const [isLoading, startTransition] = React.useTransition();
    const form = useZodForm({ schema: loginSchema, defaultValues: { email: "", password: "" } });

    const router = useRouter();
    async function loginWithCredentials(data: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            const res = await signIn<"credentials">("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (res?.error) {
                toast.error(res.error);
                return;
            }
            router.push("/inbox");
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(loginWithCredentials)} className="space-y-3 py-2">
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete="off"
                                    placeholder="••••••••••"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Link
                    href="/forgot-password"
                    className="flex w-full text-sm hover:underline hover:underline-offset-4"
                >
                    Forgot your password?
                </Link>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <LoadingDots size="sm" /> : "Login"}
                </Button>
            </form>
        </Form>
    );
}
