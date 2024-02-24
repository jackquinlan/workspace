"use client";

import React from "react";

import { PanelLeft } from "lucide-react";

import { useSidebarContext } from "./use-sidebar-context";

export function SidebarToggleButton() {
    const { toggleOpen } = useSidebarContext();
    return (
        <div
            className="relative left-2.5 top-2.5 h-fit w-fit cursor-pointer rounded-md p-1 hover:bg-accent"
            onClick={() => toggleOpen()}
        >
            <PanelLeft className="h-5 w-5 stroke-1" />
        </div>
    );
}
