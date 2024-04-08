"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { editViewSchema } from "@workspace/lib/validators/view";
import type { View } from "@workspace/db/client";
import { api } from "@workspace/api/react";
import {
    dropdownItemClass,
    Button,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    Form,
    useZodForm,
} from "@workspace/ui";

import { cn } from "@/lib/utils";
import { ViewForm } from "./view-form";

interface Props {
    view: View;
}

export function EditViewModal({ view }: Props) {
    const [isLoading, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);
    const form = useZodForm({
        schema: editViewSchema,
        defaultValues: {
            name: view.name ?? "",
            type: view.type ?? "",
            viewId: view.id ?? "",
        },
    });
    const router = useRouter();
    const editView = api.view.editView.useMutation({
        onSuccess: (data) => {
            router.refresh();
            setOpen(false);
            form.reset();
            toast("View updated successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    async function handleSubmit(data: z.infer<typeof editViewSchema>) {
        startTransition(async () => {
            await editView.mutateAsync(data);
        });
    }
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <div onClick={() => setOpen(!open)} className={cn(dropdownItemClass)}>
                <Pencil className="h-4 w-4" />
                Edit 
            </div>
            <DialogContent className="top-[25%]" showClose={false}>
                <DialogTitle>Update {view.name}</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className="px-6 pb-4 -mt-4">
                            <ViewForm form={form} showLabels />
                        </div>
                        <DialogFooter>
                            <Button type="submit" size="sm" loading={isLoading} disabled={isLoading}>Update</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}