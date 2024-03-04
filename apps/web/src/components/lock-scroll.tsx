"use client";

import React from "react";

import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";

export function LockScroll() {
    useLockBodyScroll();
    return null;
}
