import * as React from "react";

export function useVisibleViews(numViews: number, maxViewWidth?: number) {
    const [maxVisibleViews, setMaxVisibleViews] = React.useState<number>(numViews);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const viewListRef = React.useRef<HTMLOListElement>(null);

    React.useEffect(() => {
        function handleResize() {
            const viewList = viewListRef.current;
            const viewListWidth = viewList?.offsetWidth || 0;
            const viewWidth = maxViewWidth ?? Math.floor(viewListWidth / numViews);

            // Get the width of the container that the view list is in
            const container = containerRef.current;
            const containerWidth = container?.offsetWidth || 0;

            const fractionalViews = containerWidth < 200 ? 1 : containerWidth / viewWidth;
            const adjustedMaxViews = Math.min(Math.floor(fractionalViews), numViews);

            setMaxVisibleViews(adjustedMaxViews);
        }
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    });
    return { maxVisibleViews, containerRef, viewListRef };
}
