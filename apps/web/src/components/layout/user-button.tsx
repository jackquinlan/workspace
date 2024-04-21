"use client";

import React from "react";

import { ExitIcon, GearIcon, PlusIcon } from "@radix-ui/react-icons";
import type { User } from "next-auth";
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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui";

const dropdownItems = [
  {
    text: "Settings",
    href: "/settings/profile",
    icon: <GearIcon className="h-4 w-4" />,
    shortcut: "⌘S",
  },
  {
    text: "Create workspace",
    href: "/onboarding",
    icon: <PlusIcon className="h-4 w-4" />,
  },
];

interface UserButtonProps {
  align?: "start" | "end";
  user: User;
}

export function UserButton({ align = "start", user }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none" asChild>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback className="border-border border bg-transparent" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align={align}>
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image ?? undefined} />
            <AvatarFallback className="border-border border bg-transparent" />
          </Avatar>
          <div className="flex flex-col text-left text-xs">
            <h1 className="text-md font-medium">{user.name}</h1>
            <h2>{user.email}</h2>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dropdownItems.map((item) => (
            <DropdownMenuLink key={item.text} href={item.href}>
              <div className="flex items-center gap-2">
                {item.icon}
                {item.text}
              </div>
              {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
            </DropdownMenuLink>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="pb-1.5">
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
            <ExitIcon className="h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
