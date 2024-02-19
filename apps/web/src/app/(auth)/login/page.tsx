import React, { Suspense } from "react";

import Link from "next/link";

import { Shell } from "@/components/shell";

import { GithubButton } from "../components/github-button";
import { LoginForm } from "../components/login-form";

export default function Login() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-zinc-50">
            <Shell className="-mt-24 w-full p-4 px-6 pb-4 md:w-1/2 xl:w-1/3">
                <div className="py-2">
                    <h1 className="text-xl font-medium">👋 Welcome back</h1>
                    <h2 className="text-muted-foreground text-sm">
                        Enter your email and password to continue
                    </h2>
                </div>
                <LoginForm />
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <p className="bg-background text-muted-foreground px-2">Or continue with</p>
                    </div>
                </div>
                <div className="my-2">
                    <Suspense>
                        <GithubButton />
                    </Suspense>
                </div>
            </Shell>
            <Link href="/signup" className="hover:underline hover:underline-offset-4">
                Don&apos;t have an account? Create one now
            </Link>
        </div>
    );
}
