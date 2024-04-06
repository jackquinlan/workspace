import { createRouter } from "./trpc";

import { projectRouter } from "./routers/project";
import { userRouter } from "./routers/user";
import { viewRouter } from "./routers/view";
import { workspaceRouter } from "./routers/workspace";

const appRouter = createRouter({
    project: projectRouter,
    user: userRouter,
    view: viewRouter,
    workspace: workspaceRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
