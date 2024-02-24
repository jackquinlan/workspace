import { testRouter } from "./routers/test";
import { userRouter } from "./routers/user";
import { createRouter } from "./trpc";

const appRouter = createRouter({
    test: testRouter,
    user: userRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
