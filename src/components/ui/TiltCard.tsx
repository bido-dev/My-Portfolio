"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 15,
  glare = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    import("vanilla-tilt").then(({ default: VanillaTilt }) => {
      VanillaTilt.init(el, {
        max: maxTilt,
        speed: 400,
        glare,
        "max-glare": 0.2,
        scale: 1.03,
      });
    });

    return () => {
      // @ts-expect-error vanillaTilt is attached to DOM element at runtime
      el.vanillaTilt?.destroy();
    };
  }, [maxTilt, glare]);

  return (
    <div ref={ref} className={clsx("transform-gpu", className)}>
      {children}
    </div>
  );
}
