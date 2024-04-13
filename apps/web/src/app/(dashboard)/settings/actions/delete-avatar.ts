"use server";

import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

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