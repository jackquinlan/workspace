"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import type { Group, Project } from "@workspace/db/client";
import { addGroupSchema } from "@workspace/lib/validators/group";
import {
  Button,
  CancelButton,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  useZodForm,
} from "@workspace/ui";

import { createGroup } from "@/actions/group/create-group";
import { useAction } from "@/hooks/use-action";

interface AddGroupProps {
  project: Project;
  handleAddGroup: (group: Group) => void;
}

export function AddGroup({ project, handleAddGroup }: AddGroupProps) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const form = useZodForm({
    schema: addGroupSchema,
    defaultValues: { name: "", projectId: project.id },
  });
  const { execute } = useAction(createGroup, {
    onSuccess: (data) => {
      setOpen(false);
      handleAddGroup(data);
      // router.refresh();
      form.reset();
    },
    onError: (error) => {
      toast(error);
    },
  });
  async function handleSubmit(data: z.infer<typeof addGroupSchema>) {
    startTransition(() => {
      execute(data);
    });
  }
  if (!open) {
    return (
      <Button
        className="w-[300px] border border-dashed"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-0.5 h-4 w-4" /> Add Group
      </Button>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="w-[300px]" autoComplete="off" autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2 pt-2">
          <Button type="submit" size="sm" loading={loading} disabled={loading}>
            Add Group
          </Button>
          <CancelButton close={() => setOpen(false)}>Cancel</CancelButton>
        </div>
      </form>
    </Form>
  );
}
