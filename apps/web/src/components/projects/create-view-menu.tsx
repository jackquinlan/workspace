"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import type { Project, View } from "@workspace/db/client";
import { newViewSchema } from "@workspace/lib/validators/view";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    RadioGroup,
    RadioGroupItem,
    useZodForm,
} from "@workspace/ui";

import { VIEW_ICONS } from "./view-list-container";

const VIEWS = [
    { type: "board", label: "Board" },
    { type: "calendar", label: "Calendar" },
    { type: "list", label: "List" },
    { type: "table", label: "Table" },
];

interface Props {
    project: Project;
}

export function CreateViewMenu({ project }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, startTransition] = useTransition();
    const form = useZodForm({
        schema: newViewSchema,
        defaultValues: {
            name: "",
            type: "board",
            projectId: project.id,
        },
    });
    const router = useRouter();
    const createView = api.view.newView.useMutation({
        onSuccess: (view: View) => {
            router.push(`/p/${project.id}/view/${view.id}`);
            router.refresh();
            setOpen(false);
            form.reset();
            toast("View created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    async function handleSubmit(data: z.infer<typeof newViewSchema>) {
        startTransition(async () => {
            await createView.mutateAsync(data);
        });
    }
    return (
        <Popover
            open={open}
            onOpenChange={() => {
                setOpen(!open);
                form.reset();
            }}
        >
            <PopoverTrigger asChild>
                <Button size="xs" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    View
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 px-3 py-2" align="start" sideOffset={4}>
                <h1 className="mb-2 text-sm font-medium">New view</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="h-8" placeholder="View name" autoComplete="off" autoFocus {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <RadioGroup className="grid grid-cols-2 gap-2" defaultValue={field.value} onValueChange={field.onChange}>
                                        <ViewGrid />
                                    </RadioGroup>
                                </FormItem>
                            )}
                        />
                        <p className="text-xs">
                            By creating a new view, all members in your workspace will have access to it.
                        </p>
                        <Button className="w-full" type="submit" size="xs" disabled={isLoading} loading={isLoading}>
                            Create
                        </Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
}

export function ViewGrid() {
    return (
        <React.Fragment>
            {VIEWS.map((view) => (
                <FormItem key={view.label}>
                    <FormControl>
                        <div>
                            <RadioGroupItem
                                value={view.type}
                                id={view.type}
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor={view.type}
                                className="border-muted bg-popover hover:bg-accent peer-data-[state=checked]:text-primary peer-data-[state=checked]:border-primary flex flex-col items-center justify-between space-y-3 rounded-md border-2 p-3 text-zinc-500"
                            >
                                {VIEW_ICONS[view.type as "board" | "calendar" | "list" | "table"]}
                                {view.label}
                            </Label>
                        </div>
                    </FormControl>
                </FormItem>
            ))}
        </React.Fragment>
    );
}
