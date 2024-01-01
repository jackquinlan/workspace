import { ViewToolbar } from "@/components/views/view-toolbar";
import React from "react";

interface ViewLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: ViewLayoutProps) {
    return (
        <div className="flex flex-col">
            <ViewToolbar />
            <div className="container pt-1">{children}</div>
        </div>
    );
}