import { userRouter } from "./routers/user";
import { workspaceRouter } from "./routers/workspace";
import { createRouter } from "./trpc";

const appRouter = createRouter({
    user: userRouter,
    workspace: workspaceRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
