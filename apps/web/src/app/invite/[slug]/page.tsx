import { notFound, redirect } from "next/navigation";

import { addMemberToWorkspace } from "@workspace/lib/server-only/add-user-to-workspace";
import { db } from "@workspace/db";
import { getServerAuthSession } from "@workspace/lib/next-auth/get-server-session";

export default async function InvitePage({ params }: { params: { slug: string } }) {
    const user = await getServerAuthSession();
    if (!user) {
        return redirect(`/?from=${process.env.NEXT_PUBLIC_APP_URL}/invite/${params.slug}`);
    }
    if (!params.slug) {
        return notFound();
    }
    const workspace = await db.workspace.findUnique({
        where: { inviteSlug: params.slug },
    });
    if (!workspace || !workspace.inviteSlugEnabled) {
        return notFound();
    }
    const membership = await addMemberToWorkspace(user.user.id, workspace, "admin");
    if (!membership) {
        return notFound();
    }

    // The only job of this page is to redirect a user to the correct page after they join the team.
    // We don't need to render anything here.
    return redirect("/inbox");
}
