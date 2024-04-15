"use client";

import React from "react";

import { ChevronRight, Plus } from "lucide-react";
import { z } from "zod";

import type { Project } from "@workspace/db/client";
import { addTaskSchema } from "@workspace/lib/validators/task";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Textarea,
  useZodForm,
} from "@workspace/ui";

import { useAction } from "@/hooks/use-action";

interface Props {
  project: Project;
  groupId?: string;
}

export function CreateTaskModal({ groupId, project }: Props) {
  const form = useZodForm({
    schema: addTaskSchema,
    defaultValues: {
      content: "",
      description: "",
      groupId: groupId ?? "",
    },
  });
  function handleSubmit(data: z.infer<typeof addTaskSchema>) {
    console.log(data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs" className="flex w-fit items-center gap-1">
          <Plus className="h-4 w-4" />
          <span className="hidden md:block">Task</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[25%]" showClose={false}>
        <DialogHeader>
          <DialogTitle className="text-sm flex items-center gap-1 py-2">
            {project.name} <ChevronRight className="w-2 h-2" /> New task
         </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="-mt-3">
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
                        placeholder="Title"
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
                      <Textarea
                        className="max-h-[50%] resize-none border-none"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" size="sm">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
