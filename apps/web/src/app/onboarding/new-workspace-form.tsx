"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import { newWorkspaceSchema } from "@workspace/lib/validators/workspace";
import { Button, Form, useZodForm } from "@workspace/ui";

import { WorkspaceForm } from "@/components/workspace-form";

interface Props {}

export function NewWorkspaceForm({}: Props) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const form = useZodForm({
    schema: newWorkspaceSchema,
    defaultValues: {
      name: "",
      slug: "",
      theme: "#52525b",
    },
    mode: "onChange",
  });
  const createWorkspace = api.workspace.newWorkspace.useMutation({
    onSuccess: () => {
      toast.success("Workspace created successfully");
      router.push("/inbox");
      router.refresh();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  async function handleSubmit(data: z.infer<typeof newWorkspaceSchema>) {
    startTransition(async () => {
      await createWorkspace.mutateAsync(data);
    });
  }
  return (
    <div className="flex w-1/3 flex-col space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <WorkspaceForm form={form} showLogo />
          <div className="flex items-center justify-end gap-2">
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              {isLoading ? "Creating" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
