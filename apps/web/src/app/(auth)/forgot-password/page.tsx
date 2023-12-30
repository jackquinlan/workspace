import * as React from "react";
import Link from "next/link";

import { Anchor } from "lucide-react";

import { ForgotPasswordForm } from "@/app/(auth)/components/forgot-password-form";
import { Shell } from "@/components/shell";

export default function ForgotPassword() {
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
                        <h1 className="text-xl font-medium">Forgot password</h1>
                        <h2 className="text-sm text-zinc-500">
                            Enter your email below to reset your password
                        </h2>
                    </div>
                    <ForgotPasswordForm />
                </Shell>
                <Link href="/login" className="hover:underline hover:underline-offset-4">
                    Remeber your password? Back to login
                </Link>
            </div>
        </React.Fragment>
    );
}
