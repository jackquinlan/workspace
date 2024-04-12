"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { CalendarDays, KanbanSquare, List, Plus, Table } from "lucide-react";

import type { Project, View } from "@workspace/db/client";
import { Button, ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@workspace/ui";

import { useVisibleViews } from "@/hooks/use-visible-views";
import { cn } from "@/lib/utils";
import { CreateViewMenu } from "./create-view-menu";
import { ViewSettingsDropdown } from "./view-settings-dropdown";

export const VIEW_ICONS = {
    board: <KanbanSquare className="h-4 w-4" />,
    calendar: <CalendarDays className="h-4 w-4" />,
    list: <List className="h-4 w-4" />,
    table: <Table className="h-4 w-4" />,
};

interface ViewListContainerProps {
    project: Project;
    views: View[];
}

export function ViewListContainer({ project, views }: ViewListContainerProps) {
    const { maxVisibleViews, containerRef, viewListRef } = useVisibleViews(views.length, 80);
    const params = useParams<{ viewId: string; id: string }>();
    const displayViews = views.slice(0, maxVisibleViews);
    const activeView = views.filter((v) => v.id === params.viewId)[0];
    return (
        <div className="flex items-center justify-between gap-0.5 h-10 border-b">
            <div ref={containerRef} className="flex items-center gap-3">
                <ol ref={viewListRef} className="flex list-none items-center gap-2">
                    {displayViews.map((view) => (
                        <ViewItem
                            key={view.id}
                            projectId={project.id}
                            view={view}
                            isActive={view.id === params.viewId}
                        />
                    ))}
                    {views.length - displayViews.length > 0 && (
                        <li className="hover:bg-accent flex w-16 cursor-pointer items-center gap-1 rounded-md p-1 text-sm">
                            {views.length - displayViews.length} more...
                        </li>
                    )}
                </ol>
                <div className="border-border h-4 w-px rounded-md border-l" />
                <CreateViewMenu project={project} />
            </div>
            <div className="flex items-center justify-end gap-1">
                {activeView && <ViewSettingsDropdown projectId={project.id} view={activeView} />}
                <Button size="xs" className="flex w-fit items-center gap-1">
                    <Plus className="h-4 w-4" />
                    <span className="hidden md:block">Task</span>
                </Button>
            </div>
        </div>
    );
}

export function ViewItem({
    projectId,
    view,
    isActive,
}: {
    projectId: string;
    view: View;
    isActive: boolean;
}) {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    className={cn(
                        "flex h-10 items-center",
                        isActive && "border-primary border-b-2",
                    )}
                >
                    <Link
                        className="hover:bg-accent flex h-7 w-fit cursor-pointer items-center gap-1 truncate rounded-md p-1 text-sm"
                        href={`/p/${projectId}/view/${view.id}`}
                    >
                        {VIEW_ICONS[view.type]}
                        {view.name}
                    </Link>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">View Settings</ContextMenuContent>
        </ContextMenu>
    );
}
