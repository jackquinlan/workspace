import React from "react";
import Link from "next/link";

import { buttonVariants } from "@workspace/ui";

import { cn } from "@/lib/utils";
import { ForgotPasswordForm } from "../components/forgot-password-form";

export default function ForgotPassword() {
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
          <h1 className="text-xl font-medium">Forgot password</h1>
          <h2 className="text-sm leading-4 text-zinc-500">
            Enter your email below to reset your password
          </h2>
          <hr className="mt-2" />
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
