import React from "react";

import { NewWorkspaceForm } from "./new-workspace-form";

export default async function OnboardingPage() {
    return (
        <div className="flex flex-col items-center space-y-4 w-full mt-32">
            <div className="flex flex-col space-y-0">
                <h1 className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
                    Create a workspace that works for you.
                </h1>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    A workspace is a shared environment where you can manage your projects 
                    and use AI to get more done
                </p>
            </div>
            <NewWorkspaceForm />
        </div>
    );
}
