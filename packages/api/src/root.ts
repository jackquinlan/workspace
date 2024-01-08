// prettier-ignore
import { createRouter } from "./trpc";

import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";
import { viewRouter } from "./routers/view";
import { workspaceRouter } from "./routers/workspace";

const appRouter = createRouter({
    stripe: stripeRouter,
    user: userRouter,
    view: viewRouter,
    workspace: workspaceRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
