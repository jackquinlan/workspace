"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { CalendarDays, KanbanSquare, List, Table, Plus, Settings } from "lucide-react";

import type { Project, View } from "@workspace/db/client";
import { Button } from "@workspace/ui";

import { useVisibleViews } from "@/hooks/use-visible-views";
import { cn } from "@/lib/utils";
import { CreateViewMenu } from "./create-view-menu";

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
    const displayViews = views.slice(0, maxVisibleViews);
    return (
        <div className="flex items-center justify-between h-10 gap-0.5 w-full border-b border-b-border">
            <div 
                ref={containerRef} 
                className="flex items-center gap-3 w-1/2"
            >
                <ol ref={viewListRef} className="flex items-center gap-2 list-none">
                    {displayViews.map((view) => (
                        <ViewItem key={view.id} projectId={project.id} view={view} />
                    ))}
                    {(views.length - displayViews.length) > 0 && (
                        <li className="flex items-center gap-1 w-16 p-1 rounded-md cursor-pointer text-sm hover:bg-accent">
                            {views.length - displayViews.length} more...
                        </li>
                    )}
                </ol>
                <div className="w-px h-4 rounded-md border-l border-border" />
                <CreateViewMenu project={project} />
            </div>
            <div className="flex items-center justify-end gap-1 w-2/3 md:w-1/3">
                <Button size="xs" className="flex items-center gap-1 w-fit">
                    <Plus className="block h-4 w-4 md:hidden" />
                    <span className="hidden md:block">New Task</span>
                </Button>
                <Button variant="outline" size="xs" className="flex items-center gap-1 w-fit font-normal">
                    <Settings className="h-4 w-4" />
                    <span className="hidden md:block">Settings</span>
                </Button>
            </div>
        </div>
    );
}

export function ViewItem({ projectId, view }: { projectId: string, view: View }) {
    const params = useParams<{ viewId: string; id: string }>();
    return (
        <div className={cn("flex items-center h-10", view.id === params.viewId && "border-b-2 border-primary")}>
            <Link 
                href={`/p/${projectId}/view/${view.id}`}
                className={cn(
                    "flex items-center gap-1 h-7 p-1 rounded-md cursor-pointer text-sm w-fit truncate hover:bg-accent",
                )}
            >
                {VIEW_ICONS[view.type]}
                {view.name}
            </Link>
        </div>
    );
}

