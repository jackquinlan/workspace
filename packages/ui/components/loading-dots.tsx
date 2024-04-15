import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const loadingDotVariants = cva("animate-pulse rounded-full direction-alternate duration-700", {
  variants: {
    variant: {
      default: "bg-zinc-400",
      light: "bg-white",
    },
    size: {
      xs: "h-[.25rem] w-[.25rem]",
      sm: "h-1 w-1",
      lg: "h-[1.5rem] w-[1.5rem]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

interface Props extends React.ComponentProps<"div">, VariantProps<typeof loadingDotVariants> {}

export function LoadingDots({ className, variant, size, ...props }: Props) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)} {...props}>
      <div className={cn(loadingDotVariants({ variant, size }))} />
      <div className={cn(loadingDotVariants({ variant, size }), "delay-150")} />
      <div className={cn(loadingDotVariants({ variant, size }), "delay-300")} />
    </div>
  );
}
