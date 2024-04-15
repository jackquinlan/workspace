"use client";

import React, { Fragment, useState } from "react";

import { MoreHorizontal } from "lucide-react";

import type { Project } from "@workspace/db/client";

import { SidebarItem } from "../layout/sidebar-item";

interface Props {
  projects: Project[];
}

export function ProjectList({ projects }: Props) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  return (
    <Fragment>
      {projects.map((project) => (
        <SidebarItem
          key={project.id}
          href={`/p/${project.id}`}
          onMouseOver={() => setHoverId(project.id)}
          onMouseLeave={() => setHoverId(null)}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div
              className="border-border h-2.5 w-2.5 rounded-sm border"
              style={{ backgroundColor: project.color }}
            />
            {project.name}
          </div>
          {hoverId === project.id && (
            <MoreHorizontal className="hover:bg-accent h-5 w-5 rounded-md stroke-[1.5px] p-0.5" />
          )}
        </SidebarItem>
      ))}
    </Fragment>
  );
}
