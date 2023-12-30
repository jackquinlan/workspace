import * as React from "react";
import Link from "next/link";

import { Anchor } from "lucide-react";

import { GithubButton } from "@/app/(auth)/components/github-button";
import { LoginForm } from "@/app/(auth)/components/login-form";
import { Shell } from "@/components/shell";

export default function Login() {
    return (
        <React.Fragment>
            <Link
                href="/"
                className="absolute left-3 top-3 flex items-center text-xl font-medium md:left-6 md:top-6"
            >
                <Anchor className="mr-1 h-6 w-6" />
                Workspace
            </Link>
            <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-zinc-100">
                <Shell className="-mt-24 w-full p-4 px-6 pb-4 md:w-1/2 xl:w-1/3">
                    <div className="py-2">
                        <h1 className="text-xl font-medium">Welcome back</h1>
                        <h2 className="text-sm text-zinc-500">
                            Enter your email and password to continue to Workspace
                        </h2>
                    </div>
                    <LoginForm />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <p className="bg-background text-muted-foreground px-2">
                                Or continue with
                            </p>
                        </div>
                    </div>
                    <div className="my-2">
                        <GithubButton />
                    </div>
                </Shell>
                <Link href="/signup" className="hover:underline hover:underline-offset-4">
                    Don&apos;t have an account? Create one now
                </Link>
            </div>
        </React.Fragment>
    );
}
