import sharedConfig from "@workspace/tailwind/tailwind.config.ts";

const config = {
    content: ["./templates/**/*.{ts,tsx}"],
    presets: [sharedConfig],
};

export default config;