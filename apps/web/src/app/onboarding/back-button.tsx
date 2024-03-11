"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@workspace/ui";

export function BackButton() {
    const router = useRouter();
    return (
        <Button className="absolute top-6 left-6" variant="outline" onClick={() => router.back()}>Back</Button>
    );
}