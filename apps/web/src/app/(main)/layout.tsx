import React from "react";
import { cookies }  from "next/headers";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { ResizeLayoutWrapper } from "@/components/layout/resize-layout-wrapper";
import { SidebarProvider } from "@/components/layout/use-sidebar-context";
import { NextAuthProvider } from "../_providers/session-provider";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex h-screen">
                <SidebarProvider>
                    <ResizeLayoutWrapper defaultLayout={defaultLayout}>
                        <NextAuthProvider session={session}>{children}</NextAuthProvider>
                    </ResizeLayoutWrapper>
                </SidebarProvider>
            </div>
        </div>
    );
}
