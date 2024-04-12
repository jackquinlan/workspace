"use client";

import React from "react";
import { usePathname } from "next/navigation";

import type { User } from "next-auth";

import type { Project, Workspace } from "@workspace/db/client";
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
    projects: Project[];
    activeWorkspace: Workspace;
    workspaces: Workspace[];
}

export function ResizeLayoutWrapper({
    activeWorkspace,
    children,
    defaultLayout = [33, 67],
    user,
    workspaces,
    projects,
}: Props) {
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
                    <SettingsSidebar />
                ) : (
                    <Sidebar
                        activeWorkspace={activeWorkspace}
                        user={user}
                        workspaces={workspaces}
                        projects={projects}
                    />
                )}
            </ResizablePanel>
            <ResizableHandle className={cn(!open ? "hidden" : "visible")} />
            <SidebarToggleButton />
            <ResizablePanel id="content" defaultSize={defaultLayout[1]} order={2}>
                <ScrollArea className="h-full w-full">
                    <main className="mx-8 grow">{children}</main>
                </ScrollArea>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}
