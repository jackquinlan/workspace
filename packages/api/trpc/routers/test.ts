import { createRouter, protectedProcedure, publicProcedure } from "../trpc";

export const testRouter = createRouter({
    get: publicProcedure.query(async (opts) => {
        return opts.ctx.db.test.findMany();
    }),
});
