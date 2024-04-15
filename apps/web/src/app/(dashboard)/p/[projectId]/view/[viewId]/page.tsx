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
  const proj = await db.project.findFirst({
    where: { id: params.projectId },
  });
  const view = await db.view.findUnique({
    where: { id: params.viewId },
  });
  if (!proj || !view) {
    return notFound();
  }
  const groupsWithTasks = await db.group.findMany({
    where: {
      projectId: params.projectId,
    },
    include: { tasks: true },
  });

  return (
    <div className="flex h-2/3 flex-col py-3">
      <ScrollArea className="flex h-full flex-grow pt-2">
        <div className="w-max">
          <Board groupsWithTasks={groupsWithTasks} project={proj} />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
