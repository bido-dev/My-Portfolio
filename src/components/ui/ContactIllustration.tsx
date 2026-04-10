"use client";

import { useRef, useCallback, useState } from "react";

/* ── constants ─────────────────────────────────────────────── */
const PHONE_REST = { x: 275, y: 155 };
const EMAIL_TARGET = { x: 340, y: 70 };
const CALL_TARGET = { x: 350, y: 170 };
const CHAT_TARGET = { x: 340, y: 270 };
const HIT_RADIUS = 45;

type Target = "email" | "call" | "chat";

function hitTest(pos: { x: number; y: number }): Target | null {
  const dE = Math.hypot(pos.x - EMAIL_TARGET.x, pos.y - EMAIL_TARGET.y);
  const dCa = Math.hypot(pos.x - CALL_TARGET.x, pos.y - CALL_TARGET.y);
  const dCh = Math.hypot(pos.x - CHAT_TARGET.x, pos.y - CHAT_TARGET.y);
  if (dE < HIT_RADIUS) return "email";
  if (dCa < HIT_RADIUS) return "call";
  if (dCh < HIT_RADIUS) return "chat";
  return null;
}

export default function ContactIllustration() {
  const svgRef = useRef<SVGSVGElement>(null);
  const phoneRef = useRef<SVGGElement>(null);
  const cordRef = useRef<SVGPathElement>(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const phonePos = useRef({ ...PHONE_REST });

  const [dragging, setDragging] = useState(false);
  const [hoveredTarget, setHoveredTarget] = useState<Target | null>(null);
  const [hitEffect, setHitEffect] = useState<Target | null>(null);

  /* Convert client coords → SVG space */
  const clientToSVG = useCallback((cx: number, cy: number) => {
    const svg = svgRef.current!;
    const pt = svg.createSVGPoint();
    pt.x = cx;
    pt.y = cy;
    const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: svgPt.x, y: svgPt.y };
  }, []);

  /* Move phone + cord via DOM (no React re-render) */
  const movePhone = useCallback((x: number, y: number) => {
    phoneRef.current?.setAttribute("transform", `translate(${x}, ${y})`);
    // Curly cord from character's hand to phone
    const handX = 240, handY = 240;
    const mx = (handX + x) / 2;
    const my = Math.min(handY, y) + 40;
    cordRef.current?.setAttribute("d", `M${handX},${handY} Q${mx},${my} ${x},${y}`);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    svgRef.current?.setPointerCapture(e.pointerId);
    const svgPt = clientToSVG(e.clientX, e.clientY);
    offset.current = {
      x: svgPt.x - phonePos.current.x,
      y: svgPt.y - phonePos.current.y,
    };
    setDragging(true);
  }, [clientToSVG]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const svgPt = clientToSVG(e.clientX, e.clientY);
    const nx = svgPt.x - offset.current.x;
    const ny = svgPt.y - offset.current.y;
    phonePos.current = { x: nx, y: ny };
    movePhone(nx, ny);
    setHoveredTarget(hitTest({ x: nx, y: ny }));
  }, [clientToSVG, movePhone]);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const hit = hitTest(phonePos.current);

    if (hit) {
      setHitEffect(hit);
      setTimeout(() => setHitEffect(null), 600);
      // Trigger action after brief glow delay
      setTimeout(() => {
        if (hit === "email") {
          window.location.href = "mailto:abdallamohammed.ammar@gmail.com";
        } else if (hit === "chat") {
          window.open("https://wa.me/966551124480", "_blank", "noopener,noreferrer");
        } else if (hit === "call") {
          window.location.href = "tel:+966551124480";
        }
      }, 400);
    }

    // Snap back
    phonePos.current = { ...PHONE_REST };
    if (phoneRef.current) {
      phoneRef.current.style.transition = "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)";
      movePhone(PHONE_REST.x, PHONE_REST.y);
      setTimeout(() => {
        if (phoneRef.current) phoneRef.current.style.transition = "";
      }, 420);
    }
    setDragging(false);
    setHoveredTarget(null);
  }, [movePhone]);

  return (
    <div className="w-full max-w-[400px] mx-auto lg:max-w-none touch-none">
      <svg
        ref={svgRef}
        viewBox="0 0 420 440"
        className="w-full h-auto select-none touch-none"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* ── Character body ── */}
        <g>
          {/* Legs */}
          <rect x="155" y="320" width="28" height="60" rx="10" fill="#1a1a3e" />
          <rect x="197" y="320" width="28" height="60" rx="10" fill="#1a1a3e" />
          {/* Shoes */}
          <ellipse cx="169" cy="382" rx="20" ry="8" fill="#0e0f31" />
          <ellipse cx="211" cy="382" rx="20" ry="8" fill="#0e0f31" />

          {/* Body / shirt */}
          <rect x="140" y="225" width="100" height="100" rx="20" fill="#2506ad" />
          {/* Collar accent */}
          <path d="M170 225 L190 245 L210 225" fill="none" stroke="#3a18d4" strokeWidth="2" />

          {/* Left arm (relaxed) */}
          <path
            d="M140,260 Q110,270 115,300"
            fill="none"
            stroke="#e8b89d"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Left hand */}
          <circle cx="115" cy="300" r="12" fill="#e8b89d" />

          {/* Right arm (reaching up toward phone) */}
          <path
            d="M240,250 Q270,240 265,200"
            fill="none"
            stroke="#e8b89d"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Right hand */}
          <circle cx="265" cy="195" r="12" fill="#e8b89d" />

          {/* Neck */}
          <rect x="178" y="210" width="24" height="20" rx="8" fill="#e8b89d" />

          {/* Head */}
          <ellipse cx="190" cy="180" rx="45" ry="50" fill="#e8b89d" />

          {/* Bald head shine */}
          <ellipse cx="185" cy="148" rx="18" ry="10" fill="#f0c8aa" opacity="0.4" />

          {/* Beard */}
          {/* Jaw area */}
          <path d="M162,200 Q162,230 190,238 Q218,230 218,200" fill="#3a2a1a" />
          {/* Cheek sides */}
          <ellipse cx="158" cy="198" rx="10" ry="14" fill="#3a2a1a" />
          <ellipse cx="222" cy="198" rx="10" ry="14" fill="#3a2a1a" />
          {/* Mustache */}
          <path d="M175,198 Q182,205 190,200 Q198,205 205,198" fill="#3a2a1a" />
          {/* Beard texture */}
          <path d="M172,215 Q180,220 190,218" fill="none" stroke="#4e3c2a" strokeWidth="1" opacity="0.4" />
          <path d="M190,218 Q200,220 208,215" fill="none" stroke="#4e3c2a" strokeWidth="1" opacity="0.4" />
          <path d="M178,225 Q190,232 202,225" fill="none" stroke="#4e3c2a" strokeWidth="1" opacity="0.3" />

          {/* Eyes */}
          <ellipse cx="175" cy="178" rx="5" ry="6" fill="#1a1a3e" />
          <ellipse cx="205" cy="178" rx="5" ry="6" fill="#1a1a3e" />
          {/* Eye shine */}
          <circle cx="177" cy="176" r="2" fill="#fff" />
          <circle cx="207" cy="176" r="2" fill="#fff" />

          {/* Eyebrows */}
          <path d="M165 168 Q175 163 183 168" fill="none" stroke="#3a2a1a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M197 168 Q205 163 215 168" fill="none" stroke="#3a2a1a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Nose */}
          <path d="M188 185 Q190 192 194 188" fill="none" stroke="#d4a388" strokeWidth="1.5" strokeLinecap="round" />

          {/* Smile */}
          <path d="M178 200 Q190 210 202 200" fill="none" stroke="#1a1a3e" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* ── Phone cord ── */}
        <path
          ref={cordRef}
          d={`M240,240 Q${(240 + PHONE_REST.x) / 2},${Math.min(240, PHONE_REST.y) + 30} ${PHONE_REST.x},${PHONE_REST.y}`}
          fill="none"
          stroke="#555"
          strokeWidth="2"
          strokeDasharray="4 3"
          opacity="0.5"
        />

        {/* ── Target: Email ── */}
        <g transform={`translate(${EMAIL_TARGET.x}, ${EMAIL_TARGET.y})`}>
          {/* Pulse circle */}
          <circle
            r="30"
            fill="#57059e"
            opacity="0.15"
            style={{
              animation: dragging ? "none" : "targetPulse 3s ease-in-out infinite",
              transformOrigin: `${EMAIL_TARGET.x}px ${EMAIL_TARGET.y}px`,
            }}
          />
          {/* Hit glow */}
          {hitEffect === "email" && (
            <circle
              r="30"
              fill="#57059e"
              style={{
                animation: "hitGlow 0.6s ease-out forwards",
                transformOrigin: `${EMAIL_TARGET.x}px ${EMAIL_TARGET.y}px`,
              }}
            />
          )}
          {/* Icon bg */}
          <circle
            r="24"
            fill={hoveredTarget === "email" ? "#57059e" : "#2506ad"}
            style={{ transition: "fill 0.2s, transform 0.2s", transform: hoveredTarget === "email" ? "scale(1.2)" : "scale(1)" }}
          />
          {/* Envelope icon */}
          <g transform="translate(-12, -9) scale(0.75)">
            <rect x="0" y="4" width="32" height="22" rx="3" fill="none" stroke="#fff" strokeWidth="2" />
            <path d="M0 4 L16 16 L32 4" fill="none" stroke="#fff" strokeWidth="2" />
          </g>
          <text y="50" textAnchor="middle" fontSize="11" fill="#57059e" fontWeight="600">Email</text>
        </g>

        {/* ── Target: Call ── */}
        <g transform={`translate(${CALL_TARGET.x}, ${CALL_TARGET.y})`}>
          {/* Pulse circle */}
          <circle
            r="30"
            fill="#25D366"
            opacity="0.15"
            style={{
              animation: dragging ? "none" : "targetPulse 3s ease-in-out infinite 0.75s",
              transformOrigin: `${CALL_TARGET.x}px ${CALL_TARGET.y}px`,
            }}
          />
          {/* Hit glow */}
          {hitEffect === "call" && (
            <circle
              r="30"
              fill="#25D366"
              style={{
                animation: "hitGlow 0.6s ease-out forwards",
                transformOrigin: `${CALL_TARGET.x}px ${CALL_TARGET.y}px`,
              }}
            />
          )}
          {/* Icon bg */}
          <circle
            r="24"
            fill={hoveredTarget === "call" ? "#1ebe5d" : "#25D366"}
            style={{ transition: "fill 0.2s, transform 0.2s", transform: hoveredTarget === "call" ? "scale(1.2)" : "scale(1)" }}
          />
          {/* Phone icon */}
          <g transform="translate(-10, -10) scale(0.85)">
            <path
              d="M6,4 Q4,4 4,6 L4,10 Q4,16 10,20 Q14,22 18,18 L20,16 Q22,14 20,12 L18,10 Q16,8 14,10 L12,12 Q10,10 8,8 L10,6 Q12,4 10,2 L8,0 Q6,-2 4,0 Z"
              fill="#fff"
              stroke="#fff"
              strokeWidth="0.5"
            />
          </g>
          <text y="50" textAnchor="middle" fontSize="11" fill="#25D366" fontWeight="600">Call</text>
        </g>

        {/* ── Target: WhatsApp ── */}
        <g transform={`translate(${CHAT_TARGET.x}, ${CHAT_TARGET.y})`}>
          {/* Pulse circle */}
          <circle
            r="30"
            fill="#25D366"
            opacity="0.15"
            style={{
              animation: dragging ? "none" : "targetPulse 3s ease-in-out infinite 1.5s",
              transformOrigin: `${CHAT_TARGET.x}px ${CHAT_TARGET.y}px`,
            }}
          />
          {/* Hit glow */}
          {hitEffect === "chat" && (
            <circle
              r="30"
              fill="#25D366"
              style={{
                animation: "hitGlow 0.6s ease-out forwards",
                transformOrigin: `${CHAT_TARGET.x}px ${CHAT_TARGET.y}px`,
              }}
            />
          )}
          {/* Icon bg */}
          <circle
            r="24"
            fill={hoveredTarget === "chat" ? "#1ebe5d" : "#25D366"}
            style={{ transition: "fill 0.2s, transform 0.2s", transform: hoveredTarget === "chat" ? "scale(1.2)" : "scale(1)" }}
          />
          {/* WhatsApp icon */}
          <g transform="translate(-12, -12) scale(0.048)">
            <path
              d="M256 0C114.6 0 0 114.6 0 256c0 45.2 11.7 87.7 32.3 124.7L0 512l135.2-31.1C171.6 500.4 212.8 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0zm128.1 362.1c-5.4 15.1-31.3 29.3-43.1 31.1-11.1 1.7-25.2 2.4-40.7-2.6-9.4-3-21.4-7.1-36.8-13.9-64.7-28.5-107-93.8-110.2-98.2-3.3-4.4-26.5-35.2-26.5-67.2s16.8-47.6 22.8-54.1c5.9-6.5 13-8.1 17.3-8.1 4.3 0 8.7 0 12.5.2 4 .2 9.4-1.5 14.7 11.2 5.4 13 18.4 44.8 20 48.1 1.6 3.3 2.7 7.1.5 11.5-2.1 4.4-3.3 7.1-6.5 10.9-3.3 3.8-6.9 8.4-9.8 11.3-3.3 3.3-6.7 6.8-2.9 13.3 3.8 6.5 17 28.1 36.5 45.5 25.1 22.4 46.3 29.4 52.8 32.7 6.5 3.3 10.3 2.7 14.1-1.6 3.8-4.4 16.3-19 20.7-25.5 4.3-6.5 8.7-5.4 14.7-3.3 5.9 2.2 37.8 17.8 44.3 21.1 6.5 3.3 10.8 4.9 12.5 7.6 1.6 2.7 1.6 15.7-3.8 30.8z"
              fill="#fff"
            />
          </g>
          <text y="50" textAnchor="middle" fontSize="11" fill="#25D366" fontWeight="600">WhatsApp</text>
        </g>

        {/* ── Draggable phone (topmost layer) ── */}
        <g
          ref={phoneRef}
          transform={`translate(${PHONE_REST.x}, ${PHONE_REST.y})`}
          style={{ cursor: dragging ? "grabbing" : "grab", willChange: "transform" }}
          onPointerDown={onPointerDown}
        >
          {/* Ring animation wrapper */}
          <g style={hitEffect ? { animation: "ringRing 0.5s ease", transformOrigin: "0 0" } : undefined}>
            {/* Phone receiver */}
            <rect x="-28" y="-35" width="24" height="30" rx="7" fill="#ff7b00" />
            <path d="M-16,0 Q-16,20 0,24 Q16,20 16,0" fill="none" stroke="#ff7b00" strokeWidth="8" strokeLinecap="round" />
            <rect x="4" y="-35" width="24" height="30" rx="7" fill="#ff7b00" />
            {/* Highlights */}
            <rect x="-24" y="-30" width="6" height="12" rx="3" fill="#ffa040" opacity="0.6" />
            <rect x="8" y="-30" width="6" height="12" rx="3" fill="#ffa040" opacity="0.6" />
          </g>
          {/* "Drag me" hint */}
          {!dragging && (
            <text y="45" textAnchor="middle" fontSize="10" fill="#ff7b00" fontWeight="600" opacity="0.8">
              Drag me!
            </text>
          )}
        </g>

        {/* ── Decorative dots ── */}
        <circle cx="50" cy="60" r="3" fill="#57059e" opacity="0.2" />
        <circle cx="370" cy="350" r="4" fill="#00d9ff" opacity="0.2" />
        <circle cx="30" cy="350" r="2" fill="#ff7b00" opacity="0.2" />
        <circle cx="380" cy="50" r="3" fill="#ff7b00" opacity="0.15" />
      </svg>
    </div>
  );
}
