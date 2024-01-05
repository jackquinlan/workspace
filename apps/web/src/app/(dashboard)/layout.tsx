import React from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/auth";

import { api } from "@/trpc/server";
import { cn } from "@/lib/utils";
import { LockScroll } from "@/components/lock-scroll";
import { Sidebar } from "@/components/layout/sidebar";
import { VerifyEmailBanner } from "@/components/verify-email-banner";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    const workspaces = (await api.workspace.getWorkspaces.query()).map((workspace) => (workspace.workspace));
    return (
        <div className="flex min-h-screen flex-col">
            {!session.user.emailVerified && <VerifyEmailBanner email={session.user.email} />}
            <div
                className={cn(
                    "flex",
                    !session.user.emailVerified ? "h-[calc(100vh-40px)]" : "h-screen",
                )}
            >
                <Sidebar user={session.user} workspaces={workspaces} />
                <main className="grow">{children}</main>
            </div>
            <LockScroll />
        </div>
    );
}
