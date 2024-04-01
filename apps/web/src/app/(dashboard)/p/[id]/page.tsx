import React from "react";

import { db } from "@workspace/db";

import { NoViewFound } from "./no-view-found";
import { ThemeSquare } from "@/components/theme-square";

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const project = await db.project.findUnique({
        where: { id: params.id },
    });
    if (!project) {
        return <NoViewFound />;
    }
    return (
        <div>
            <h1 className="flex items-center gap-2 text-3xl font-semibold">
                <ThemeSquare className="h-6 w-6" color={project.color} />
                {project.name}
            </h1>
        </div>
    );
}