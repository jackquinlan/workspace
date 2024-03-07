"use client";

import React, { useState, useTransition } from "react";

import { AlertTriangle, Trash } from "lucide-react";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import { api } from "@workspace/api/react";
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
} from "@workspace/ui";

import { Loader } from "@/components/loading-animation";

interface Props {
    user: User;
}

export function DeleteUserModal({ user }: Props) {
    const [isLoading, startTransition] = useTransition();
    const [confirmChecked, setConfirmChecked] = useState<boolean>(false);
    const [confirmName, setConfirmName] = useState<string>("");

    const deleteUser = api.user.deleteUser.useMutation({
        onSuccess: () => {
            toast.success("Account deleted successfully. Redirecting...");
            signOut({ callbackUrl: "/login" });
        },
        onError: (err) => {
            toast.error("Unable to delete your account.");
        },
    });
    async function handleDelete() {
        startTransition(async () => {
            await deleteUser.mutateAsync({ id: user.id });
        });
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="danger" size="sm" className="w-fit">
                    <Trash className="me-1 h-3 w-3" /> Delete account
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="top-[25%]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-1">
                        <AlertTriangle className="text-destructive h-4 w-4" /> Delete your account
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="py-2">
                    Are you sure you want to delete your account? All data associated with your
                    account will deleted immediately.{" "}
                    <span className="text-destructive font-medium">
                        This action cannot be undone.
                    </span>
                    <div className="pb-2 pt-4 text-sm font-normal">
                        Enter your name <span className="font-mono">{user.name}</span> to confirm.
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
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading || confirmName !== user.name || !confirmChecked}
                    >
                        {isLoading ? <Loader size="sm" /> : "Confirm Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
