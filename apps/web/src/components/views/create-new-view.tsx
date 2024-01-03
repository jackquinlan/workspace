"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Layers, Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { addViewSchema } from "@workspace/lib/validators/view";
import {
    Button,
    CancelButton,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useZodForm,
} from "@workspace/ui";

import { Loader } from "@/components/loading-animation";
import { api } from "@/trpc/react";

export function CreateNewViewModal() {
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();
    const [isLoading, startTransition] = useTransition();
    const form = useZodForm({
        schema: addViewSchema,
        defaultValues: {
            name: "",
        },
    });

    const addView = api.view.addView.useMutation({
        onSuccess: (data) => router.push(`/view/${data.id}`),
    });

    async function handleAddView(data: z.infer<typeof addViewSchema>) {
        startTransition(async () => {
            try {
                await addView.mutateAsync(data);
                form.reset();
                router.refresh();
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            }
        });
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Plus 
                onClick={() => setOpen(!open)}
                className="h-5 w-5 cursor-pointer rounded-md p-[2px] hover:bg-[#DDDDDC]" 
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[450px]" showClose={false}>
                    <DialogTitle className="flex items-center gap-1 text-xl">
                        <Layers className="h-5 w-5" />
                        Add view
                    </DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAddView)} className="-mt-2 space-y-2">
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
                            <DialogFooter className="pt-2">
                                <CancelButton size="sm" close={() => setOpen(false)}>Cancel</CancelButton>
                                <Button type="submit" size="sm" className="px-4">
                                    {isLoading ? <Loader size="sm" /> : "Add"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
