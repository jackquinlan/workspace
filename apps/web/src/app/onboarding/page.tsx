import React from "react";

import { Separator } from "@workspace/ui";

import { NewWorkspaceForm } from "./new-workspace-form";

export default async function OnboardingPage() {
  return (
    <div className="flex w-full flex-col items-center space-y-4 md:w-1/3">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="font-inter text-center text-3xl font-semibold tracking-tight">
          Create a workspace that works for you
        </h1>
        <p className="text-md leading-5 [&:not(:first-child)]:mt-6">
          A workspace is a shared environment where you can manage your projects and leverage AI to
          get more done
        </p>
      </div>
      <Separator />
      <NewWorkspaceForm />
    </div>
  );
}
