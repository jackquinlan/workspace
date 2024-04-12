import React from "react";
import { notFound } from "next/navigation";

import { db } from "@workspace/db";
import { ScrollArea, ScrollBar } from "@workspace/ui";

import { Board } from "./components/board";

export const dynamic = "force-dynamic";

export default async function ViewPage({
    params,
}: {
    params: { projectId: string; viewId: string };
}) {
    const view = await db.view.findUnique({
        where: { id: params.viewId },
    });
    if (!view) {
        return notFound();
    }
    const groupsWithTasks = await db.group.findMany({
        where: {
            projectId: params.projectId,
        },
        include: { tasks: true },
    });

    return (
        <div className="flex flex-col h-2/3 py-6">
            <ScrollArea className="flex flex-grow h-full pt-2">
                <div className="w-max">
                    <Board groupsWithTasks={groupsWithTasks} projectId={params.projectId} />
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
