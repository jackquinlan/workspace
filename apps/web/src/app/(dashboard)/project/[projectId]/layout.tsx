import React from "react";

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
}

/**
 *  Refactored Projects Layout
 *  TODOS:
 *  - Add useProjects context
 */
export default function ProjectLayoutProps({ children, params }: ProjectLayoutProps) {
  return <div>{children}</div>;
}
