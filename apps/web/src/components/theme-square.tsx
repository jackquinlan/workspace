import React from "react";

import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    color: string;
}

export function ThemeSquare({ color, className = "", ...props }: Props) {
    return (
        <div
            className={cn("border-border rounded-md border", className)}
            style={{ backgroundColor: color }}
            {...props}
        />
    );
}
