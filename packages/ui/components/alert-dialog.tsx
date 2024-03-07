"use client";

import * as React from "react";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "../lib/utils";
import { BUTTON_VARIANT, getButtonClasses } from "./button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
        className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/30",
            className,
        )}
        {...props}
        ref={ref}
    />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
    <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogPrimitive.Content
            ref={ref}
            className={cn(
                "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border shadow-md duration-200 sm:rounded-lg md:w-full",
                className,
            )}
            {...props}
        />
    </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "border-b-border flex flex-col space-y-2 border-b text-center sm:text-left",
            className,
        )}
        {...props}
    />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "border-t-border flex flex-col-reverse border-t sm:flex-row sm:justify-end sm:space-x-2",
            className,
        )}
        {...props}
    >
        <div className="flex gap-2 p-3">{children}</div>
    </div>
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Title
        ref={ref}
        className={cn("px-3 py-2 text-lg font-medium", className)}
        {...props}
    />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
        ref={ref}
        className={cn("text-muted-foreground px-3 text-sm", className)}
        {...props}
    />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Action>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
        variant?: BUTTON_VARIANT;
    }
>(({ variant = "danger", className, ...props }, ref) => (
    <AlertDialogPrimitive.Action
        ref={ref}
        className={cn(getButtonClasses({ variant: variant, size: "sm" }), className)}
        {...props}
    />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
    React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
    React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Cancel
        ref={ref}
        className={cn(
            getButtonClasses({ variant: "outline", size: "sm" }),
            "mt-2 sm:mt-0",
            className,
        )}
        {...props}
    />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
};
