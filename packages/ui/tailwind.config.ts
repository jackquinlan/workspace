import type { Config } from "tailwindcss";

import sharedConfig from "@workspace/tailwind/tailwind.config.ts";

const config: Pick<Config, "content" | "presets"> = {
    content: ["./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
    presets: [sharedConfig as Config],
};

export default config;
