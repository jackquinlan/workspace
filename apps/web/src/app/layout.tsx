import * as React from "react";

import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

import { TRPCProvider } from "@workspace/api/react";

import { cn } from "@/lib/utils";
import "@/styles/globals.css";

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head />
            <body className={cn(GeistSans.className, GeistSans.variable)}>
                <TRPCProvider>
                    <div className="flex min-h-screen flex-col">
                        <main className="flex-1">{children}</main>
                    </div>
                </TRPCProvider>
                <Toaster position="bottom-right" visibleToasts={6} />
            </body>
        </html>
    );
}
