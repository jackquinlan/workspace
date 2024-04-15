import React from "react";
import { notFound, redirect } from "next/navigation";

import { db } from "@workspace/db";

export default async function ProjectPage({ params }: { params: { projectId: string } }) {
  const project = await db.project.findUnique({
    where: { id: params.projectId },
  });
  if (!project) {
    return notFound();
  }
  const views = await db.view.findMany({
    where: {
      projectId: project.id,
    },
  });
  return <div></div>;
  // return redirect(`/p/${project.id}/view/${views[0].id}`);
}
