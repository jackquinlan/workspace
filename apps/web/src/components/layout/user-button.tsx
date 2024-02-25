"use client";

import React from "react";

import { LogOut, Settings, Star } from "lucide-react";
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
    DropdownMenuTrigger,
} from "@workspace/ui";

interface UserButtonProps {
    user: User;
}

export function UserButton({ user }: UserButtonProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-7 w-7">
                    <AvatarImage src={user.image ?? undefined} />
                    <AvatarFallback className="border-border border bg-accent" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px]" align="start">
                <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-7 w-7">
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback className="border-border border bg-accent" />
                    </Avatar>
                    <div className="flex flex-col text-left text-xs">
                        <h1 className="font-medium text-md">@{user.name}</h1>
                        <h2>{user.email}</h2>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLink href="/settings">
                        <Settings className="h-4 w-4" />
                        Settings
                    </DropdownMenuLink>
                    <DropdownMenuItem>
                        <Star className="h-4 w-4 text-yellow-400" />
                        Upgrade to Pro
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                >
                    <LogOut className="h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
