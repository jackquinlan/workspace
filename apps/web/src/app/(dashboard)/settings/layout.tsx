import React from "react";

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
    return <div className="m-auto flex items-center w-full md:w-2/3 xl:w-1/2">{children}</div>;
}
