import * as React from "react";
import Link from "next/link";

import { Bell, Inbox, Search } from "lucide-react";
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

export async function Sidebar({ user, workspaces }: Props) {
    
    return (
        <aside className="border-r-border bg-sidebar hidden w-[300px] border-r md:block">
            <div className="flex items-center justify-between p-2">
                <WorkspaceSelector workspaces={workspaces} activeId={user.workspace ?? workspaces[0].id} />
                <SettingsMenu user={user} />
            </div>
            <Separator />
            <div className="flex flex-col space-y-1 p-2">
                <SidebarItem href="/inbox">
                    <Inbox className="h-4 w-4" />
                    Inbox
                </SidebarItem>
                <SidebarItem href="/inbox">
                    <Bell className="h-4 w-4" />
                    Notifications 
                </SidebarItem>
                <SidebarItem href="/inbox">
                    <Search className="h-4 w-4" />
                    Search 
                </SidebarItem>
            </div>
        </aside>
    );
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    href: string;
    action?: () => void;
}

export function SidebarItem({ className = "", children, href }: ItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-2 rounded-md px-1 py-[3px] text-sm hover:bg-muted",
                className,
            )}
        >
            {children}
        </Link>
    );
}
