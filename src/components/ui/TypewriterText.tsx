"use client";

import { useEffect, useRef } from "react";

interface Props {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
}

export default function TypewriterText({
  strings,
  typeSpeed = 50,
  backSpeed = 25,
  backDelay = 600,
}: Props) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current) return;

    let typed: { destroy: () => void } | null = null;

    import("typed.js").then(({ default: Typed }) => {
      if (!el.current) return;
      typed = new Typed(el.current, {
        strings,
        loop: true,
        typeSpeed,
        backSpeed,
        backDelay,
      });
    });

    return () => {
      typed?.destroy();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span
      ref={el}
      aria-label={strings.join(", ")}
      className="text-orange font-semibold"
    />
  );
}
