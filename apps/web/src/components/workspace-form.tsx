"use client";

import React, { useEffect } from "react";

import { FieldValues, UseFormReturn } from "react-hook-form";

import {
    Avatar,
    AvatarFallback,
    Button,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@workspace/ui";

import { ColorSelect } from "@/components/theme-select";
import { slugify } from "@/lib/utils";

interface WorkspaceFormProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

export function WorkspaceForm({ form }: WorkspaceFormProps) {
    const watchSlug = form.watch("slug");
    useEffect(() => {
        if (!Object.keys(form.formState.dirtyFields).includes("slug")) {
            form.setValue("slug", slugify(watchSlug));
        }
    }, [watchSlug, form]);
    const theme = form.watch("theme");
    return (
        <div className="space-y-3 py-2">
            <div className="flex items-center gap-4">
                <Avatar className="flex h-14 w-14 items-center justify-center">
                    <AvatarFallback
                        className="border-border border text-lg font-medium text-white"
                        style={{ backgroundColor: theme }}
                    >
                        {form.getValues("name")[0] ?? "W"}
                    </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" onClick={(e) => e.preventDefault()}>
                    Upload image
                </Button>
            </div>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input autoComplete="off" autoFocus {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Workspace URL</FormLabel>
                        <FormControl>
                            <Input addPrefix="workspace.com/" autoComplete="off" {...field} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>A unique identifier for your workspace.</FormDescription>
                    </FormItem>
                )}
            />
            <ColorSelect form={form} name="theme" />
        </div>
    );
}
