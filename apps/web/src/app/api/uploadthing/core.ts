import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";
 
const f = createUploadthing();
 
export const ourFileRouter = {
    userAvatar: f({ image: { maxFileSize: "4MB" } })
        .middleware(async ({ req }) => {
            const session = await getServerAuthSession();
            if (!session?.user) {
                throw new UploadThingError("Unauthorized");
            }
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log(file);
            const updateUser = await db.user.update({
                where: { 
                    id: metadata.userId,
                },
                data: { image: file.url },
            });
            return { uploadedBy: updateUser.id };
        }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;