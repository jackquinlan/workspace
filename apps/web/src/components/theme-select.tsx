"use client";

import React from "react";

import { FieldValues, UseFormReturn } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@workspace/ui";

import { themeColors } from "@/lib/colors";

interface Props<T extends FieldValues = any> {
    form: UseFormReturn<T>;
    name: string;
}

export function ColorSelect({ form, name }: Props) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger showIcon={false} className="h-9 bg-background outline-none">
                                <SelectValue />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background">
                            {themeColors.map((theme) => (
                                <SelectItem key={theme.value} value={theme.value}>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="border-border h-2.5 w-2.5 rounded-sm border"
                                            style={{ backgroundColor: theme.value }}
                                        />
                                        {theme.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}