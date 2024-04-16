import React from "react";

interface Props {
  heading: string;
  description?: string;
}

export function PageHeader({ description, heading }: Props) {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col">
        <h1 className="text-xl font-medium md:text-2xl">{heading}</h1>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      <hr className="my-2" />
    </div>
  );
}
