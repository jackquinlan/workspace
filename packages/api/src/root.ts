// prettier-ignore
import { createRouter } from "./trpc";

import { groupRouter } from "./routers/group";
import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";
import { viewRouter } from "./routers/view";

const appRouter = createRouter({
    group: groupRouter,
    stripe: stripeRouter,
    user: userRouter,
    view: viewRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
