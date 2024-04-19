import React from "react";
import { redirect } from "next/navigation";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { LockScroll } from "@/components/lock-scroll";

import { LayoutButtons } from "./layout-buttons";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default async function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/login");
  }
  const memberships = await db.workspaceMember.findMany({
    where: { userId: session.user.id },
  });
  return (
    <div className="flex h-screen flex-col items-center bg-muted/40">
      <LayoutButtons hasWorkspace={memberships.length > 0} user={session.user} />
      {children}
      <LockScroll />
    </div>
  );
}
