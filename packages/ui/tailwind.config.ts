import type { Config } from "tailwindcss";

import sharedConfig from "@workspace/tailwind/tailwind.config.ts";

const config: Pick<Config, "presets"> = {
    presets: [
        {
            ...sharedConfig,
            content: ["./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
        },
    ],
};

export default config;
