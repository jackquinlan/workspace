import React from "react";
import { notFound } from "next/navigation";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";
import { db } from "@workspace/db";

import { ProjectToolbar } from "@/components/projects/project-toolbar";

interface ProjectLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
    const session = await getServerAuthSession();
    const project = await db.project.findFirst({ where: { id: params.id } });
    if (!project || !session) {
        return notFound();
    }
    return (
        <div className="flex flex-col space-y-4">
            <ProjectToolbar project={project} />
            {children}
        </div>
    );
}