import * as React from "react";
import Link from "next/link";

import { Inbox } from "lucide-react";
import type { User } from "next-auth";

import { Separator } from "@workspace/ui";

import { api } from "@/trpc/server";
import { cn } from "@/lib/utils";
import { CreateNewViewModal } from "@/components/views/create-new-view";
import { SettingsMenu } from "@/components/layout/settings-menu";
import { ViewSettings } from "@/components/views/view-settings";

interface Props {
    user: User;
}

export async function Sidebar({ user }: Props) {
    const views = await api.view.getUserViews.query();
    
    return (
        <aside className="border-r-border bg-sidebar hidden w-[300px] border-r md:block">
            <div className="flex justify-end p-2">
                <SettingsMenu user={user} />
            </div>
            <Separator />
            <div className="flex flex-col space-y-1 p-2">
                <SidebarItem href="/inbox">
                    <Inbox className="h-4 w-4" />
                    Inbox
                </SidebarItem>
            </div>
            <div className="flex flex-col space-y-1 px-2">
                <div className="flex items-center justify-between rounded-md p-1 text-xs font-medium hover:bg-muted">
                    <h1>Views</h1>
                    <CreateNewViewModal />
                </div>
                {views.map((view, i) => (
                    <SidebarItem key={i} href={`/view/${view.id}`} className="justify-between">
                        <h1 className="flex items-center gap-2 text-sm">
                            <div className="border-border h-2.5 w-2.5 rounded-sm border bg-red-400" />
                            {view.name}
                        </h1>
                        {/* TODO: Only show ViewSettings when user hovers over the specific view. */}
                        <ViewSettings view={view} />
                    </SidebarItem>
                ))}
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
