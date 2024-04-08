import * as React from "react";

import { cn } from "../lib/utils";

const inputClass =
    "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none hover:border-zinc-300 focus-visible:border-black focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    addPrefix?: React.ReactNode;
    addSuffix?: React.ReactNode;
    border?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ border = true, className, type, addPrefix, addSuffix, ...props }, ref) => {
        if (addPrefix || addSuffix) {
            return (
                <div
                    className={cn(
                        "border-input bg-background flex w-full items-center space-x-1 rounded-md border text-sm hover:border-zinc-300",
                        className,
                    )}
                >
                    {addPrefix && (
                        <div className="border-input bg-accent my-auto flex h-9 items-center border-r p-1 px-2">
                            {addPrefix}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(inputClass, "h-8 border-none shadow-none outline-none")}
                        autoComplete="off"
                        ref={ref}
                        {...props}
                    />
                    {addSuffix && (
                        <div className="border-input bg-background my-auto flex h-9 items-center border-l p-1 px-2">
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
