/** @type {import("eslint").Linter.Config} */
const config = {
    root: true,
    extends: ["@workspace/eslint-config"], // uses the config in `tooling/eslint-config`
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        tsconfigRootDir: __dirname,
        project: ["./apps/*/tsconfig.json", "./packages/**/*/tsconfig.json"],
    },
    settings: {
        next: {
            rootDir: ["apps/*/"],
        },
    },
};
  
module.exports = config;
