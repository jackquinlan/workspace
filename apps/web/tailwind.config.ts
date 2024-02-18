import type { Config } from "tailwindcss";

import sharedConfig from "@workspace/tailwind/tailwind.config";

const config: Pick<Config, "presets"> = {
    presets: [{
        ...sharedConfig,
        content: ["./src/app/**/*.tsx", "../../packages/ui/**/*.tsx"]
    }],
};

export default config;
