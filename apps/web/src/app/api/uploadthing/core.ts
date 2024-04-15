import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

const f = createUploadthing();

export const ourFileRouter = {
  userAvatar: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ }) => {
      const session = await getServerAuthSession();
      if (!session?.user) {
        throw new UploadThingError("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const updateUser = await db.user.update({
        where: {
          id: metadata.userId,
        },
        data: { image: file.url },
      });
      return { uploadedBy: updateUser.id };
    }),
  workspaceLogo: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ }) => {
      const session = await getServerAuthSession();
      const members = await db.workspaceMember.findMany({
        where: { workspaceId: session?.user.activeWorkspace },
      });
      const userInWorkspace = members.find((m) => m.userId === session?.user.id);
      if (!session?.user || !userInWorkspace) {
        throw new UploadThingError("Unauthorized");
      }
      return { workspace: session.user.activeWorkspace };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.workspace.update({
        where: {
          id: metadata.workspace,
        },
        data: { image: file.url },
      });
      return {};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
