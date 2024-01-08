"use client";

import * as React from "react";

import type { User } from "next-auth";

import type { View, Workspace } from "@workspace/db";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, TooltipProvider } from "@workspace/ui";

import { cn } from "@/lib/utils";
import { useSidebarContext } from "@/app/(dashboard)/_providers";
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarToggleButton } from "@/components/layout/sidebar-toggle";

interface Props {
    children: React.ReactNode;
    user: User;
    workspaces: Workspace[];
    views: View[];
    defaultLayout?: number[];
}

export function ResizeableContent({ children, user, workspaces, views, defaultLayout = [33, 67] }: Props) {
    const { open } = useSidebarContext();
    
    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup 
                className="h-full items-stretch" 
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`;
                }}
                direction="horizontal"
            >
                <ResizablePanel 
                    id="sidebar" 
                    className={cn(!open ? "hidden" : "visible")} 
                    minSize={15}
                    maxSize={25} 
                    defaultSize={defaultLayout[0]}
                >
                    <Sidebar user={user} workspaces={workspaces} views={views} />
                </ResizablePanel>
                <ResizableHandle className={cn(!open ? "hidden" : "visible")} />
                <SidebarToggleButton />
                <ResizablePanel id="content" defaultSize={defaultLayout[1]} order={2}>
                    <main className="grow">{children}</main>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}