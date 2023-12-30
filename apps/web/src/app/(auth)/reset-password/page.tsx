import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Anchor } from "lucide-react";

import { db } from "@workspace/db";
import { Alert } from "@workspace/ui";

import { ResetPasswordForm } from "@/app/(auth)/components/reset-password-form";
import { Shell } from "@/components/shell";

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
        <React.Fragment>
            <Link
                href="/"
                className="absolute left-3 top-3 flex items-center text-xl font-medium md:left-6 md:top-6"
            >
                <Anchor className="mr-1 h-6 w-6" />
                Workspace
            </Link>
            <div className="flex h-screen w-full flex-col items-center justify-center space-y-4 bg-zinc-100">
                <Shell className="-mt-32 w-full p-4 px-6 pb-4 md:w-1/2 xl:w-1/3">
                    <div className="py-2">
                        <h1 className="text-xl font-medium">Reset Password</h1>
                        <h2 className="text-sm text-zinc-500">
                            Enter a new password for your account
                        </h2>
                    </div>
                    {token.expiresAt < new Date() || token.used ? (
                        <Alert variant="danger" className="my-4">
                            This token has expired, please request another one to reset your
                            password.
                        </Alert>
                    ) : (
                        <ResetPasswordForm token={token.id} />
                    )}
                </Shell>
                <Link href="/login" className="hover:underline hover:underline-offset-4">
                    Don&apos;t need to reset password? Back to login
                </Link>
            </div>
        </React.Fragment>
    );
}
