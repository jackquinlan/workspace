"use client";

import React from "react";

import type { User } from "next-auth";
import { ExitIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui";

interface UserButtonProps {
  user: User;
}

export function UserButton({ user }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" asChild>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback className="border-border bg-accent border" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]" align="start">
        <div className="flex items-center gap-2 px-1 py-1.5">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback className="border-border bg-accent border" />
          </Avatar>
          <div className="flex flex-col text-left text-xs">
            <h1 className="text-md font-medium">@{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLink href="/settings/profile">
            <GearIcon className="h-4 w-4" />
            Settings
          </DropdownMenuLink>
          <DropdownMenuLink href="/onboarding">
            <PlusIcon className="h-4 w-4" />
            Create workspace
          </DropdownMenuLink>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2" onClick={() => signOut({ callbackUrl: "/login" })}>
          <ExitIcon className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
