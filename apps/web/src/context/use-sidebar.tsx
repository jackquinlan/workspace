"use client";

import React, { useContext, useState } from "react";

interface SidebarContextConfig {
  open: boolean;
  toggleOpen: () => void;
}

const SidebarContext = React.createContext<SidebarContextConfig>({} as SidebarContextConfig);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(true);

  const toggleOpen = () => {
    setOpen(!open);
  };
  return <SidebarContext.Provider value={{ open, toggleOpen }}>{children}</SidebarContext.Provider>;
}

export const useSidebar = () => useContext(SidebarContext);
export { SidebarContext };
