import NextAuth from "next-auth";

import { authOptions } from "@workspace/lib/next-auth/next-auth-options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
