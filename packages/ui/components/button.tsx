import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";
import { LoadingDots } from "./loading-dots";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow hover:bg-red-600",
                danger: "bg-destructive text-destructive-foreground shadow-sm text-white hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-zinc-800 underline-offset-4 hover:underline",
                warning: "bg-warning text-warning-foreground shadow-sm hover:bg-amber-500",
            },
            size: {
                default: "h-9 px-4 py-2",
                xs: "h-7 rounded-md px-2 text-xs",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "prefix">,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className = "", children, variant, size, asChild = false, loading = false, ...props },
        ref,
    ) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
                {loading && <LoadingDots variant="light" size="xs" className="me-1" />}
                {children}
            </Comp>
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };
