import { createRouter } from "./trpc";

import { testRouter } from "./routers/test";
import { userRouter } from "./routers/user";

const appRouter = createRouter({
    test: testRouter,
    user: userRouter
});
export type AppRouter = typeof appRouter;
export { appRouter };
