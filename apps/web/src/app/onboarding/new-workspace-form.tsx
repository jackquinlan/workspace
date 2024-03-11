"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { FieldValues, UseFormReturn, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { api } from "@workspace/api/react";
import { newWorkspaceSchema } from "@workspace/lib/validators/workspace";
import {
    Avatar,
    AvatarFallback,
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    MultiTagInput,
    useZodForm,
} from "@workspace/ui";

import { cn, slugify } from "@/lib/utils";
import { ColorSelect } from "@/components/theme-select";

const FORM_STEPS = ["Workspace info", "Invite teammates", "Color theme & logo"];

interface Props {
    user: User;
}

export function NewWorkspaceForm({ user }: Props) {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [isLoading, startTransition] = useTransition();
    const form = useZodForm({
        schema: newWorkspaceSchema,
        defaultValues: {
            name: `${user.name}'s Workspace`,
            slug: slugify(user.name ?? ""),
            members: [],
            theme: "#52525b",
        },
        mode: "onChange",
    });
    useEffect(() => {
        if (!form.formState.isValid && form.formState.isSubmitting) {
            const error = Object.keys(form.formState.errors);
            const step1 = ["name", "slug"];
            const step2 = ["members"];
            if (step1.some((err) => error.includes(err))) setStep(1);
            else if (step2.some((err) => error.includes(err))) setStep(2);
        }
    }, [form.formState]);
    const createWorkspace = api.workspace.newWorkspace.useMutation({
        onSuccess: (data) => {
            toast.success("Workspace created successfully");
            router.refresh();
            router.push("/inbox");
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
        <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center gap-2">
                {FORM_STEPS.map((stepText, index) => (
                    <React.Fragment key={stepText}>
                        <div key={index} className="flex items-center gap-2 text-sm font-medium">
                            <span
                                className={cn(
                                    "border-border bg-accent text-md my-auto flex h-6 w-6 items-center justify-center rounded-md border p-1",
                                    step >= index + 1 && "bg-primary text-white",
                                )}
                            >
                                {index + 1}
                            </span>
                            <p className={cn(step >= index + 1 ? "text-primary" : "text-black")}>
                                {stepText}
                            </p>
                        </div>
                        {index === FORM_STEPS.length - 1 ? null : (
                            <hr className={cn(
                                    "border-border w-12 rounded-md border", step >= index + 1 && "border-primary",
                                )}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                    {step === 1 ? (
                        <WorkspaceForm form={form} />
                    ) : step === 2 ? (
                        <InviteMembers form={form} />
                    ) : (
                        <ThemeStep form={form} /> 
                    )}
                    <div className="flex items-center justify-end gap-2">
                        {step > 1 && (
                            <Button
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(step - 1);
                                }}
                            >
                                Back
                            </Button>
                        )}
                        {step < FORM_STEPS.length ? (
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setStep(step + 1);
                                }}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button type="submit" loading={isLoading} disabled={isLoading}>
                                {isLoading ? "Creating" : "Create Workspace"}
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}

interface WorkspaceProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

export function WorkspaceForm({ form }: WorkspaceProps) {
    const watchSlug = form.watch("slug");
    useEffect(() => {
        if (!Object.keys(form.formState.dirtyFields).includes("slug")) {
            form.setValue("slug", slugify(watchSlug));
        }
    }, [watchSlug, form]);
    return (
        <div className="space-y-3">
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
        </div>
    );
}

interface InviteStepProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

export function InviteMembers({ form }: InviteStepProps) {
    const { errors } = useFormState();
    return (
        <FormField
            control={form.control}
            name="members"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Invite teammates</FormLabel>
                    <FormControl>
                        <MultiTagInput tags={field.value} onChange={field.onChange} />
                    </FormControl>
                    {Object.keys(errors).includes("members") && (
                        <p className="text-destructive text-[0.8rem] font-medium">Invalid email</p>
                    )}
                    <FormDescription>A unique identifier for your workspace.</FormDescription>
                </FormItem>
            )}
        /> 
    );
}

interface ThemeStepProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
}

export function ThemeStep({ form }: ThemeStepProps) {
    const theme = form.watch("theme");
    return (
        <div className="flex flex-col space-y-3 pb-2">
            <Avatar className="flex justify-center items-center h-12 w-12">
                <AvatarFallback
                    className="border-border border font-medium text-white"
                    style={{ backgroundColor: theme }}
                >
                    {form.getValues("name")[0] ?? "W"}
                </AvatarFallback>
            </Avatar>
            <ColorSelect form={form} name="theme" />
        </div>
    );
}
