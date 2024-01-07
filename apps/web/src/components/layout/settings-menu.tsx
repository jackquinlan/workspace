"use client";

import React from "react";

import { HelpCircle, LogOut, Star, Settings } from "lucide-react";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";

import {
    Avatar,
    AvatarFallback,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLink,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    Separator,
} from "@workspace/ui";

export function SettingsMenu({ user }: { user: User }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-7 w-7">
                    <AvatarFallback className="border-border border bg-gradient-to-b from-indigo-400 to-indigo-200" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[280px] p-1" side="bottom" align="start">
                <div className="flex items-center gap-2 px-1 py-1.5">
                    <Avatar className="h-7 w-7">
                        <AvatarFallback className="border-border border bg-gradient-to-b from-indigo-400 to-indigo-200" />
                    </Avatar>
                    <div className="flex flex-col text-left text-xs">
                        <h1 className="font-medium">{user.email}</h1>
                        <h2>@{user.name}</h2>
                    </div>
                </div>
                <Separator className="my-1" />
                <DropdownMenuLink href="/settings" className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </div>
                    <DropdownMenuShortcut>⌘+S</DropdownMenuShortcut>
                </DropdownMenuLink>
                <DropdownMenuItem className="flex items-center gap-2">
                    <Star className="text-yellow-400 h-4 w-4" />
                    Upgrade to Pro
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Help 
                </DropdownMenuItem>
                <Separator className="my-1" />
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
