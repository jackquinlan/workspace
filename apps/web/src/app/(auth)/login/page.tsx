import React, { Suspense } from "react";
import Link from "next/link";

import { GithubButton } from "../components/github-button";
import { LoginForm } from "../components/login-form";

export default function Login() {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-zinc-50">
      <div className="mt-[8%] w-full md:w-1/2 xl:w-1/3">
        <div className="py-2">
          <h1 className="text-xl font-medium">Welcome back</h1>
          <h2 className="text-muted-foreground text-sm leading-4">
            Enter your email and password to continue
          </h2>
          <hr className="mt-2" />
        </div>
        <LoginForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <p className="text-muted-foreground bg-zinc-50 px-2">Or continue with</p>
          </div>
        </div>
        <div className="my-2">
          <Suspense>
            <GithubButton />
          </Suspense>
        </div>
      </div>
      <Link href="/signup" className="mt-4 hover:underline hover:underline-offset-4">
        Don&apos;t have one? Create an account
      </Link>
    </div>
  );
}
