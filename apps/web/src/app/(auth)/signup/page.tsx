import * as React from "react";
import Link from "next/link";

import { Anchor } from "lucide-react";

import { getButtonClasses } from "@workspace/ui";

import { GithubButton } from "@/app/(auth)/components/github-button";
import { SignupForm } from "@/app/(auth)/components/signup-form";
import { Shell } from "@/components/shell";
import { StarsField } from "@/components/star-field";
import { cn } from "@/lib/utils";

export default function Signup() {
    return (
        <div className="container relative hidden h-screen flex-col items-center bg-zinc-50 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href="/login"
                className={cn(
                    "absolute right-3 top-3 md:right-6 md:top-6",
                    getButtonClasses({ variant: "ghost" }),
                )}
            >
                Login
            </Link>
            <div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-[#171719]" />
                <StarsField />
                <div className="relative z-20 flex items-center text-xl font-medium">
                    <Anchor className="mr-1 h-6 w-6 text-white" />
                    Workspace
                </div>
            </div>
            <div className="-mt-32 flex justify-center lg:p-8">
                <Shell className="w-full p-4 px-6 pb-4 md:w-3/4">
                    <div className="py-2">
                        <h1 className="text-xl font-medium">Create a free account</h1>
                        <h2 className="text-sm text-zinc-500">
                            Create a new account by entering your email and password
                        </h2>
                    </div>
                    <SignupForm />
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
            </div>
        </div>
    );
}
