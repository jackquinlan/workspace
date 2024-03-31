"use client";

import React, { Fragment, useState } from "react";

import { MoreHorizontal } from "lucide-react";

import type { Project } from "@workspace/db/client";
import { SidebarItem } from "./layout/sidebar-item";

interface Props {
    projects: Project[];
}

export function ProjectsList({ projects }: Props) {
    const [hoverId, setHoverId] = useState<string | null>(null);
    return (
        <Fragment>
            {projects.map((project) => (
                <SidebarItem 
                    key={project.id} 
                    href={`/p/${project.id}`}
                    onMouseOver={() => setHoverId(project.id)}
                    onMouseLeave={() => setHoverId(null)}
                    className="flex items-center justify-between w-full"
                >
                    <div className="flex items-center gap-2">
                        <div className="border-border h-2.5 w-2.5 rounded-sm border" style={{ backgroundColor: project.color }} />
                        {project.name}
                    </div>
                    {hoverId === project.id && (
                        <MoreHorizontal className="w-5 h-5 rounded-md hover:bg-accent" />
                    )}
                </SidebarItem>
            ))}
        </Fragment>
    );
}