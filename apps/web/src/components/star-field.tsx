"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

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
      {/* <Meteors number={10} /> */}
    </div>
  );
}

export const Meteors = ({ number, className }: { number?: number; className?: string }) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <React.Fragment>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-shooting-star absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-white shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: Math.floor(Math.random() * (1000 - -800) + -800) + "px",
            left: 0,
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (20 - 2) + 2) + "s",
          }}
        ></span>
      ))}
    </React.Fragment>
  );
};
