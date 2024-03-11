import React from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { LockScroll } from "@/components/lock-scroll";
import { BackButton } from "./back-button";

interface OnboardingLayoutProps {
    children: React.ReactNode;
}

export default async function OnboardingLayout({ children }: OnboardingLayoutProps) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    return (
        <div className="flex h-screen w-full flex-col items-center bg-zinc-50">
            {session.user.activeWorkspace && (<BackButton />)} 
            {children}
            <LockScroll />
        </div>
    );
}
