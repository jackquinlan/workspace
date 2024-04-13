"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { toast } from "sonner";
import { z } from "zod";

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage, 
    Button,
    Form,
    useZodForm
} from "@workspace/ui";

import { UploadButton } from "@/lib/uploadthing";
import { deleteAvatar } from "../../../../actions/delete-image";

export const deleteImageSchema = z.object({
    file: z.string().min(1),
});

interface Props {
    user: User;
}

export function UpdateAvatar({ user }: Props) {
    const router = useRouter();
    const deleteAvatarWithFile = deleteAvatar.bind(null, user.image ?? "");
    const form = useZodForm({
        schema: deleteImageSchema,
        defaultValues: { file: user.image ?? "" },
    });

    return (
        <div className="flex items-center gap-4 pb-6 pt-4">
            <Avatar className="h-16 w-16">
                <AvatarImage 
                    src={user.image ?? undefined} />
                <AvatarFallback className="border-border border text-white bg-red-500">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
                <UploadButton 
                    className="ut-button:mt-4 ut-button:bg-primary ut-button:h-8 ut-button:px-3 ut-button:text-xs ut-button:hover:bg-red-600 ut-button:ring-0 ut-button:ut-uploading:after:bg-red-500"
                    endpoint="userAvatar"
                    onClientUploadComplete={() => {
                        toast("Avatar updated successfully.");
                        router.refresh();
                    }}
                    onUploadError={() => {
                        toast.error("Failed to update avatar.");
                    }}
                />
                {user.image && (
                    <Form {...form}>
                        <form action={deleteAvatarWithFile}>
                            <Button className="mt-4" variant="outline" size="sm">
                                Remove
                            </Button>
                        </form>
                    </Form>
                )}
            </div>
        </div>
    );
}