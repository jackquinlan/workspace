"use client";

import React, { useState, useTransition } from "react";

import { toast } from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import { resetPasswordSchema } from "@workspace/lib/validators/auth";
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
  LoadingDots,
  useZodForm,
} from "@workspace/ui";

export function ResetPasswordForm({ token }: { token: string }) {
  const [isLoading, startTransition] = useTransition();
  const [success, setSuccess] = useState<boolean>(false);
  const form = useZodForm({
    schema: resetPasswordSchema,
    defaultValues: { password: "", confirmPassword: "", token: token },
  });

  const updatePassword = api.user.resetPassword.useMutation({
    onSuccess: () => {
      toast.success("Your password has been updated successfully.");
      form.reset();
      setSuccess(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleSubmit(data: z.infer<typeof resetPasswordSchema>) {
    startTransition(async () => {
      await updatePassword.mutateAsync(data);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 py-2">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••••" type="password" {...field} />
                </FormControl>
                <FormDescription>
                  Password must contain at least one uppercase letter, one number, and one special
                  character.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new password</FormLabel>
                <FormControl>
                  <Input placeholder="••••••••••" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" disabled={success}>
          {isLoading ? <LoadingDots size="sm" /> : "Reset password"}
        </Button>
      </form>
    </Form>
  );
}
