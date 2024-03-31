import React from "react";

import { db } from "@workspace/db";

export default async function ProjectPage({ params }: { params: { id: string } }) {
    const project = await db.project.findUnique({
        where: { id: params.id },
    });
    return (
        <div>{project?.name}</div>
    );
}