"use client";

import React from "react";
import { usePathname } from "next/navigation";

import type { User } from "next-auth";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup, ScrollArea } from "@workspace/ui";

import { Sidebar } from "@/components/layout/sidebar";
import { SidebarToggleButton } from "@/components/layout/sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { SettingsSidebar } from "./settings-sidebar";

interface Props {
    children: React.ReactNode;
    defaultLayout?: number[];
    user: User;
}

export function ResizeLayoutWrapper({ children, defaultLayout = [33, 67], user }: Props) {
    const pathname = usePathname();
    const { open } = useSidebar();
    return (
        <ResizablePanelGroup
            className="h-full items-stretch"
            direction="horizontal"
            onLayout={(sizes: number[]) =>
                (document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`)
            }
        >
            <ResizablePanel
                id="sidebar"
                className={cn(!open ? "hidden" : "visible")}
                minSize={15}
                maxSize={25}
                defaultSize={defaultLayout[0]}
            >
                {pathname.startsWith("/settings/") ? (
                    <SettingsSidebar user={user} />
                ) : (
                    <Sidebar user={user} />
                )}
            </ResizablePanel>
            <ResizableHandle className={cn(!open ? "hidden" : "visible")} />
            <SidebarToggleButton />
            <ResizablePanel id="content" defaultSize={defaultLayout[1]} order={2}>
                <ScrollArea className="h-full w-full">
                    <main className="container grow">{children}</main>
                </ScrollArea>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
