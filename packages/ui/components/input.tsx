import * as React from "react";

import { cn } from "../lib/utils";

const inputClass =
    "flex h-9 w-full rounded-md bg-background px-2 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    addPrefix?: React.ReactNode;
    addSuffix?: React.ReactNode;
    border?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ border = true, className, type, addPrefix, addSuffix, ...props }, ref) => {
        if (addPrefix || addSuffix) {
            return (
                <div className="border-input flex h-9 w-full items-center space-x-1 rounded-md border text-sm">
                    {addPrefix && (
                        <div className="border-input flex h-9 border-r bg-zinc-100 p-1 px-2">
                            {addPrefix}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(inputClass, "h-9 border-none outline-none", className)}
                        ref={ref}
                        {...props}
                    />
                    {addSuffix && (
                        <div className="border-input flex h-9 border-r bg-zinc-100 p-1 px-2">
                            {addSuffix}
                        </div>
                    )}
                </div>
            );
        }
        return (
            <input
                type={type}
                className={cn(
                    border &&
                        "border-input focus-visible:ring-foreground border shadow-sm focus-visible:ring-1",
                    inputClass,
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Input.displayName = "Input";

export { Input };
