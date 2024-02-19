"use client";

import React from "react";

import { signOut } from "next-auth/react";

import { Button } from "@workspace/ui";

export default function Inbox() {
    return <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>;
}
