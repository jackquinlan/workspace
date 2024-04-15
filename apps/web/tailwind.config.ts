import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

import sharedConfig from "@workspace/tailwind/tailwind.config.ts";

const config: Pick<Config, "content" | "presets"> = withUt({
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/**/*.{ts,tsx}"],
  presets: [sharedConfig as Config],
});

export default config;
