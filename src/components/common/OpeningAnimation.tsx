'use client';

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const PARTICLE_COUNT = 24;
const ANIMATION_DURATION = 500; // ms before disperse
const PARTICLE_LIFETIME = 400; // ms for particles to fade

const OpeningAnimation: React.FC = () => {
  const [disperse, setDisperse] = useState(false);
  const [hide, setHide] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Generate random directions for particles only on the client
  const particles = useMemo(() => {
    if (!hasMounted) return [];
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const angle = (2 * Math.PI * i) / PARTICLE_COUNT;
      const distance = 80 + Math.random() * 40; // px
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      return { x, y };
    });
  }, [hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    // Always trigger timers immediately on mount
    setDisperse(false);
    setHide(false);
    const disperseTimer = setTimeout(() => setDisperse(true), ANIMATION_DURATION);
    const hideTimer = setTimeout(() => setHide(true), ANIMATION_DURATION + PARTICLE_LIFETIME);
    return () => {
      clearTimeout(disperseTimer);
      clearTimeout(hideTimer);
    };
  }, [hasMounted]);

  if (!hasMounted) return null;

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "#0a0e1a",
        display: hide ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        opacity: hide ? 0 : 1,
      }}
    >
      {/* Floating background elements */}
      {!hide && !disperse && (
        <>
          <div style={{
            position: "absolute",
            top: "20%",
            left: "15%",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
            animation: "float 4s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            top: "70%",
            right: "20%",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(80, 200, 255, 0.4) 0%, transparent 70%)",
            animation: "float 3s ease-in-out infinite reverse",
          }} />
          <div style={{
            position: "absolute",
            bottom: "30%",
            left: "25%",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
            animation: "float 5s ease-in-out infinite",
          }} />
        </>
      )}

      {/* Main sphere (hide when dispersing) */}
      <div
        style={{
          position: "absolute",
          width: disperse ? 0 : 140,
          height: disperse ? 0 : 140,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fff 40%, #50c8ff 70%, #8b5cf6 100%)",
          boxShadow: "0 0 100px 30px #fff8, 0 0 150px 50px #50c8ff44, 0 0 200px 60px #8b5cf644",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 42,
          color: "#0a0e1a",
          letterSpacing: 3,
          textTransform: 'uppercase',
          fontFamily: 'IBM Plex Sans, Inter, Arial, sans-serif',
          transform: disperse
            ? "scale(0.7) translateY(-40px) rotate(180deg)"
            : "scale(1) translateY(0) rotate(0deg)",
          transition:
            "all 0.5s cubic-bezier(0.22, 1, 0.36, 1), width 0.3s, height 0.3s, transform 0.5s",
          opacity: disperse ? 0 : 1,
          animation: disperse ? "none" : "pulse-glow 2s ease-in-out infinite alternate",
        }}
      >
        <div style={{
          position: "absolute",
          inset: "-20px",
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, #fff, #50c8ff, #8b5cf6, #fff)",
          animation: "rotate 3s linear infinite",
          opacity: 0.3,
        }} />
        <div style={{
          position: "absolute",
          inset: "0",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fff 40%, #50c8ff 70%, #8b5cf6 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}>
          styxzi
        </div>
      </div>

      {/* Particles */}
      {disperse &&
        particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 20 + Math.random() * 10,
              height: 20 + Math.random() * 10,
              borderRadius: "50%",
              background: `linear-gradient(135deg, #fff 40%, #50c8ff 70%, #8b5cf6 100%)`,
              boxShadow: `0 0 ${20 + Math.random() * 15}px 3px #fff8, 0 0 ${30 + Math.random() * 20}px 8px #50c8ff44, 0 0 ${40 + Math.random() * 25}px 12px #8b5cf644`,
              transform: `translate(-50%, -50%) translate(0px, 0px)` + (disperse ? ` scale(1)` : ""),
              animation: `disperse-particle-${i} ${PARTICLE_LIFETIME}ms forwards`,
              opacity: 0.9,
              pointerEvents: "none",
            }}
          />
        ))}
      {/* Particle keyframes (client only) */}
      <style>{`
        @keyframes pulse-glow {
          0% { 
            box-shadow: 0 0 100px 30px #fff8, 0 0 150px 50px #50c8ff44, 0 0 200px 60px #8b5cf644;
            transform: scale(1) translateY(0) rotate(0deg);
          }
          100% { 
            box-shadow: 0 0 120px 40px #fff8, 0 0 180px 60px #50c8ff44, 0 0 240px 80px #8b5cf644;
            transform: scale(1.05) translateY(0) rotate(0deg);
          }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
        }
        
        ${particles
          .map(
            (p, i) => `@keyframes disperse-particle-${i} {
              0% { opacity: 0.85; transform: translate(-50%, -50%) scale(1); }
              80% { opacity: 0.7; transform: translate(-50%, -50%) translate(${p.x}px, ${p.y}px) scale(1.1); }
              100% { opacity: 0; transform: translate(-50%, -50%) translate(${p.x}px, ${p.y}px) scale(0.7); }
            }`
          )
          .join("\n")}
      `}</style>
    </div>
  );
};

export default OpeningAnimation; 