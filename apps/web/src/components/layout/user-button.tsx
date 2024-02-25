"use client";

import React from "react";

import type { User } from "next-auth";
import { LogOut, Settings, Star } from "lucide-react";
import { signOut } from "next-auth/react";

import {
    Avatar,
    AvatarFallback,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLink,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuGroup
} from "@workspace/ui";

interface UserButtonProps {
    user: User;
}

export function UserButton({ user }: UserButtonProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-7 w-7">
                    <AvatarFallback className="border border-border bg-indigo-500" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px]" align="start">
                <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-7 w-7">
                        <AvatarFallback className="border border-border bg-indigo-500" />
                    </Avatar>
                    <h1 className="font-medium">@{user.name}</h1>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuLink href="/settings">
                        <Settings className="h-4 w-4" />
                        Settings
                    </DropdownMenuLink>
                    <DropdownMenuItem>
                        <Star className="text-yellow-400 h-4 w-4" />
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