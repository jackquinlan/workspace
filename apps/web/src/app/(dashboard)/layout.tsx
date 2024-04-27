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
  const workspaces = await db.workspace.findMany({
    where: {
      members: {
        some: { userId: session.user.id },
      },
    },
  });
  const projects = await db.project.findMany({
    where: {
      workspaceId: session.user.activeWorkspace,
    },
  });
  return (
    <NextAuthProvider session={session}>
      <div className="flex min-h-screen">
        <Sidebar user={session.user} workspaces={workspaces} projects={projects} />
        <main className="px-6 grow">{children}</main>
      </div>
      <LockScroll />
    </NextAuthProvider>
  );
}
