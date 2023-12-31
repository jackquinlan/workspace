import * as React from "react";

import { Bird } from "lucide-react";

import { db } from "@workspace/db";

export default async function View({ params }: { params: { id: string } }) {
    const view = await db.view.findUnique({
        where: {
            id: params.id,
        },
    });
    if (!view) {
        return (
            <div className="mt-[5%] flex flex-col items-center justify-center">
                <Bird className="h-12 w-12" />
                <h1 className="text-xl font-semibold">This view no longer exists.</h1>
            </div>
        );
    }
    return <div className="mt-[5%] flex justify-center text-3xl font-semibold">{view.name}</div>;
}
