import * as z from "zod";

import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";
import { editInviteLinkSchema } from "@workspace/lib/validators/workspace";

export async function PATCH(req: Request) {
    try {
        const json = await req.json();
        const body = editInviteLinkSchema.parse(json);
        const workspace = await db.workspace.findUnique({
            where: { id: body.workspaceId },
        });
        if (!workspace) {
            return new Response("Workspace not found.", { status: 404 });
        }
        const session = await getServerAuthSession();
        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }
        const membership = await db.workspaceMember.findFirst({
            where: {
                workspaceId: body.workspaceId,
                userId: session.user.id,
            },
        });
        if (!membership || !["owner", "admin"].includes(membership.role)) {
            return new Response("Unauthorized", { status: 401 });
        }
        const update = await db.workspace.update({
            where: {
                id: body.workspaceId,
            },
            data: {
                inviteSlug: body.inviteSlug,
                inviteSlugEnabled: body.inviteSlugEnabled,
            },
        });
        return new Response(
            JSON.stringify({ inviteSlug: update.inviteSlug, enabled: update.inviteSlugEnabled }),
            { status: 200 },
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response("Internal Server Error", { status: 500 });
    }
}
