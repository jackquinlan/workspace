/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ["@workspace/ui"],
    images: {
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    },
};

export default config;
