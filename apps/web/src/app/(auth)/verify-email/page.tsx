import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Anchor, Mail } from "lucide-react";

import { getServerAuthSession } from "@workspace/auth";
import { verifyEmail } from "@workspace/lib/auth/verify-email";
import { Alert} from "@workspace/ui";

import { Shell } from "@/components/shell";

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
    const verified = await verifyEmail(searchParams.token);

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
                    <div className="pt-2">
                        <h1 className="flex items-center text-xl font-medium">
                            <Mail className="w-5 h-5 mr-1" />
                            Verify your email
                        </h1>
                    </div>
                    <div className="pb-2">
                        {verified ? (
                            <Alert variant="success">
                                Your account has been verified successfully!
                            </Alert>
                        ) : (
                            <Alert variant="danger">
                                Your verification has expired or is invalid. Please request a new verification token.
                            </Alert>
                        )}
                    </div>
                </Shell>
                <div className="w-full text-center">
                    <Link
                        href="/inbox"
                        className="hover:underline hover:underline-offset-4"
                    >
                        Go back to your inbox
                    </Link>
                </div>
            </div>
        </React.Fragment>
    );
}
