import React from "react";

import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

export default async function Inbox() {
  const session = await getServerAuthSession();
  return <pre>{JSON.stringify(session?.user, null, 2)}</pre>;
}
