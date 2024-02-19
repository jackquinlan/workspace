import { getServerSession } from "next-auth";

import { authOptions } from "./next-auth-options";

export async function getServerAuthSession() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null;
    }
    return session;
}
