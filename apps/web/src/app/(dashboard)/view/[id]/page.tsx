import * as React from "react";
import { redirect } from "next/navigation";

import { db } from "@workspace/db";

export default async function ViewPage({ params }: { params: { id: string } }) {
    const view = await db.view.findFirst({
        where: {
            id: params.id,
        },
    });
    if (!view) {
        return redirect("/inbox");
    }
    return (
        <div className="flex flex-col space-y-2">{view.name}</div>
    );
}