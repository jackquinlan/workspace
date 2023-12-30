// prettier-ignore
import { createRouter } from "./trpc";

import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";

const appRouter = createRouter({
    stripe: stripeRouter,
    user: userRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
