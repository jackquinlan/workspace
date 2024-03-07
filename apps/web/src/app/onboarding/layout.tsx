import React from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { LockScroll } from "@/components/lock-scroll";

interface OnboardingLayoutProps {
    children: React.ReactNode;
}

export default async function OnboardingLayout({ children }: OnboardingLayoutProps) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    return (
        <div className="flex flex-col items-center space-y-4 w-full mt-24">
            <h1 className="text-xl font-semibold">Create your workspace</h1>
            {children}
            <LockScroll />
        </div>
    );
}