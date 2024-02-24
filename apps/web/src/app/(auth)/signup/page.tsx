import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { getButtonClasses } from "@workspace/ui";

import { StarsField } from "@/components/star-field";
import { cn } from "@/lib/utils";
import { GithubButton } from "../components/github-button";
import { SignupForm } from "../components/signup-form";

export default function Signup() {
    return (
        <div className="relative flex h-screen flex-col items-center justify-center bg-zinc-50 px-12 md:px-0 lg:grid lg:grid-cols-2">
            <Link
                href="/login"
                className={cn(
                    "absolute right-3 top-3 md:right-6 md:top-6",
                    getButtonClasses({ variant: "outline", size: "default" }),
                )}
            >
                Login
            </Link>
            <div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-[#171719]" />
                <StarsField />
            </div>
            <div className="-mt-32 flex justify-center lg:p-8">
                <div className="w-full md:w-3/4">
                    <div className="py-2">
                        <h1 className="flex gap-2 text-xl font-medium">
                            <Image src="/logo.svg" width="28" height="28" alt="" />
                            Create a free account
                        </h1>
                        <h2 className="pt-1 text-sm text-zinc-500">
                            Join us and create a workspace that works for you
                        </h2>
                    </div>
                    <SignupForm />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <p className="text-muted-foreground bg-zinc-50 px-2">
                                Or continue with
                            </p>
                        </div>
                    </div>
                    <div className="my-2 flex gap-2">
                        <Suspense>
                            <GithubButton />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
