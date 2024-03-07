import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { NextAuthProvider } from "@/app/_providers/session-provider";
import { ResizeLayoutWrapper } from "@/components/layout/resize-layout";
import { LockScroll } from "@/components/lock-scroll";
import { SidebarProvider } from "@/hooks/use-sidebar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    if (!session.user.activeWorkspace) {
        const workspaces = await db.workspaceMember.findMany({
            where: { userId: session.user.id },
        });
        if (workspaces.length === 0) {
            return redirect("/onboarding");
        }
        // update the active to the next available workspace
        await db.user.update({
            where: { id: session.user.id },
            data:  { activeWorkspace: workspaces[0].id },
        }); 
    }
    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <ResizeLayoutWrapper defaultLayout={defaultLayout} user={session.user}>
                    <NextAuthProvider session={session}>
                        {children}
                    </NextAuthProvider>
                </ResizeLayoutWrapper>
            </SidebarProvider>
            <LockScroll />
        </div>
    );
}
