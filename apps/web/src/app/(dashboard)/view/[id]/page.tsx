import * as React from "react";
import { redirect } from "next/navigation";

import { api } from "@/trpc/server";
import { ViewList } from "@/components/views/view-list";

export default async function ViewPage({ params }: { params: { id: string } }) {
    const view = await api.view.getViewInfo.query({ id: params.id });
    if (!view) {
        return redirect("/inbox");
    }
    return (
        <div className="flex flex-col space-y-2">
            <h1 className="flex items-center gap-2 text-2xl font-semibold">
                <div className="border-border h-5 w-5 rounded-md border bg-red-400" />
                {view.name}
            </h1>
            <ViewList groups={view.groups} view={view} />
        </div>
    );
}
