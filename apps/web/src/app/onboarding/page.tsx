import React from "react";

import { Separator } from "@workspace/ui";

import { Shell } from "@/components/shell";
import { NewWorkspaceForm } from "./new-workspace-form";

export default async function OnboardingPage() {
  return (
    <div className="flex flex-col items-center space-y-4 w-full md:w-1/3">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-center text-3xl font-inter font-semibold tracking-tight">
          Create a workspace that works for you
        </h1>
        <p className="text-md [&:not(:first-child)]:mt-6 leading-5">
          A workspace is a shared environment where you can manage your projects and leverage AI to
          get more done
        </p>
      </div>
      <Separator />
      <NewWorkspaceForm />
    </div>
  );
}
