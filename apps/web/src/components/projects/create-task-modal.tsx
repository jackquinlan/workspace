"use client";

import React from "react";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import type { Group } from "@workspace/db/client";
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
}

export function CreateTaskModal({ defaultGroup, project }: Props) {
  const form = useZodForm({
    schema: addTaskSchema,
    defaultValues: {
      content: "", description: "", groupId: defaultGroup?.id ?? project.groups[0].id ?? "",
    },
  });
  const { execute } = useAction(createTask, {
    onSuccess: () => {
      form.reset();
    },
    onError: (error) => {
      toast(error);
    },
  });
  function handleSubmit(data: z.infer<typeof addTaskSchema>) {
    execute(data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs" className="flex w-fit items-center gap-1">
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">Task</span>
        </Button>
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
              <Button type="submit" size="xs">
                Create task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
