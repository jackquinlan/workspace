import React from "react";

import { redirect } from "next/navigation";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { NextAuthProvider } from "../_providers/session-provider";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    return <NextAuthProvider session={session}>{children}</NextAuthProvider>;
}
