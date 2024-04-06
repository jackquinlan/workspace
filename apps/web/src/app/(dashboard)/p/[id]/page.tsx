import React from "react";
import { redirect } from "next/navigation";

import { db } from "@workspace/db";

import { NoViewFound } from "./no-view-found";

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const project = await db.project.findUnique({
        where: { id: params.id },
    });
    if (!project) {
        return <NoViewFound />;
    }
    const links = await db.link.findMany({
        where: { 
            projectId: project.id 
        },
        include: { view: true },
    });
    const views = links.map((link) => link.view);
    return redirect(`/p/${project.id}/view/${views[0].id}`);
}