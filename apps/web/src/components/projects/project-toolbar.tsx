import React from "react";

import { UserPlus, Star } from "lucide-react";

import type { Project } from "@workspace/db/client";

import { ProjectSettingsDropdown } from "./project-settings-dropdown";

interface Props {
    project: Project;
}

export function ProjectToolbar({ project }: Props) {
    return (
        <div className="flex h-12 items-center justify-end">
            <div className="flex items-center gap-1">
                <div className="hover:bg-accent flex items-center gap-1 rounded-md px-2 py-1 text-sm">
                    <UserPlus className="h-5 w-5 stroke-[1.5px]" />
                    Share
                </div>
                <Star className="hover:bg-accent h-7 w-7 rounded-md stroke-[1.5px] p-1" />
                <ProjectSettingsDropdown project={project} />
            </div>
        </div>
    );
}

