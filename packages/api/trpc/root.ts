import { createRouter } from "./trpc";

import { userRouter } from "./routers/user";
import { workspaceRouter } from "./routers/workspace";
import { projectRouter } from "./routers/project";

const appRouter = createRouter({
    user: userRouter,
    workspace: workspaceRouter,
    project: projectRouter
});
export type AppRouter = typeof appRouter;
export { appRouter };
