import React from "react";

import { getServerAuthSession } from "@workspace/auth";

export default async function Inbox() {
    const session = await getServerAuthSession();
    return <pre>{JSON.stringify(session?.user, null, 2)}</pre>;
}
