"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ArrowLeft, Bell, Calendar, Inbox, User, Users, Zap } from "lucide-react";
import type { User as UserType } from "next-auth";

import type { Workspace } from "@workspace/db/client";
import { Button, Separator } from "@workspace/ui";

import { cn } from "@/lib/utils";
import { UserButton } from "./user-button";
import { WorkspaceSelector } from "./workspace-selector";

export type SidebarItemType = {
  text: string;
  href: string;
  icon?: React.ReactNode;
};

const defaultItems: SidebarGroupProps[] = [
  {
    items: [
      {
        text: "Inbox",
        icon: <Inbox className="h-4 w-4" />,
        href: "/inbox",
      },
      {
        text: "Notifications",
        icon: <Bell className="h-4 w-4" />,
        href: "/notifications",
      },
      {
        text: "Calendar",
        icon: <Calendar className="h-4 w-4" />,
        href: "/calendar",
      },
      {
        text: "Automations",
        icon: <Zap className="h-4 w-4" />,
        href: "/automations",
      },
    ],
  },
];
const settingItems: SidebarGroupProps[] = [
  {
    title: "Profile",
    titleIcon: <User className="h-4 w-4" />,
    items: [
      {
        text: "General",
        href: "/settings/profile",
      },
    ],
  },
  {
    title: "Workspace",
    titleIcon: <Users className="h-4 w-4" />,
    items: [
      {
        text: "General",
        href: "/settings/workspace/general",
      },
      {
        text: "Billing",
        href: "/settings/workspace/billing",
      },
      {
        text: "Members",
        href: "/settings/workspace/members",
      },
    ],
  },
];

interface SidebarProps {
  active: Workspace;
  user: UserType;
  workspaces: Workspace[];
}

export function Sidebar({ active, user, workspaces }: SidebarProps) {
  const router = useRouter();
  const path = usePathname();
  const itemsToDisplay = path.startsWith("/settings") ? settingItems : defaultItems;
  return (
    <aside className="bg-sidebar flex h-screen w-[275px] flex-col border-r">
      {path.startsWith("/settings") ? (
        <div className="p-2">
          <Button
            className="flex w-full items-center justify-start gap-2"
            onClick={() => router.push("/inbox")}
            size="sm"
            variant="ghost"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-2">
          <WorkspaceSelector workspaces={workspaces} active={active} />
          <UserButton user={user} />
        </div>
      )}
      <Separator />
      <div className="flex flex-col space-y-6 p-2">
        {itemsToDisplay.map((group, i) => (
          <SidebarGroup key={i} {...group} />
        ))}
      </div>
    </aside>
  );
}

interface SidebarGroupProps {
  title?: string;
  titleIcon?: React.ReactNode;
  items?: SidebarItemType[];
}

export function SidebarGroup({ title, titleIcon, items }: SidebarGroupProps) {
  return (
    <div className="flex flex-col gap-1">
      {title && (
        <h1 className="items-cneter flex gap-1 text-sm font-medium px-2 py-1">
          {titleIcon && titleIcon}
          {title}
        </h1>
      )}
      <div className="flex flex-col gap-1 px-2">
        {items?.map((item, i) => (
          <SidebarItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  item: SidebarItemType;
}

export function SidebarItem({ item, ...props }: SidebarItemProps) {
  const path = usePathname();
  const isActive = path.startsWith(item.href);
  return (
    <Link
      className={cn(
        "hover:bg-accent flex items-center gap-2 rounded-md px-1 py-[3px] text-sm",
        isActive && "bg-accent font-medium",
      )}
      href={item.href}
      {...props}
    >
      {item.icon && item.icon}
      {item.text}
    </Link>
  );
}
