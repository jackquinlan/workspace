import React from "react";

import { getServerAuthSession } from "@workspace/auth";

export default async function Inbox() {
    const session = await getServerAuthSession();
    return <pre className="container">{JSON.stringify(session?.user, null, 2)}</pre>;
}
