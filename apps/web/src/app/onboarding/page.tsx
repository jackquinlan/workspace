import React from "react";

import { NewWorkspaceForm } from "./new-workspace-form";

export default async function OnboardingPage() {
    return (
        <div className="mt-32 flex w-full flex-col items-center space-y-4">
            <div className="flex flex-col space-y-0">
                <h1 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
                    Create a workspace that works for you.
                </h1>
                <p className="text-sm leading-7 [&:not(:first-child)]:mt-6">
                    A workspace is a shared environment where you can manage your projects and
                    leverage AI to get more done
                </p>
            </div>
            <NewWorkspaceForm />
        </div>
    );
}
