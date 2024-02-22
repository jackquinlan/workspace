import type { Config } from "tailwindcss";

import sharedConfig from "@workspace/tailwind/tailwind.config.ts";

const config: Pick<Config, "content" | "presets"> = {
    content: ["./src/**/*.{ts,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
    presets: [sharedConfig as Config],
};

export default config;
