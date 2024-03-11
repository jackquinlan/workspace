import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Mail } from "lucide-react";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";
import { verifyEmail } from "@workspace/lib/next-auth/verify-email";
import { Alert, buttonVariants } from "@workspace/ui";

import { cn } from "@/lib/utils";
import { ResendVerificationButton } from "../components/resend-verification-button";

export default async function VerifyEmail({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    if (session.user.emailVerified) {
        return redirect("/inbox");
    }
    // if token not in query params, redirect to home page
    if (searchParams.token === undefined || !(typeof searchParams.token === "string")) {
        return redirect("/");
    }
    const verified = await verifyEmail(searchParams.token);

    return (
        <div className="relative flex h-screen w-full flex-col items-center space-y-4 bg-zinc-50">
            <Link
                href="/inbox"
                className={cn(
                    "absolute left-3 top-3 md:left-6 md:top-6",
                    buttonVariants({ variant: "outline", size: "default" }),
                )}
            >
                Inbox
            </Link>
            <div className="w-full pt-[8%] md:w-1/2 xl:w-1/3">
                <div className="py-2">
                    <h1 className="flex items-center gap-2 text-xl font-medium">
                        <Mail className="h-5 w-5" />
                        Verify your email
                    </h1>
                    <hr className="my-2" />
                </div>
                <div className="pb-2">
                    {verified ? (
                        <Alert variant="success">
                            Your account has been verified successfully!
                        </Alert>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Alert variant="danger">
                                Your verification has expired or is invalid. Please request a new
                                verification token.
                            </Alert>
                            <ResendVerificationButton email={session.user.email} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
