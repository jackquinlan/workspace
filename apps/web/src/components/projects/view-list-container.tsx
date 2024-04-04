"use client";

import React from "react";

import { KanbanSquare } from "lucide-react";

import type { View } from "@workspace/db/client";

import { useVisibleViews } from "@/hooks/use-visible-views";

interface ViewListContainerProps {
    views: View[];
}

function ViewListContainer({ views }: ViewListContainerProps) {
    const { maxVisibleViews, viewListRef } = useVisibleViews(views.length);
    console.log(maxVisibleViews);
    return (
        <div className="flex items-center justify-between h-10 w-full border-b border-b-border">
            <div className="flex items-center gap-2">
                {views.map((view) => (
                    <p key={view.id} className="flex items-center gap-1 p-1 rounded-md cursor-pointer hover:bg-accent">
                        <KanbanSquare className="h-4 w-4" />
                        {view.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

export { ViewListContainer };

