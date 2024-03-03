import React from "react";

import { ArrowLeft, UserIcon } from "lucide-react";
import type { User } from "next-auth";

import { Separator } from "@workspace/ui";

import { SidebarItem } from "./sidebar-item";

interface Props {
    user: User;
}

export function SettingsSidebar({ user }: Props) {
    return (
        <aside className="bg-sidebar flex h-full flex-col">
            <div className="flex items-center justify-between p-2">
                <SidebarItem href="/inbox" className="w-full">
                    <ArrowLeft className="h-4 w-4" /> Back
                </SidebarItem> 
            </div>
            <Separator />
            <div className="flex flex-col space-y-1 mt-4 p-2">
                <SidebarItem href="/settings/profile">
                    <UserIcon className="h-4 w-4" />
                    Profile
                </SidebarItem>
            </div>
        </aside>
    );
}