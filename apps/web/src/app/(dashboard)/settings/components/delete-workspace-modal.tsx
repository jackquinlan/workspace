"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { api } from "@workspace/api/react";
import type { Workspace } from "@workspace/db/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Checkbox,
  Input,
  Label,
  LoadingDots,
} from "@workspace/ui";

interface Props {
  workspace: Workspace;
}

export function DeleteWorkspaceModal({ workspace }: Props) {
  const [isLoading, startTransition] = useTransition();
  const [confirmChecked, setConfirmChecked] = useState<boolean>(false);
  const [confirmName, setConfirmName] = useState<string>("");

  const router = useRouter();
  const deleteWorkspace = api.workspace.deleteWorkspace.useMutation({
    onSuccess: () => {
      toast.success("Workspace deleted successfully. Redirecting...");
      router.push("/inbox");
      router.refresh();
    },
    onError: () => {
      toast.error("Unable to delete your workspace.");
    },
  });
  async function handleDelete() {
    startTransition(async () => {
      await deleteWorkspace.mutateAsync({ workspaceId: workspace.id });
    });
  }
  const isDisabled = isLoading || confirmName !== workspace.name || !confirmChecked;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="danger" size="sm" className="w-fit">
          Delete workspace
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="top-[25%]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-1">
            <AlertTriangle className="text-destructive h-4 w-4" /> Delete {workspace.name}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="pt-2">
          Are you sure you want to delete this workspace? All data associated with it will deleted
          immediately.{" "}
          <span className="text-destructive font-medium">This action cannot be undone.</span>
        </AlertDialogDescription>
        <div className="-mt-4 px-5">
          <div className="pb-2 pt-4 text-sm font-normal">
            Enter workspace name <span className="font-mono">{workspace.name}</span> to confirm.
          </div>
          <Input autoFocus onChange={(e) => setConfirmName(e.target.value)} />
          <div className="mb-2 mt-5 flex items-center gap-2">
            <Checkbox
              id="confirm"
              checked={confirmChecked}
              onCheckedChange={() => setConfirmChecked(!confirmChecked)}
            />
            <Label htmlFor="confirm" className="text-sm">
              I acknowledge that this action is permanent and cannot be undone.
            </Label>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDisabled}>
            {isLoading ? <LoadingDots size="sm" /> : "Confirm Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
