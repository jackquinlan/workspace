"use client";

import React from "react";

import { CalendarDays, KanbanSquare, List, Table, Plus, Settings } from "lucide-react";

import type { View } from "@workspace/db/client";
import { Button } from "@workspace/ui";

import { useVisibleViews } from "@/hooks/use-visible-views";

const VIEW_ICONS = {
    board: <KanbanSquare className="h-4 w-4" />,
    calendar: <CalendarDays className="h-4 w-4" />,
    list: <List className="h-4 w-4" />,
    table: <Table className="h-4 w-4" />,
}

interface ViewListContainerProps {
    views: View[];
}

function ViewListContainer({ views }: ViewListContainerProps) {
    const { maxVisibleViews, containerRef, viewListRef } = useVisibleViews(views.length, 83);
    console.log(maxVisibleViews);
    const displayViews = views.slice(0, maxVisibleViews);
    return (
        <div className="flex items-center justify-between h-10 w-full border-b border-b-border">
            <div 
                ref={containerRef} 
                className="flex items-center gap-2 w-1/3 md:w-2/3"
            >
                <ol ref={viewListRef} className="flex items-center gap-2 list-none">
                    {displayViews.map((view) => (
                        <li 
                            key={view.id} 
                            className="flex items-center gap-1 p-1 rounded-md cursor-pointer text-sm hover:bg-accent"
                        >
                            {VIEW_ICONS[view.type]}
                            {view.name}
                        </li>
                    ))}
                    {(views.length - displayViews.length) > 0 && (
                        <li className="flex items-center gap-1 w-16 p-1 rounded-md cursor-pointer text-sm hover:bg-accent">
                            {views.length - displayViews.length} more...
                        </li>
                    )}
                </ol>
                <div className="w-px h-4 rounded-md border-l border-border" />
                <div className="flex items-center gap-1 p-1 rounded-md cursor-pointer text-sm hover:bg-accent">
                    <Plus className="h-4 w-4" />
                    View
                </div>
            </div>
            <div className="flex items-center justify-end gap-1 w-2/3 md:w-1/3">
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    Settings
                </Button>
            </div>
        </div>
    );
}

export { ViewListContainer };

