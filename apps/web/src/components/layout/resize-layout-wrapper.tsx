"use client";

import React from "react";

import type { User } from "next-auth";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup, ScrollArea } from "@workspace/ui";

import { Sidebar } from "@/components/layout/sidebar";
import { SidebarToggleButton } from "@/components/layout/sidebar-toggle";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

interface Props {
    children: React.ReactNode;
    defaultLayout?: number[];
    user: User;
}

export function ResizeLayoutWrapper({ children, defaultLayout = [33, 67], user }: Props) {
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
                <Sidebar user={user} />
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
