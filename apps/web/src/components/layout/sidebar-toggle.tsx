"use client";

import React from "react";

import { PanelLeft } from "lucide-react";

import { useSidebarContext } from "@/app/(dashboard)/_providers";

export function SidebarToggleButton() {
    const { toggleOpen } = useSidebarContext();
    return (
        <div 
            className="relative top-2.5 left-2 p-1 h-fit rounded-md cursor-pointer hover:bg-accent"
            onClick={() => toggleOpen()}
        >
            <PanelLeft className="h-5 w-5" />
        </div>
    );
}