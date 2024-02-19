import type { Config } from "tailwindcss";

import sharedConfig from "@workspace/tailwind/tailwind.config";

const config: Pick<Config, "presets"> = {
    presets: [
        {
            ...sharedConfig,
            content: ["./src/**/*.{ts,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
        },
    ],
};

export default config;
