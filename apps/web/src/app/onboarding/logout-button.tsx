"use client";

import React from "react";

import { ExitIcon } from "@radix-ui/react-icons";
import { User } from "next-auth";
import { signOut } from "next-auth/react";

import { Button } from "@workspace/ui";

export function Logout({ user }: { user: User }) {
    return (
        <div className="flex items-center gap-3 absolute right-6 top-6">
            <p className="text-sm">Logged in as <span className="font-medium">{user.email}</span>:</p>
            <Button
                className="flex items-center gap-1"
                onClick={() => signOut()}
                variant="outline"
            >
                <ExitIcon className="h-4 w-4" />
                Logout
            </Button>
        </div>
    );
}