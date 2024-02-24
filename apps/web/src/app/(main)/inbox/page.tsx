"use client";

import React from "react";

import { signOut } from "next-auth/react";

import { api } from "@workspace/api/react";
import { Button } from "@workspace/ui";

export default function Inbox() {
    const { data: tests } = api.test.get.useQuery();
    return (
        <div>
            <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
            {tests && tests.map((test) => <h1 key={test.id}>{test.text}</h1>)}
        </div>
    );
}
