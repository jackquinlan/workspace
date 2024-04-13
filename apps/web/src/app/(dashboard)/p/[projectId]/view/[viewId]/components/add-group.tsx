"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { addGroupSchema } from "@workspace/lib/validators/group";
import { api } from "@workspace/api/react";
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

interface AddGroupProps {
    projectId: string
}

export function AddGroup({ projectId }: AddGroupProps) {
    const [open, setOpen] = useState<boolean>(false);
    const form = useZodForm({ 
        schema: addGroupSchema, defaultValues: { name: "", projectId: projectId } 
    }); 
    const router = useRouter();
    const addGroup = api.group.addGroup.useMutation({
        onSuccess: () => {
            setOpen(false);
            form.reset();
            router.refresh();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    async function handleSubmit(data: z.infer<typeof addGroupSchema>) {
        await addGroup.mutateAsync(data); 
    }
    if (!open) {
        return (
            <Button className="w-[300px] border border-dashed" variant="ghost" onClick={() => setOpen(true)}>
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
                    <Button type="submit" size="sm">Add Group</Button>
                    <CancelButton close={() => setOpen(false)}>Cancel</CancelButton>
                </div>
            </form>
        </Form>
    );
}