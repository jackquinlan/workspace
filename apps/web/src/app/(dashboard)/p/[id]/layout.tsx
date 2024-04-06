import React from "react";
import { notFound } from "next/navigation";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";
import { db } from "@workspace/db";

import { ProjectToolbar } from "@/components/projects/project-toolbar";
import { ThemeSquare } from "@/components/theme-square";
import { ViewListContainer } from "@/components/projects/view-list-container";

interface ProjectLayoutProps {
    children: React.ReactNode;
    params: { id: string };
}

export default async function ProjectLayout({ children, params }: ProjectLayoutProps) {
    const session = await getServerAuthSession();
    if (!session) {
        return notFound();
    }
    const project = await db.project.findFirst({ where: { id: params.id } });
    if (!project) {
        return notFound();
    }
    const links = await db.link.findMany({
        where: { 
            projectId: project.id 
        },
        include: { view: true },
    });
    const views = links.map((link) => link.view);
    return (
        <div className="flex flex-col space-y-2">
            <ProjectToolbar project={project} />
            <div className="space-y-1">
                <h1 className="flex items-center gap-2 text-3xl font-semibold">
                    <ThemeSquare className="h-6 w-6" color={project.color} />
                    {project.name}
                </h1>
                <ViewListContainer project={project} views={views} />
            </div>
            {children}
        </div>
    );
}