import React from "react";
import { notFound } from "next/navigation";

import { db } from "@workspace/db";

export default async function ProjectPage({ params }: { params: { projectId: string } }) {
  const project = await db.project.findUnique({
    where: { id: params.projectId },
  });
  if (!project) {
    return notFound();
  }
  return <div></div>;
}
