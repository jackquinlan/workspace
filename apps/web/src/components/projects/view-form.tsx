"use client";

import React, { Fragment } from "react";

import { FieldValues, UseFormReturn } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Label,
    RadioGroup,
    RadioGroupItem,
} from "@workspace/ui";

import { VIEW_ICONS } from "./view-list-container";

const VIEWS = [
    { type: "board", label: "Board" },
    { type: "calendar", label: "Calendar" },
    { type: "list", label: "List" },
    { type: "table", label: "Table" },
];

interface ViewFormProps<T extends FieldValues = any> {
    form: UseFormReturn<T>;
    showLabels?: boolean;
}

export function ViewForm({ showLabels = false, form }: ViewFormProps) {
    return (
        <div className="space-y-3">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        {showLabels && <FormLabel>Name</FormLabel>}
                        <FormControl>
                            <Input
                                className="h-8"
                                placeholder="View name"
                                autoComplete="off"
                                autoFocus
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                        {showLabels && <FormLabel>Layout</FormLabel>}
                        <RadioGroup
                            className="grid grid-cols-2 gap-2"
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                        >
                            <ViewTypes />
                        </RadioGroup>
                    </FormItem>
                )}
            />
        </div>
    );
}

export function ViewTypes() {
    return (
        <Fragment>
            {VIEWS.map((view) => (
                <FormItem key={view.label}>
                    <FormControl>
                        <div>
                            <RadioGroupItem
                                value={view.type}
                                id={view.type}
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor={view.type}
                                className="border-muted bg-popover hover:bg-accent peer-data-[state=checked]:text-primary peer-data-[state=checked]:border-primary flex flex-col items-center justify-between space-y-3 rounded-md border-2 p-3 text-zinc-500"
                            >
                                {VIEW_ICONS[view.type as "board" | "calendar" | "list" | "table"]}
                                {view.label}
                            </Label>
                        </div>
                    </FormControl>
                </FormItem>
            ))}
        </Fragment>
    );
}
