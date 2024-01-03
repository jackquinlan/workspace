import React from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/auth";

import { LockBodyScroll } from "@/components/lock-body-scroll";
import { Sidebar } from "@/components/layout/sidebar";
import { VerifyEmailBanner } from "@/components/verify-email-banner";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    return (
        <div className="flex min-h-screen flex-col">
            {!session.user.emailVerified && <VerifyEmailBanner email={session.user.email} />}
            <div
                className={cn(
                    "flex",
                    !session.user.emailVerified ? "h-[calc(100vh-40px)]" : "h-screen",
                )}
            >
                <Sidebar user={session.user} />
                <main className="grow">{children}</main>
            </div>
            <LockBodyScroll />
        </div>
    );
}
