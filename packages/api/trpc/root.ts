import { createRouter } from "./trpc";

import { testRouter } from "./routers/test";

const appRouter = createRouter({
    test: testRouter
});
export type AppRouter = typeof appRouter;
export { appRouter };
