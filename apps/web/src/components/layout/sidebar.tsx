import * as React from "react";
import Link from "next/link";

import { Bell, Calendar, Inbox, Search } from "lucide-react";
import type { User } from "next-auth";

import type { Workspace } from "@workspace/db";
import { Separator } from "@workspace/ui";

import { cn } from "@/lib/utils";
import { SettingsMenu } from "@/components/layout/settings-menu";
import { WorkspaceSelector } from "@/components/layout/workspace-selector";

interface Props {
    workspaces: Workspace[];
    user: User;
}

export function Sidebar({ user, workspaces }: Props) {

    return (
        <aside className="h-full bg-sidebar">
            <div className="flex items-center justify-between p-2">
                <WorkspaceSelector workspaces={workspaces} activeId={user.workspace ?? workspaces[0].id} />
                <SettingsMenu user={user} />
            </div>
            <Separator />
            <div className="flex flex-col space-y-1 p-2">
                <div className="flex items-center justify-between p-1 mb-2 text-sm border border-border rounded-md shadow-sm bg-white hover:bg-accent">
                    <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Search
                    </div>
                    <p className="border border-border rounded-md p-1 text-xs">⌘K</p>
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
            className={cn(
                "hover:bg-muted flex items-center gap-2 rounded-md px-1 py-[3px] text-sm",
                className,
            )}
            href={href}
        >
            {children}
        </Link>
    );
}
