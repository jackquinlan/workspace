"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { toast } from "sonner";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage, Button } from "@workspace/ui";

import { deleteAvatar } from "@/actions/delete-image";
import { useAction } from "@/hooks/use-action";
import { UploadButton } from "@/lib/uploadthing";

export const deleteImageSchema = z.object({
  file: z.string().min(1),
});

interface Props {
  user: User;
}

export function UpdateAvatar({ user }: Props) {
  const router = useRouter();
  const { execute } = useAction(deleteAvatar, {
    onError: (error) => {
      toast(error);
    },
  });
  function handleRemove() {
    if (!user.image) {
      return;
    }
    execute({ file: user.image });
  }

  return (
    <div className="flex items-center gap-4 pb-6 pt-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={user.image ?? undefined} />
        <AvatarFallback className="border-border border bg-red-500 text-white">
          {user.name?.charAt(0).toUpperCase() ?? "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex gap-2">
        <UploadButton
          className="ut-button:mt-4 ut-button:bg-primary ut-button:h-8 ut-button:px-3 ut-button:text-xs ut-button:hover:bg-red-600 ut-button:ring-0 ut-button:ut-uploading:after:bg-red-500"
          endpoint="userAvatar"
          onClientUploadComplete={() => {
            toast("Avatar updated");
            router.refresh();
          }}
          onUploadError={() => {
            toast("Failed to update avatar");
          }}
        />
        {user.image && (
          <Button className="mt-4" variant="outline" size="sm" onClick={handleRemove}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}
