import { notFound, redirect } from "next/navigation";

import { db } from "@workspace/db";

export default async function ProjectPage({ params }: { params: { projectId: string } }) {
    const project = await db.project.findUnique({
        where: { id: params.projectId },
    });
    if (!project) {
        return notFound();
    }
    const links = await db.link.findMany({
        where: {
            projectId: project.id,
        },
        include: { view: true },
    });
    const views = links.map((link) => link.view);
    return redirect(`/p/${project.id}/view/${views[0].id}`);
}
