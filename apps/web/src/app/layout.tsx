import * as React from "react";
import { Rubik } from "next/font/google";

import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

import { TRPCProvider } from "@workspace/api/react";

import { cn, constructMetadata } from "@/lib/utils";

import "@/styles/globals.css";
import { TooltipProvider } from "@workspace/ui";

const rubik = Rubik({ subsets: ["latin"], weight: ["500"], variable: "--font-rubik" });

export const metadata = constructMetadata();
interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head />
            <body className={cn(GeistSans.className, GeistSans.variable, rubik.variable)}>
                <TRPCProvider>
                    <TooltipProvider delayDuration={0}>
                        <div className="flex min-h-screen flex-col">
                            <main className="flex-1">{children}</main>
                        </div>
                    </TooltipProvider>
                </TRPCProvider>
                <Toaster position="bottom-right" visibleToasts={6} />
            </body>
        </html>
    );
}
