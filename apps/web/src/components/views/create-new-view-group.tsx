"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Plus } from "lucide-react";
import { z } from "zod";

import type { View } from "@workspace/db";
import { 
    Button,
    CancelButton,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage, 
    Input,
    useZodForm 
} from "@workspace/ui";
import { addGroupSchema } from "@workspace/lib/validators/group";

import { api } from "@/trpc/react";

interface Props {
    view: View;
}

export function CreateNewViewGroup({ view }: Props) {
    const router = useRouter();
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const form = useZodForm({ schema: addGroupSchema, defaultValues: { name: "", view: view.id } });
    const addGroup = api.group.addGroup.useMutation({
        onSuccess: () => router.refresh(),
    });

    async function handleAddGroup(data: z.infer<typeof addGroupSchema>) {
        try {
            await addGroup.mutateAsync(data);
            form.reset();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
        setFormOpen(false);
    }

    return (
        <React.Fragment>
            {formOpen ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddGroup)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Add group" autoComplete="off" autoFocus {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-2 pt-2">
                            <Button type="submit" size="xs">
                                Add group
                            </Button>
                            <CancelButton close={() => setFormOpen(false)}>Cancel</CancelButton>
                        </div>
                    </form>
                </Form> 
            ) : (
                <Button 
                    className="justify-start hover:text-primary" 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setFormOpen(true)}
                >
                    <Plus className="h-4 w-4 mr-2" /> New group
                </Button>
            )}
        </React.Fragment>
    );
}