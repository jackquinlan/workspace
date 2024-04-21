"use client";

import React from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";

import { Button } from "@workspace/ui";

import { UserButton } from "@/components/layout/user-button";
import { cn } from "@/lib/utils";

interface LayoutButtonsProps {
  hasWorkspace: boolean;
  user: User;
}

export function LayoutButtons({ hasWorkspace, user }: LayoutButtonsProps) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2 p-6",
        !hasWorkspace && "justify-end",
      )}
    >
      {hasWorkspace && user.activeWorkspace && (
        <Button variant="outline" size="sm" onClick={() => router.push("/inbox")}>
          Cancel
        </Button>
      )}
      <UserButton user={user} align="end" />
    </div>
  );
}
