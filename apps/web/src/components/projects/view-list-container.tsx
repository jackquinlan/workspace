"use client";

import React from "react";

import { CalendarDays, KanbanSquare, List, Table, Plus } from "lucide-react";

import type { View } from "@workspace/db/client";

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
    const { maxVisibleViews, containerRef, viewListRef } = useVisibleViews(views.length);
    console.log(maxVisibleViews);
    return (
        <div className="flex items-center justify-between h-10 w-full border-b border-b-border">
            <div ref={containerRef} className="flex items-center gap-2 w-1/3 md:w-2/3 bg-fuchsia-200">
                <ol ref={viewListRef} className="flex items-center gap-2 list-none">
                    {views.map((view) => (
                        <li key={view.id} className="flex items-center gap-1 p-1 rounded-md cursor-pointer text-sm hover:bg-accent">
                            {VIEW_ICONS[view.type]}
                            {view.name}
                        </li>
                    ))}
                </ol>
                <div className="w-px h-4 rounded-md border-l border-border" />
                <div className="flex items-center gap-1 p-1 rounded-md cursor-pointer text-sm hover:bg-accent">
                    <Plus className="h-4 w-4" />
                    View
                </div>
            </div>
        </div>
    );
}

export { ViewListContainer };

