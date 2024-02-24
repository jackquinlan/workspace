import React from "react";
import Link from "next/link";

import type { User } from "next-auth";
import { Bell, Calendar, Inbox, Search, Zap } from "lucide-react";

import { Separator } from "@workspace/ui";

import { cn } from "@/lib/utils";
import { UserButton } from "./user-button";

interface SidebarProps {
    user: User;
}

export function Sidebar({ user }: SidebarProps) {
    return (
        <aside className="bg-sidebar flex h-full flex-col">
            <div className="flex items-center justify-between p-2">
                <UserButton user={user} />
            </div>
            <Separator />
            <div className="flex flex-col space-y-1 p-2">
                <div className="border-border hover:bg-accent mb-2 flex items-center justify-between rounded-md border bg-white p-1 text-sm shadow-sm">
                    <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Search
                    </div>
                    <p className="border-border bg-muted rounded-md border p-1 text-xs">⌘+K</p>
                </div>
                <SidebarItem href="/inbox">
                    <Inbox className="h-4 w-4" />
                    Inbox
                </SidebarItem>
                <SidebarItem href="/inbox">
                    <Bell className="h-4 w-4" />
                    Notifications
                </SidebarItem>
                <SidebarItem href="/inbox">
                    <Calendar className="h-4 w-4" />
                    Calendar
                </SidebarItem>
                <SidebarItem href="/inbox">
                    <Zap className="h-4 w-4" />
                    Automations
                </SidebarItem>
            </div>
        </aside>
    );
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    action?: () => void;
    href: string;
}

export function SidebarItem({ className = "", children, href }: ItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "hover:bg-muted flex items-center gap-2 rounded-md px-1 py-[3px] text-sm",
                className,
            )}
        >
            {children}
        </Link>
    );
}
