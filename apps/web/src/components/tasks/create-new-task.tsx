"use client";

import React, { useState } from "react";

import { Plus } from "lucide-react";

import { 
    Button,
    Dialog,
} from "@workspace/ui";

export function CreateNewTask() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <React.Fragment>
            <Button 
                className="justify-start hover:text-primary w-full" 
                size="sm" 
                variant="ghost"
            >
                <Plus className="h-4 w-4 mr-2" /> New task
            </Button>
            <Dialog></Dialog>
        </React.Fragment>
    );
}