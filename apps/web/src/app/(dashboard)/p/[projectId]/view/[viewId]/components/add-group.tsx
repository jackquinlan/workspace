"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@workspace/ui";

interface AddGroupProps {
    projectId: string
}

export function AddGroup({ projectId }: AddGroupProps) {
    const [open, setOpen] = useState<boolean>(false);
    
    if (!open) {
        return (
            <Button className="w-[400px] border border-dashed" variant="ghost" onClick={() => setOpen(true)}>
                <Plus className="mr-0.5 h-4 w-4" /> Add Group
            </Button>
        );
    }

    return (
        <div></div>
    );
}