"use client";

import { createTRPCReact } from '@trpc/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import SuperJSON from 'superjson';

import { AppRouter } from "../trpc/root";

export const api = createTRPCReact<AppRouter>({
    unstable_overrides: {
        useMutation: {
            async onSuccess(opts) {
                await opts.originalFn();
                await opts.queryClient.invalidateQueries();
            },
        },
    },
});

const queryClient = new QueryClient();
const trpcClient  = api.createClient({
    links: [
        loggerLink({
            enabled: () => true,
        }),
        httpBatchLink({
            url: "http://localhost:3000/api/trpc",
        }),
    ],
    transformer: SuperJSON,
})

export interface ProviderProps {
    children: React.ReactNode;
}

export function TRPCProvider({ children }: ProviderProps) {
    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </api.Provider>
    );
}