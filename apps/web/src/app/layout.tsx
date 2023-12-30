import * as React from "react";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";

import { GeistSans } from "geist/font";
import { Toaster } from "sonner";

import "@/globals.css";

import { cn, constructMetadata } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "./_providers";

const int = FontSans({ subsets: ["latin"], variable: "--inter" });

export const metadata = constructMetadata();
interface Props {
    children: React.ReactNode;
}

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head />
            <body className={cn(int.variable, GeistSans.className, GeistSans.variable)}>
                <TRPCReactProvider headers={headers()}>
                    <Providers>
                        <div className="flex min-h-screen flex-col">
                            <main className="flex-1">{children}</main>
                        </div>
                    </Providers>
                </TRPCReactProvider>
                <Toaster position="bottom-right" visibleToasts={6} />
            </body>
        </html>
    );
}
