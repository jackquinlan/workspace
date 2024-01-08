"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Plus, Layers } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { addViewSchema } from "@workspace/lib/validators/view";
import { 
    Button,
    CancelButton,
    Dialog, 
    DialogContent, 
    DialogTitle, 
    DialogFooter,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useZodForm,
} from "@workspace/ui";

import { api } from "@/trpc/react";
import { themeColors } from "@/lib/colors";
import { ColorSelect } from "@/components/color-select";

export function CreateViewButton() {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const form = useZodForm({
        schema: addViewSchema,
        defaultValues: {
            color: themeColors[0].value,
            name: "",
        },
    });
    const addView = api.view.addView.useMutation({
        onSuccess: (data) => {
            if (!(data instanceof Error)) {
                router.push(`/view/${data.id}`);
            }
            form.reset();
            setOpen(false);
        },
    });
    async function handleAddView(data: z.infer<typeof addViewSchema>) {        
        await addView.mutateAsync({ name: data.name, color: data.color.split("|")[0] });
        router.refresh();
    }

    return (
        <React.Fragment>
            <Plus 
                onClick={() => setOpen(!open)}
                className="w-5 h-5 p-0.5 rounded-md cursor-pointer hover:bg-muted"
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[450px]">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Layers className="h-5 w-5" /> Add view
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
                            <ColorSelect form={form} name="color" />
                            <DialogFooter className="pt-2">
                                <CancelButton size="sm" close={() => setOpen(false)}>Cancel</CancelButton>
                                <Button type="submit" size="sm" className="px-4">
                                    Add view
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog> 
        </React.Fragment>
    );
}