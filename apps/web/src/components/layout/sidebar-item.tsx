"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface ItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
    action?: () => void;
    href: string;
}

export function SidebarItem({ className = "", children, href, ...props }: ItemProps) {
    const pathname = usePathname();
    return (
        <Link 
            href={href}
            className={cn(
                "hover:bg-muted flex items-center gap-2 rounded-md px-1 py-[3px] text-sm",
                pathname.startsWith(href) && "bg-muted",
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
