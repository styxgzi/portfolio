'use client';

import React, { useEffect, useRef, useState } from "react";

const CursorGlow: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isButtonHover, setIsButtonHover] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        cursorRef.current.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0)`;
      }
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, .blend-cursor, .btn, .Button")) {
        setIsButtonHover(true);
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, .blend-cursor, .btn, .Button")) {
        setIsButtonHover(false);
      }
    };
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

    // Only render the glowing circle (no text line)
  return (
    <>
      {/* Cursor trail */}
      <div
        style={{
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          zIndex: 99998,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.6)",
          boxShadow: "0 0 20px 4px rgba(139, 92, 246, 0.4)",
          filter: "blur(1px)",
          opacity: 0.7,
          transition: "all 0.1s ease-out",
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
        }}
      />
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        style={{
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: isButtonHover ? 72 : 48,
          height: isButtonHover ? 72 : 48,
          zIndex: 99999,
          borderRadius: "50%",
          background: isButtonHover
            ? "rgba(255,255,255,0.32)"
            : "rgba(255,255,255,0.18)",
          border: isButtonHover ? "2.5px solid #fff" : "1.5px solid #fff8",
          boxShadow: isButtonHover
            ? "0 0 0 32px rgba(255,255,255,0.12), 0 0 48px 12px rgba(255,255,255,0.18)"
            : "0 0 0 12px rgba(255,255,255,0.10)",
          filter: isButtonHover ? "blur(2px)" : "blur(6px)",
          opacity: isButtonHover ? 0.85 : 0.9,
          transition:
            "width 0.22s cubic-bezier(0.22, 1, 0.36, 1), height 0.22s cubic-bezier(0.22, 1, 0.36, 1), background 0.22s, border 0.22s, box-shadow 0.22s, filter 0.22s, opacity 0.22s, transform 0.13s cubic-bezier(0.22, 1, 0.36, 1)",
          mixBlendMode: isButtonHover ? "screen" : "lighten",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner dot for clarity */}
        <div
          style={{
            width: isButtonHover ? 18 : 12,
            height: isButtonHover ? 18 : 12,
            borderRadius: '50%',
            background: '#fff',
            opacity: isButtonHover ? 0.98 : 0.92,
            transition: 'all 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow: isButtonHover ? '0 0 12px 4px #fff8' : '0 0 6px 2px #fff6',
          }}
        />
      </div>
    </>
  );
};

export default CursorGlow; 