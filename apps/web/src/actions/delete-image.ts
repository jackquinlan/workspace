"use server";

import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import { z } from "zod";

import type { Workspace } from "@workspace/db/client";
import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

import { createSafeAction } from "@/lib/create-safe-action";

const deleteImageSchema = z.object({
    file: z.string().min(1),
});

const utapi = new UTApi();

export async function deleteAvatar(file: string, formData: FormData) {
    const session = await getServerAuthSession();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    if (file.startsWith("https://utfs.io/f/")) {
        // Delete the file from the UploadThing API
        const key = file.split("/")[4];
        await utapi.deleteFiles(key);
    } 
    // remove image from user
    await db.user.update({
        where: { 
            id: session.user.id 
        },
        data: { 
            image: null 
        },
    });
    revalidatePath("/settings/profile");
}

async function workspaceHandler(data: z.infer<typeof deleteImageSchema>): Promise<{}> {
    const session = await getServerAuthSession();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }
    const { file } = data;
    // TODO: Check if ADMIN
    if (file.startsWith("https://utfs.io/f/")) {
        // Delete the file from the UploadThing API
        const key = file.split("/")[4];
        await utapi.deleteFiles(key);
    } 
    // remove image from user
    await db.workspace.update({
        where: { 
            id: session.user.activeWorkspace
        },
        data: { 
            image: null 
        },
    });
    revalidatePath("/settings/workspace/general");
    return {};
}

export const deleteWorkspaceLogo = createSafeAction(deleteImageSchema, workspaceHandler); 