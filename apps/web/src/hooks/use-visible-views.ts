import * as React from "react";

export function useVisibleViews(numViews: number) {
    const [maxVisibleViews, setMaxVisibleViews] = React.useState<number>(0);
    const viewListRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleResize() {
            const viewList = viewListRef.current;
            const viewListWidth = viewList?.offsetWidth || 0;
            const viewWidth = viewListWidth % numViews;
            const containerWidth = window.innerWidth;
      
            const maxViews = Math.floor(containerWidth / viewWidth);
            const adjustedMaxViews = Math.min(maxViews, numViews);
      
            setMaxVisibleViews(adjustedMaxViews);
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return { maxVisibleViews, viewListRef };
}