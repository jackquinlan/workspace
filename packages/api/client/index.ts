import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import SuperJSON from "superjson";

import { getBaseUrl } from "@workspace/lib/utils/get-base-url";

import { AppRouter } from "../trpc/root";

export const api = createTRPCProxyClient<AppRouter>({
    transformer: SuperJSON,
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
        }),
    ],
});
