import React from "react";
import Link from "next/link";

import type { User } from "next-auth";
import { Inbox, PlusSquare } from "lucide-react";

import { Separator } from "@workspace/ui";

import { SettingsMenu } from "@/components/layout/settings-menu";

interface Props {
    user: User;
}

export function Sidebar({ user }: Props) {
    return (
        <aside className="border-r-border hidden w-[300px] border-r bg-sidebar md:block">
            <div className="flex justify-end p-2">
                <SettingsMenu user={user} />
            </div>
            <Separator />
            <div className="flex flex-col space-y-1 p-2">
                <SidebarItem link="/inbox">
                    <Inbox className="w-4 h-4" />
                    Inbox
                </SidebarItem>
                <SidebarItem link="/inbox">
                    <PlusSquare className="w-4 h-4" />
                    Create project
                </SidebarItem>
            </div>
        </aside>
    );
}

interface ItemProps {
    children: React.ReactNode;
    link: string;
    action?: () => void;
}

export function SidebarItem({ children, link }: ItemProps) {
    return (
        <Link 
            href={link}
            className="flex items-center gap-2 text-sm px-1 py-[2px] hover:bg-muted"
        >
            {children}
        </Link>
    );
}