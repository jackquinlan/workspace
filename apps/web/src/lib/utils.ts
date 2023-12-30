import type { Metadata } from "next";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function constructMetadata({
    title = "Workspace - open-source productivity tools",
    description = "",
    icons = "/favicon.ico",
}: {
    title?: string;
    description?: string;
    icons?: string;
} = {}): Metadata {
    return {
        title,
        description,
        icons,
    };
}

export function getBaseUrl() {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
}
