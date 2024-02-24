"use client";

import React from "react";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup, ScrollArea } from "@workspace/ui";

import { Sidebar } from "@/components/layout/sidebar";
import { useSidebarContext } from "./use-sidebar-context";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    defaultLayout?: number[];
}

export function ResizeLayoutWrapper({ children, defaultLayout = [33, 67] }: Props) {
    const { open } = useSidebarContext();
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
                <Sidebar />
            </ResizablePanel>
            <ResizableHandle className={cn(!open ? "hidden" : "visible")} />
            <ResizablePanel id="content" defaultSize={defaultLayout[1]} order={2}>
                <ScrollArea className="h-full w-full">
                    <main className="container grow">{children}</main>
                </ScrollArea>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
