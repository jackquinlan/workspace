import React from "react";
import { notFound } from "next/navigation";

import { db } from "@workspace/db";

import { Board } from "./components/board";

export default async function ViewPage({ params }: { params: { projectId: string, viewId: string } }) {
    const view = await db.view.findUnique({
        where: { id: params.viewId },
    });
    if (!view) {
        return notFound();
    }
    const groupsWithTasks = await db.group.findMany({
        where: { 
            projectId: params.projectId 
        },
        include: { tasks: true },
    });
    
    return (
        <div className="flex flex-col py-6">
            <div className="w-max">
                <Board groupsWithTasks={groupsWithTasks} viewId={view.id} />
            </div>
        </div>
    );
}
