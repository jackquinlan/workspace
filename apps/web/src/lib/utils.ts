import type { Metadata } from "next";

import { clsx, type ClassValue } from "clsx";
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

export function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^\p{L}\p{N}\p{Zs}\p{Emoji}]+/gu, "-")
        .replace(/[\s_#]+/g, "-")
        .replace(/^-+/, "");
}
