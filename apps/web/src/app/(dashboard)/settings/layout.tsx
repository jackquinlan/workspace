import React from "react";

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="flex items-center w-1/2 m-auto">
            {children}
        </div>
    );
}