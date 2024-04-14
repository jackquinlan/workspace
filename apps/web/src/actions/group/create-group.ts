"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import type { Group } from "@workspace/db/client";
import { addGroupSchema } from "@workspace/lib/validators/group";
import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import type { ActionState } from "@/lib/create-safe-action";
import { createSafeAction } from "@/lib/create-safe-action";

type ReturnType = ActionState<z.infer<typeof addGroupSchema>, Group>;

async function createGroupHandler(data: z.infer<typeof addGroupSchema>): Promise<ReturnType> {
    const session = await getServerAuthSession();
    if (!session) {
        throw new Error("Unauthorized");
    }
    const { name, projectId } = data;
    const group = await db.group.create({
        data: {
            name: name, projectId: projectId,
        },
    });
    revalidatePath(`/p/${projectId}`);
    return { 
        data: group 
    };
}

export const createGroup = createSafeAction(addGroupSchema, createGroupHandler);