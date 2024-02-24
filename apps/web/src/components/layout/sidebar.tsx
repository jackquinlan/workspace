import React from "react";
import Link  from "next/link";

import { 
    Bell, 
    Calendar, 
    Inbox, 
    Search, 
    Zap
} from "lucide-react";

import { Separator } from "@workspace/ui";

import { cn } from "@/lib/utils";

export function Sidebar() {
    return (
        <aside className="flex flex-col h-full bg-sidebar">
            <Separator />
            <div className="flex flex-col space-y-1 p-2">
                <div className="flex items-center justify-between p-1 mb-2 text-sm border border-border rounded-md shadow-sm bg-white hover:bg-accent">
                    <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Search
                    </div>
                    <p className="border border-border rounded-md p-1 text-xs bg-muted">⌘+K</p>
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
            className={cn("flex items-center gap-2 rounded-md px-1 py-[3px] text-sm hover:bg-muted", className)}
        >
            {children}
        </Link>
    );
}