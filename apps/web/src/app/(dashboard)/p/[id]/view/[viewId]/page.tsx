import React from "react";
import { notFound } from "next/navigation";

import { db } from "@workspace/db";

export default async function ViewPage({ params }: { params: { viewId: string } }) {
    const view = await db.view.findUnique({
        where: { id: params.viewId },
    });
    if (!view) {
        return notFound();
    }
    return <div className="space-y-1 text-lg">{view.name}</div>;
}
