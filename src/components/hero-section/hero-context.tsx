"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
} from "@/utils/motions/montion";
import Image from "next/image";
import LeftSideHero from "./widgets/leftside.hero";
import { FiArrowDown } from "react-icons/fi";
import { FaCode, FaLaptopCode, FaServer, FaDatabase } from "react-icons/fa";

const HeroContent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  const rafRef = useRef<number | null>(null);
  
  // Optimized mouse move handler with useCallback for better performance
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current !== null) return;
    
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
      rafRef.current = null;
    });
  }, []);
  
  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // Use useEffect to handle client-side only rendering for mouse position elements
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Professional blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-950 to-gray-900" />
        
        {/* Subtle blue glow - Only render on client side to prevent hydration mismatch */}
        {isMounted && (
          <motion.div 
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 blur-[120px]"
            style={{
              left: `calc(${mousePosition.x * 100}% - 250px)`,
              top: `calc(${mousePosition.y * 100}% - 250px)`,
              opacity: 0.3,
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
      
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row-reverse items-center justify-between max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24 min-h-[calc(100vh-4rem)] gap-6 sm:gap-8 lg:gap-10"
      >
        <LeftSideHero />
        
        {/* Left Side - Visual Element (was right side before) */}
        <motion.div 
          variants={slideInFromLeft(0.8)}
          className="hidden lg:flex w-1/2 items-center justify-center"
        >
          <div className="relative w-full max-w-md">
            {/* 3D Geometric Showcase */}
            <div className="relative h-[400px] w-[400px]">
              {/* Center element */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                animate={{ 
                  rotateY: 360,
                  rotateX: [0, 10, 0, -10, 0],
                }}
                transition={{ 
                  rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 backdrop-blur-md border border-blue-400/20">
                  <FaCode className="text-white text-3xl" />
                </div>
              </motion.div>
              
              {/* Floating 3D elements - Client-side only rendering to prevent hydration issues */}
              {isMounted && [FaLaptopCode, FaServer, FaDatabase].map((Icon, index) => {
                const angle = (index * 2 * Math.PI) / 3;
                const radius = 150;
                
                // Pre-calculate positions to avoid hydration mismatches
                const xPos = Math.cos(angle) * radius;
                const yPos = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translateX(${xPos}px) translateY(${yPos}px) translateZ(0px)`,
                    }}
                    animate={{
                      transform: [
                        `translateX(${xPos}px) translateY(${yPos}px) translateZ(0px)`,
                        `translateX(${Math.cos(angle + 0.1) * radius}px) translateY(${Math.sin(angle + 0.1) * radius}px) translateZ(0px)`,
                        `translateX(${xPos}px) translateY(${yPos}px) translateZ(0px)`,
                      ],
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      // Use reduced motion preference for accessibility and performance
                      reducedMotion: "user",
                    }}
                  >
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 backdrop-blur-md border border-blue-400/20 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <Icon className="text-white text-2xl" />
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Simplified geometric background elements for better performance */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Using CSS animations instead of framer-motion for better performance */}
                <div 
                  className="w-[300px] h-[300px] border border-blue-500/20 rounded-full animate-spin-slow"
                  style={{ animationDuration: '30s' }}
                />
                <div 
                  className="absolute w-[200px] h-[200px] border border-blue-400/20 rounded-full animate-spin-reverse"
                  style={{ animationDuration: '25s' }}
                />
                
                {/* Simplified hexagon shape */}
                <div
                  className="absolute w-[250px] h-[250px] opacity-30 animate-spin-slow"
                  style={{ animationDuration: '40s' }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <polygon 
                      points="50,3 100,28 100,72 50,97 3,72 3,28" 
                      fill="none" 
                      stroke="rgba(59, 130, 246, 0.2)" 
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        className="hidden"
      >
      </motion.div>
    </div>
  );
};

export default HeroContent;
