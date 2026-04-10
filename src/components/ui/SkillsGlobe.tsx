"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Skill } from "@/types";

interface Props {
  skills: Skill[];
}

const categoryColors: Record<string, string> = {
  frontend: "#00d9ff",
  backend:  "#ff7b00",
  tools:    "#ffd900",
  other:    "#57059e",
};

function fibonacciSphere(n: number, i: number) {
  const y     = 1 - (2 * (i + 0.5)) / n;
  const r     = Math.sqrt(1 - y * y);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  const x     = Math.cos(theta) * r;
  const z     = Math.sin(theta) * r;
  return { x, y, z };
}

function getRadius() {
  const w = window.innerWidth;
  if (w < 400) return 110;
  if (w < 640) return 130;
  return 220;
}

function getIconSize() {
  const w = window.innerWidth;
  if (w < 400) return { box: 38, icon: 18, margin: -19 };
  if (w < 640) return { box: 44, icon: 20, margin: -22 };
  return { box: 56, icon: 26, margin: -28 };
}

export default function SkillsGlobe({ skills }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const rotXRef    = useRef(-15);
  const rotYRef    = useRef(0);
  const isDragging = useRef(false);
  const lastPos    = useRef({ x: 0, y: 0 });
  const rafId      = useRef<number>(0);
  const radiusRef  = useRef(220);
  const isVisible  = useRef(true);
  const n          = skills.length;

  const [dims, setDims] = useState({ radius: 220, iconSize: getIconSize() });

  const basePositions = useRef(
    skills.map((_, i) => fibonacciSphere(n, i))
  ).current;

  const updateDims = useCallback(() => {
    const radius = getRadius();
    radiusRef.current = radius;
    setDims({ radius, iconSize: getIconSize() });
  }, []);

  // Track resize
  useEffect(() => {
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, [updateDims]);

  // Pause RAF when globe is offscreen
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      rafId.current = requestAnimationFrame(animate);
      if (!isVisible.current) return;

      if (!isDragging.current) {
        rotYRef.current += 0.15;
      }

      const R = radiusRef.current;
      const ax = (rotXRef.current * Math.PI) / 180;
      const ay = (rotYRef.current * Math.PI) / 180;
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const cosY = Math.cos(ay), sinY = Math.sin(ay);

      for (let i = 0; i < n; i++) {
        const el = iconRefs.current[i];
        if (!el) continue;

        const { x: bx, y: by, z: bz } = basePositions[i];

        const x1 = bx * cosY + bz * sinY;
        const z1 = -bx * sinY + bz * cosY;
        const y1 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        const px = x1 * R;
        const py = y1 * R;
        const pz = z2 * R;

        const depthNorm = (z2 + 1) / 2;
        const scale   = 0.5 + depthNorm * 0.6;
        const opacity = 0.4 + depthNorm * 0.6;

        el.style.transform = `translate3d(${px}px, ${py}px, ${pz}px) scale(${scale})`;
        el.style.opacity   = String(opacity);
        el.style.zIndex    = String(Math.round(depthNorm * 1000));
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [n, basePositions]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    containerRef.current?.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    rotYRef.current += dx * 0.3;
    rotXRef.current = Math.max(-60, Math.min(60, rotXRef.current - dy * 0.3));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = () => {
    isDragging.current = false;
  };

  const { radius, iconSize } = dims;
  const SIZE = radius * 2 + 80;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto select-none touch-none"
      style={{
        width:  SIZE,
        height: SIZE,
        maxWidth: "100%",
        cursor: "grab",
        contain: "layout paint",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Wireframe rings */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5"
        />
        <ellipse
          cx={SIZE / 2} cy={SIZE / 2} rx={radius} ry={radius * 0.35}
          fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"
        />
      </svg>

      {/* Icon container */}
      <div
        className="absolute"
        style={{
          top:  "50%",
          left: "50%",
          transformStyle: "preserve-3d",
          perspective: "900px",
        }}
      >
        {skills.map(({ name, Icon, category, iconScale }, i) => {
          const color = categoryColors[category] ?? "#ffffff";

          return (
            <div
              key={name}
              ref={(el) => { iconRefs.current[i] = el; }}
              className="absolute group"
              style={{
                width:      iconSize.box,
                height:     iconSize.box,
                marginLeft: iconSize.margin,
                marginTop:  iconSize.margin,
                willChange: "transform, opacity",
              }}
            >
              <div
                className="w-full h-full rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-150"
                style={{
                  background: `${color}1f`,
                  border:     `1.5px solid ${color}88`,
                  boxShadow:  `0 0 18px ${color}55, inset 0 0 8px ${color}22`,
                }}
              >
                <Icon size={iconSize.icon * (iconScale ?? 1)} style={{ color }} />
              </div>

              {/* Tooltip */}
              <div
                className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  background: "rgba(0,0,0,0.8)",
                  color,
                  border: `1px solid ${color}55`,
                }}
              >
                {name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
