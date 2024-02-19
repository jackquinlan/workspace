// import * as trpc from "@workspace/api/adapters/next";
// import { appRouter } from "@workspace/api/trpc/root";
// import { createTRPCContext } from "@workspace/api/trpc/trpc";

import type { NextRequest } from "next/server";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@workspace/api";

const handler = (req: NextRequest) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () => createTRPCContext({ req }),
        onError: ({ error, path }) => {
            process.env.NODE_ENV === "development"
                ? console.error(`>>> tRPC Error on '${path}'`, error)
                : undefined;
        },
    });

export { handler as GET, handler as POST };