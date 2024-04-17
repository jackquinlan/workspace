import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ["@workspace/ui"],
    images: {
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins = [...config.plugins, new PrismaPlugin()];
        }
        return config;
    }
};

export default config;
