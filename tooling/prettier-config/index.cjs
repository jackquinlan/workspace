/** @type {import("prettier").Config} */
module.exports = {
    semi: true,
    printWidth: 100,
    useTabs: false,
    tabWidth: 4,
    trailingComma: "all",
    singleQuote: false,
    plugins: [
        "@trivago/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
    importOrder: [
        "^server-only|client-only$",
        "^react$",
        "^next(/.*)?$",
        "<THIRD_PARTY_MODULES>",
        "^@workspace/(.*)$",
        "^~/(.*)$",
        "^[./]",
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};