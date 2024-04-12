import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
    darkMode: "class",
    theme: {
        container: {
            padding: "0.1rem",
            screens: {
                "2xl": "1400px",
            },
            center: true,
        },
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                sidebar: "hsl(var(--sidebar))",

                primary: "hsl(var(--primary))",
                "primary-foreground": "hsl(var(--primary-foreground))",

                secondary: "hsl(var(--secondary))",
                "secondary-foreground": "hsl(var(--secondary-foreground)",

                accent: "hsl(var(--accent))",
                "accent-foreground": "hsl(var(--accent-foreground)",

                muted: "hsl(var(--muted))",
                "muted-foreground": "hsl(var(--muted-foreground)",

                card: "hsl(var(--card))",
                "card-foreground": "hsl(var(--card-foreground)",

                popover: "hsl(var(--popover))",
                "popover-foreground": "hsl(var(--popover-foreground)",

                warning: "hsl(var(--warning))",
                "warning-foreground": "hsl(var(--warning-foreground)",

                destructive: "hsl(var(--destructive))",
                "destructive-foreground": "hsl(var(--destructive-foreground)",

                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)"],
                rubik: ["var(--font-rubik)"],
            },
            borderRadius: {
                lg: "6px",
                md: "4px",
                sm: "2px",
            },
            animation: {
                "shooting-star": "meteor 5s linear infinite",
            },
            keyframes: {
                meteor: {
                    "0%": {
                        transform: "rotate(215deg) translateX(0)",
                        opacity: 1,
                    },
                    "70%": { opacity: 1 },
                    "100%": {
                        transform: "rotate(215deg) translateX(-500px)",
                        opacity: 0,
                    },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
