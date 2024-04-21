import React from "react";
import { redirect } from "next/navigation";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { NextAuthProvider } from "@/app/_providers/session-provider";
import { Sidebar } from "@/components/layout/sidebar";
import { LockScroll } from "@/components/lock-scroll";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/login");
  }
  if (!session.user.activeWorkspace) {
    return redirect("/onboarding");
  }
  const memberships = await db.workspaceMember.findMany({
    where: {
      userId: session.user.id,
    },
    include: { workspace: true },
  });
  const workspaces = memberships.map((m) => m.workspace);
  const active = workspaces.find((w) => w.id === session.user.activeWorkspace);
  return (
    <NextAuthProvider session={session}>
      <div className="flex min-h-screen">
        <Sidebar user={session.user} workspaces={workspaces} active={active!} />
        <main className="grow">{children}</main>
      </div>
      <LockScroll />
    </NextAuthProvider>
  );
}
