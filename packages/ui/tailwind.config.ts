import type { Config } from "tailwindcss";

import base from "@workspace/tailwind/tailwind.config.ts";

const config: Pick<Config, "presets"> = {
    presets: [base],
};

export default config;
