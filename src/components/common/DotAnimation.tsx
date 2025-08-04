'use client';

import React, { useEffect, useState, useRef } from 'react';

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
}

const DotAnimation: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Generate dots
    generateDots();

    // Handle window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      generateDots(); // Regenerate dots on resize
    };

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Start animation loop
    startAnimationLoop();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const generateDots = () => {
    const newDots: Dot[] = [];
    const spacing = 50; // Increased spacing between dots
    const jitter = 15; // More randomness

    // Calculate number of dots based on screen size
    const numCols = Math.ceil(window.innerWidth / spacing);
    const numRows = Math.ceil(window.innerHeight / spacing);

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        // Add some randomness to position
        const x = j * spacing + (Math.random() * jitter - jitter / 2);
        const y = i * spacing + (Math.random() * jitter - jitter / 2);
        
        // Random size between 1 and 2.5
        const size = Math.random() * 1.5 + 1;
        
        // Random opacity between 0.05 and 0.15 (more subtle)
        const opacity = Math.random() * 0.1 + 0.05;
        
        // Random speed for subtle movement
        const speed = Math.random() * 0.2 + 0.1;
        
        // Random direction (1 or -1)
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        newDots.push({
          id: i * numCols + j,
          x,
          y,
          size,
          opacity,
          speed,
          direction,
        });
      }
    }
    
    setDots(newDots);
  };
  
  const startAnimationLoop = () => {
    const animate = () => {
      setDots(prevDots => {
        return prevDots.map(dot => {
          // Calculate distance from mouse
          const dx = mousePosition.x - dot.x;
          const dy = mousePosition.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only affect dots within 100px of mouse
          const mouseInfluenceRadius = 100;
          let newOpacity = dot.opacity;
          
          if (distance < mouseInfluenceRadius) {
            // Increase opacity based on proximity to mouse
            const factor = 1 - distance / mouseInfluenceRadius;
            newOpacity = Math.min(0.3, dot.opacity + factor * 0.2);
          }
          
          // Subtle vertical movement
          let newY = dot.y + (dot.speed * dot.direction);
          
          // Wrap around if dot goes off screen
          if (newY > window.innerHeight) newY = 0;
          if (newY < 0) newY = window.innerHeight;
          
          return {
            ...dot,
            y: newY,
            opacity: newOpacity
          };
        });
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animationFrameId.current = requestAnimationFrame(animate);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: `rgba(255, 255, 255, ${dot.opacity})`,
            boxShadow: `0 0 ${dot.size * 1.5}px rgba(255, 255, 255, ${dot.opacity / 2})`,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      ))}
    </div>
  );
};

export default DotAnimation;