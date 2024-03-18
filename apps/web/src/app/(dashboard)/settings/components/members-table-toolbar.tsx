"use client";

import React from "react";

import { Table } from "@tanstack/react-table";

import { Input, Button } from "@workspace/ui";

interface MembersTableToolbarProps<TData> {
    table: Table<TData>;
}

export function MembersTableToolbar<TData>({ table }: MembersTableToolbarProps<TData>) {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Input
                    placeholder="Search by name or email"
                    value={(table.getColumn("info")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("info")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[250px] lg:w-[300px]"
                />
            </div>
            <Button size="sm">Add members</Button>
        </div>
    );
}