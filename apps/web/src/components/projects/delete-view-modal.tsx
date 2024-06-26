"use client";

import React, { useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { api } from "@workspace/api/react";
import type { View } from "@workspace/db/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  dropdownItemClass,
  LoadingDots,
} from "@workspace/ui";

import { cn } from "@/lib/utils";

interface Props {
  projectId: string;
  view: View;
}

export function DeleteViewModal({ projectId, view }: Props) {
  const [isLoading, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);

  const params = useParams<{ viewId: string; id: string }>();
  const router = useRouter();
  const deleteView = api.view.deleteView.useMutation({
    onSuccess: () => {
      if (view.id === params.viewId) {
        router.push(`/p/${projectId}`);
        router.refresh();
      } else {
        router.refresh();
      }
      setOpen(false);
      toast("View deleted.");
    },
    onError: () => {
      toast.error("Error deleting view.");
    },
  });
  async function handleSubmit() {
    startTransition(async () => {
      await deleteView.mutateAsync({ viewId: view.id });
    });
  }
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <div
        onClick={() => setOpen(!open)}
        className={cn(dropdownItemClass, "hover:text-destructive")}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </div>
      <AlertDialogContent className="top-[25%]">
        <AlertDialogTitle>Are you sure you want to delete this view?</AlertDialogTitle>
        <AlertDialogDescription className="text-md -mt-4">
          This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <LoadingDots size="sm" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
