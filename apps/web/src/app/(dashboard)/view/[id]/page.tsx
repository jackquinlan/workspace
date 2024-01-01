import * as React from "react";
import { redirect } from "next/navigation";

import { db } from "@workspace/db";

export default async function View({ params }: { params: { id: string } }) {
    const view = await db.view.findUnique({
        where: {
            id: params.id,
        },
    });
    if (!view) {
        return redirect("/inbox");
    }
    return (
        <div className="flex flex-col">
            <h1 className="flex items-center gap-2 text-2xl font-semibold">
                <div className="border-border h-5 w-5 rounded-md border bg-red-400" />
                {view.name}
            </h1>
        </div>
    );
}
