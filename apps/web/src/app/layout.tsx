import * as React from "react";
import { Inter } from "next/font/google";

import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

import { TRPCProvider } from "@workspace/api/react";
import { TooltipProvider } from "@workspace/ui";

import { cn, constructMetadata } from "@/lib/utils";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["500"], variable: "--font-inter" });

export const metadata = constructMetadata();
interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body className={cn(GeistSans.className, GeistSans.variable, inter.variable)}>
        <TRPCProvider>
          <TooltipProvider delayDuration={2}>
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
