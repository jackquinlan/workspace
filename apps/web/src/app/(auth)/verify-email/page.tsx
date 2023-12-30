import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Anchor } from "lucide-react";

import { getServerAuthSession } from "@workspace/auth";
import { db } from "@workspace/db";
import { verifyEmail } from "@workspace/lib/auth/verify-email";
import { Alert, getButtonClasses } from "@workspace/ui";

import { Shell } from "@/components/shell";
import { cn } from "@/lib/utils";

export default async function VerifyEmail({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    // if token not in query params, redirect to home page
    if (searchParams.token === undefined || !(typeof searchParams.token === "string")) {
        return redirect("/");
    }
    const token = await db.verificationToken.findFirst({
        where: { id: searchParams.token as string },
    });
    // token must be valid
    if (!token) {
        return redirect("/");
    }
    const verified = await verifyEmail(token.id);

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
                <Shell className="-mt-32 w-full space-y-4 p-4 px-6 pb-4 md:w-1/2 xl:w-1/3">
                    <div className="py-2">
                        <h1 className="text-xl font-medium">Verify your account</h1>
                    </div>
                    {verified ? (
                        <Alert variant="success">
                            Your account has been verified successfully!
                        </Alert>
                    ) : (
                        <Alert variant="danger">
                            {token.expires > new Date()
                                ? "Your verification has expired or is invalid. Please request a new verification token."
                                : "There was a problem verifying your account."}
                        </Alert>
                    )}
                    <div className="w-full">
                        <Link
                            href="/inbox"
                            className={cn(
                                "w-full",
                                getButtonClasses({ size: "sm", variant: "outline" }),
                            )}
                        >
                            Back to your inbox
                        </Link>
                    </div>
                </Shell>
            </div>
        </React.Fragment>
    );
}
