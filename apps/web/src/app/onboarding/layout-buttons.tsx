"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { signOut } from "next-auth/react";

import { Button } from "@workspace/ui";

import { UserButton } from "@/components/layout/user-button";

interface LayoutButtonsProps {
    hasWorkspace: boolean;
    user: User;
}

export function LayoutButtons({ hasWorkspace, user }: LayoutButtonsProps) {
    const router = useRouter();
    return (
        <div className="flex items-center gap-2 w-full p-6">
            {hasWorkspace && (
                <Button variant="outline" onClick={() => router.push("/inbox")}>
                    Cancel 
                </Button>
            )}
            <UserButton user={user} />
        </div>
    );
}