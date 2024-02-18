import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "../lib/utils";

export type BUTTON_SIZE = "xs" | "sm" | "default" | "lg" | "icon";
export type BUTTON_VARIANT = "primary" | "outline" | "success" | "ghost" | "danger" | "link";

export type ButtonThemeProps = {
    size?: BUTTON_SIZE;
    variant?: BUTTON_VARIANT;
};

export const classes = {
    base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
    },
    variant: {
        primary: "bg-primary text-primary-foreground shadow hover:opacity-90",
        ghost: "hover:bg-accent hover:text-foreground",
        success: "bg-green-500 text-white hover:bg-green-600",
        outline: 
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        danger: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline",
    },
};

function getButtonClasses(
    style: { size?: BUTTON_SIZE; variant?: BUTTON_VARIANT },
    ...rest: string[]
) {
    const { size = "default", variant = "primary" } = style;
    return cn(classes["base"], classes["size"][size], classes["variant"][variant], ...rest);
}

export type ButtonProps = ButtonThemeProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp className={getButtonClasses({ size, variant }, className)} ref={ref} {...props} />
        );
    },
);
Button.displayName = "Button";

export { Button, getButtonClasses };