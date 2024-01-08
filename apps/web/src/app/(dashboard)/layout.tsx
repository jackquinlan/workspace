import React from "react";
import { cookies }  from "next/headers";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/auth";

import { api } from "@/trpc/server";
import { cn } from "@/lib/utils";
import { LockScroll } from "@/components/lock-scroll";
import { VerifyEmailBanner } from "@/components/verify-email-banner";
import { ResizeableContent } from "@/components/layout/resizeable-content";
import { SidebarProvider } from "./_providers";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    if (!session.user.workspace) {
        return redirect("/welcome");
    }
    const workspaces = (await api.workspace.getWorkspaces.query()).map(
        (workspace) => workspace.workspace,
    );
    const views = await api.view.getViewsByActiveWorkspace.query();

    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

    return (
        <div className="flex min-h-screen flex-col">
            {!session.user.emailVerified && <VerifyEmailBanner email={session.user.email} />}
            <div
                className={cn(
                    "flex",
                    !session.user.emailVerified ? "h-[calc(100vh-40px)]" : "h-screen",
                )}
            >
                <SidebarProvider>
                    <ResizeableContent user={session.user} workspaces={workspaces} views={views} defaultLayout={defaultLayout}>
                        {children}
                    </ResizeableContent>
                </SidebarProvider>
            </div>
            <LockScroll />
        </div>
    );
}
