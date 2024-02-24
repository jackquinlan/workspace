"use client";

import React, { useEffect, useState } from "react";

type Star = {
    size: number;
    opacity: number;
    x: number;
    y: number;
};

function generateStars(n: number) {
    return Array.from({ length: n }, () => ({
        size: Math.random() * 3,
        opacity: Math.random(),
        x: Math.random() * window.innerWidth - window.innerWidth / 2,
        y: Math.random() * window.innerHeight - 20,
    }));
}

export function StarsField() {
    const [stars, setStars] = useState<Star[]>([]);
    useEffect(() => {
        setStars(generateStars(1000));
    }, []);

    return (
        <div className="pointer-events-none absolute left-0 top-0 z-[50] h-screen w-[200px]">
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                        top: star.y,
                        left: star.x,
                        opacity: star.opacity,
                        width: star.size,
                        height: star.size,
                    }}
                />
            ))}
        </div>
    );
}
