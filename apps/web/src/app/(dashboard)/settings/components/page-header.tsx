import React from "react";

interface Props {
    heading: string;
    description?: string;
}

export function PageHeader({ description, heading }: Props) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col">
                <h1 className="font-medium text-xl md:text-2xl">{heading}</h1>
                {description && <p className="text-md text-muted-foreground">{description}</p>}
            </div>
            <hr className="my-2" />
        </div>
    );
}