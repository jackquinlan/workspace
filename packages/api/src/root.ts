// prettier-ignore
import { createRouter } from "./trpc";

import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";
import { viewRouter } from "./routers/view";

const appRouter = createRouter({
    stripe: stripeRouter,
    user: userRouter,
    view: viewRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
