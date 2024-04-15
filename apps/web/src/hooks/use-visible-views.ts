import * as React from "react";

export function useVisibleViews(numViews: number) {
  const [maxVisibleViews, setMaxVisibleViews] = React.useState<number>(numViews);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewsListRef = React.useRef<HTMLOListElement>(null);

  React.useEffect(() => {
    function handleResize() {
      const viewList = viewsListRef.current;
      const viewListWidth = viewList?.offsetWidth || 0;
      const viewWidth = 100;

      // Get the width of the container that the view list is in
      const container = containerRef.current;
      const containerWidth = container?.offsetWidth || 0;

      const fractionalViews = (containerWidth < 200 ? 1 : containerWidth / viewWidth) - 1;
      const adjustedMaxViews = Math.min(Math.floor(fractionalViews), numViews);

      setMaxVisibleViews(adjustedMaxViews);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });
  return { maxVisibleViews, containerRef, viewsListRef };
}
