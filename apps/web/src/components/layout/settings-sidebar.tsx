import React from "react";

import { ArrowLeft, Bell, CreditCard, Settings, User, Users } from "lucide-react";

import { Separator } from "@workspace/ui";

import { SidebarItem } from "./sidebar-item";

interface Props {}

export function SettingsSidebar({}: Props) {
    return (
        <aside className="bg-sidebar flex h-full flex-col">
            <div className="flex items-center justify-between p-2">
                <SidebarItem href="/inbox" className="w-full">
                    <ArrowLeft className="h-4 w-4" /> Back
                </SidebarItem>
            </div>
            <Separator />
            <div className="mt-2 flex flex-col space-y-1 p-2">
                <h1 className="text-sm">Account Settings</h1>
                <SidebarItem href="/settings/profile">
                    <User className="h-4 w-4" />
                    Profile
                </SidebarItem>
                <SidebarItem href="/settings/notifications">
                    <Bell className="h-4 w-4" />
                    Notifications 
                </SidebarItem>
            </div>
            <div className="mt-2 flex flex-col space-y-1 p-2">
                <h1 className="text-sm">Workspace Settings</h1>
                <SidebarItem href="/settings/workspace/general">
                    <Settings className="h-4 w-4" />
                    General
                </SidebarItem>
                <SidebarItem href="/settings/workspace/billing">
                    <CreditCard className="h-4 w-4" />
                    Billing
                </SidebarItem>
                <SidebarItem href="/settings/workspace/members">
                    <Users className="h-4 w-4" />
                    Members
                </SidebarItem>
            </div>
        </aside>
    );
}
