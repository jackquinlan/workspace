import React from "react";

import { Bell, Calendar, Inbox, Search, Zap } from "lucide-react";
import type { User } from "next-auth";

import type { Project, Workspace } from "@workspace/db/client";
import { Separator } from "@workspace/ui";

import { CreateProjectModal } from "../projects/create-project-modal";
import { ProjectList } from "../projects/project-list";
import { SidebarItem } from "./sidebar-item";
import { UserButton } from "./user-button";
import { WorkspaceSelector } from "./workspace-selector";

interface SidebarProps {
  activeWorkspace: Workspace;
  user: User;
  workspaces: Workspace[];
  projects: Project[];
}

export function Sidebar({ activeWorkspace, user, workspaces, projects }: SidebarProps) {
  return (
    <aside className="bg-sidebar flex h-full flex-col">
      <div className="flex items-center justify-between p-2">
        <WorkspaceSelector workspaces={workspaces} activeWorkspace={activeWorkspace} />
        <UserButton user={user} />
      </div>
      <Separator />
      <div className="flex flex-col space-y-1 p-2">
        <div className="border-border hover:bg-accent mb-2 flex items-center justify-between rounded-md border bg-white p-1 text-sm shadow-sm">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </div>
          <p className="border-border bg-muted rounded-md border p-1 text-xs">⌘+K</p>
        </div>
        <SidebarItem href="/inbox">
          <Inbox className="h-4 w-4" />
          Inbox
        </SidebarItem>
        <SidebarItem href="/notifications">
          <Bell className="h-4 w-4" />
          Notifications
        </SidebarItem>
        <SidebarItem href="/calendar">
          <Calendar className="h-4 w-4" />
          Calendar
        </SidebarItem>
        <SidebarItem href="/automations">
          <Zap className="h-4 w-4" />
          Automations
        </SidebarItem>
      </div>
      <div className="flex flex-col space-y-1 px-3 py-1">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-sm">Projects</h1>
          <CreateProjectModal workspace={activeWorkspace} />
        </div>
        <ProjectList projects={projects} />
      </div>
    </aside>
  );
}
