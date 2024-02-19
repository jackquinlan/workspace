import { env } from "next-runtime-env";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";

import { AppRouter } from "../trpc/root";

const APP_BASE_URL = env("NEXT_PUBLIC_BASE_URL");

export const api = createTRPCProxyClient<AppRouter>({
    transformer: SuperJSON,
    links: [
        httpBatchLink({
            url: "http://localhost:3000/api/trpc",
        }),
    ],
});