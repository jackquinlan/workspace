import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { ResizeLayoutWrapper } from "@/components/layout/resize-layout";
import { LockScroll } from "@/components/lock-scroll";
import { SidebarProvider } from "@/hooks/use-sidebar";
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
        <div className="flex h-screen">
            <SidebarProvider>
                <ResizeLayoutWrapper defaultLayout={defaultLayout} user={session.user}>
                    <NextAuthProvider session={session}>{children}</NextAuthProvider>
                </ResizeLayoutWrapper>
            </SidebarProvider>
            <LockScroll />
        </div>
    );
}
