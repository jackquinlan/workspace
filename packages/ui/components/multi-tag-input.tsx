"use client";

import React, { useRef } from "react";

import { X } from "lucide-react";

import { Input } from "./input";

interface MultiTagSelectProps {
    tags: string[];
    onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

const tagClass =
    "flex items-center justify-between gap-2 rounded-md text-xs font-medium p-1 bg-zinc-200";

const MultiTagInput = React.forwardRef<HTMLDivElement, MultiTagSelectProps>(
    ({ tags, onChange, ...props }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
            if (e.key === "Enter") {
                e.preventDefault();
            }
            const next = inputRef!.current!.value;
            if (e.key === "Tab" && next.length > 0) {
                if (!tags.includes(next)) {
                    // Only add new tags if the value does not already exist
                    onChange([...tags, next]);
                }
                inputRef!.current!.value = "";
                setTimeout(() => {
                    inputRef!.current!.focus();
                }, 0);
            }
            if (e.key === "Backspace" && next.length === 0 && tags.length > 0) {
                handleRemove(tags[tags.length - 1]);
            }
        }
        function handleRemove(tag: string) {
            onChange(tags.filter((i) => i !== tag));
        }
        return (
            <div ref={ref} className="bg-background flex h-24 flex-wrap rounded-md border">
                {tags.length > 0 && (
                    <ul className="flex flex-wrap items-start gap-1 p-2">
                        {tags.map((tag, i) => (
                            <li key={`tag-${i}`} className={tagClass}>
                                {tag}
                                <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => handleRemove(tag)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
                <Input
                    ref={inputRef}
                    className="border-0 shadow-none"
                    onKeyDown={handleKeyPress}
                    {...props}
                />
            </div>
        );
    },
);
MultiTagInput.displayName = "MultiTagInput";

export { MultiTagInput };
