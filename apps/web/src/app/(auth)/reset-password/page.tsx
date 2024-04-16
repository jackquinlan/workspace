import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@workspace/db";
import { Alert, buttonVariants } from "@workspace/ui";

import { cn } from "@/lib/utils";
import { ResetPasswordForm } from "../components/reset-password-form";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // if token not in query params, redirect to home page
  if (searchParams.token === undefined || !(typeof searchParams.token === "string")) {
    return redirect("/");
  }
  const token = await db.resetPasswordToken.findFirst({
    where: { id: searchParams.token as string },
  });
  // token must be valid
  if (!token) {
    return redirect("/");
  }
  return (
    <div className="relative flex h-screen w-full flex-col items-center space-y-4 bg-zinc-50">
      <Link
        href="/login"
        className={cn(
          "absolute left-3 top-3 md:left-6 md:top-6",
          buttonVariants({ variant: "outline", size: "default" }),
        )}
      >
        Login
      </Link>
      <div className="w-full pt-[8%] md:w-1/2 xl:w-1/3">
        <div className="py-2">
          <h1 className="text-xl font-medium">Reset Password</h1>
          <h2 className="text-sm leading-4 text-zinc-500">Enter a new password for your account</h2>
          <hr className="mt-2" />
        </div>
        {token.expiresAt < new Date() || token.used ? (
          <Alert variant="danger" className="my-4">
            This token has expired.
            <br />
            Please request another one to reset your password.
          </Alert>
        ) : (
          <ResetPasswordForm token={token.id} />
        )}
      </div>
    </div>
  );
}
