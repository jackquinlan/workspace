"use server";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

export async function addGroup(projectId: string, name: string) {
    const session = await getServerAuthSession();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    const group = await db.group.create({
        data: { name: name, projectId: projectId },
    });
    return group;
}