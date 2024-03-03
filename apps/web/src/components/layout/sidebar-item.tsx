"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    action?: () => void;
    href: string;
}

export function SidebarItem({ className = "", children, href }: ItemProps) {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={cn(
                "hover:bg-muted flex items-center gap-2 rounded-md px-1 py-[3px] text-sm",
                pathname.startsWith(href) && "bg-muted",
                className,
            )}
        >
            {children}
        </Link>
    );
}
