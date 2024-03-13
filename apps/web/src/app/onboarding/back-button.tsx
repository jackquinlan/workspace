"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@workspace/ui";

export function BackButton() {
    const router = useRouter();
    return (
        <Button className="absolute left-6 top-6" variant="outline" onClick={() => router.back()}>
            Cancel
        </Button>
    );
}
