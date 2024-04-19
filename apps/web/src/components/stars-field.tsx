"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type Star = {
  size: number;
  opacity: number;
  x: number;
  y: number;
};

function generateStars(n: number, fullWidth: boolean = false) {
  return Array.from({ length: n }, () => ({
    size: Math.random() * 3,
    opacity: Math.random(),
    x: !fullWidth ? (Math.random() * window.innerWidth - window.innerWidth / 2) : Math.random() * window.innerWidth - 20,
    y: Math.random() * window.innerHeight - 20,
  }));
}

export function StarsField({ fullWidth = false }: { fullWidth?: boolean }) {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(generateStars(1000, fullWidth));
  }, []);

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-[50] h-screen w-screen">
      {stars.map((star, i) => (
        <div
          key={"star" + i}
          className="absolute rounded-full bg-white animate-pulse"
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

