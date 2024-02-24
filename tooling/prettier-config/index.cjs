/** @type {import("prettier").Config} */
module.exports = {
    semi: true,
    printWidth: 100,
    useTabs: false,
    tabWidth: 4,
    trailingComma: "all",
    singleQuote: false,
    plugins: [
        "@ianvs/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss"
    ],
    importOrderTypeScriptVersion: "4.4.0",
    importOrder: [
        "^(react/(.*)$)|^(react$)",
        "^(next/(.*)$)|^(next$)",
        "",
        "<THIRD_PARTY_MODULES>",
        "",
        "^@workspace/(.*)$",
        "",
        "^@/(.*)$",
        "^[./]"
    ]
};