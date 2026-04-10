"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  origin?: "top" | "bottom" | "left" | "right";
  distance?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function ScrollRevealWrapper({
  children,
  origin = "bottom",
  distance = "40px",
  duration = 800,
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    import("scrollreveal").then(({ default: ScrollReveal }) => {
      ScrollReveal({ reset: false }).reveal(el, {
        origin,
        distance,
        duration,
        delay,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
        opacity: 0,
      });
    });
  }, [origin, distance, duration, delay]);

  return (
    <div ref={ref} className={clsx(className)}>
      {children}
    </div>
  );
}
