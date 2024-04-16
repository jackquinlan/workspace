"use client";

import React, { useState, useTransition } from "react";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { z } from "zod";

import type { Group, Task } from "@workspace/db/client";
import type { ProjectWithGroups } from "@workspace/lib/types/project";
import { addTaskSchema } from "@workspace/lib/validators/task";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  useZodForm,
} from "@workspace/ui";

import { createTask } from "@/actions/task/create-task";
import { useAction } from "@/hooks/use-action";

interface Props {
  defaultGroup?: Group;
  project: ProjectWithGroups;
  handleAddTask: (task: Task) => void;
}

export function CreateTaskModal({ defaultGroup, project, handleAddTask }: Props) {
  const [loading, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const form = useZodForm({
    schema: addTaskSchema,
    defaultValues: {
      content: "", description: "", groupId: defaultGroup?.id ?? project.groups[0].id ?? "",
    },
  });
  const { execute } = useAction(createTask, {
    onSuccess: (data) => {
      setOpen(false);
      handleAddTask(data);
      form.reset();
    },
    onError: (error) => {
      toast(error);
    },
  });
  function handleSubmit(data: z.infer<typeof addTaskSchema>) {
    startTransition(() => {
      execute(data);
    });
  }
  return (
    <Dialog 
      open={open} 
      onOpenChange={() => {
        setOpen(!open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
          <Plus className="h-6 w-6 p-1 rounded-md hover:bg-accent" />
      </DialogTrigger>
      <DialogContent className="top-[25%] w-1/3" showClose={false}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="pt-2">
            <div className="space-y-0 px-2">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        autoFocus
                        className="border-none text-lg"
                        placeholder="Task name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea className="resize-none border-none" placeholder="Task description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="groupId"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger showIcon={false} className="bg-background h-7 outline-none">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background">
                        {project.groups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}      
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit" size="xs" disabled={loading}>
                Create task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
