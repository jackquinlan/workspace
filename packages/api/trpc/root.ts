import { userRouter } from "./routers/user";
import { createRouter } from "./trpc";

const appRouter = createRouter({
    user: userRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
