import type { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";

import { authOptions } from "./next-auth-options";

export async function getServerAuthSession() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return null;
    }
    return session;
}

export async function getServerAuthSessionWithOpts({
    req,
    res,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
}) {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
        return null;
    }
    return session;
}
