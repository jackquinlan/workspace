import React from "react";

import { db } from "@workspace/db";

import { NoViewFound } from "./no-view-found";

export default async function View({ params }: { params: { id: string } }) {
    const view = await db.view.findFirst({
        where: {
            id: params.id,
        },
    }); 
    if (!view) {
        return <NoViewFound />;
    }
    return <div className="container">{view.name}</div>;
}