import type { Metadata } from "next";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function constructMetadata({
    title = "Workspace",
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