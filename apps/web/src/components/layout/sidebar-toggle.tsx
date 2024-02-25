"use client";

import React from "react";

import { PanelLeft } from "lucide-react";

import { useSidebar } from "@/hooks/use-sidebar";

export function SidebarToggleButton() {
    const { toggleOpen } = useSidebar();
    return (
        <div
            className="hover:bg-accent relative left-2.5 top-2.5 h-fit w-fit cursor-pointer rounded-md p-1"
            onClick={() => toggleOpen()}
        >
            <PanelLeft className="h-5 w-5 stroke-1" />
        </div>
    );
}
