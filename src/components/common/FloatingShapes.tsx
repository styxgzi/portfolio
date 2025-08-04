'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  type: 'triangle' | 'circle' | 'square' | 'hexagon';
  color: string;
}

const FloatingShapes: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create initial shapes
    const initialShapes: Shape[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      rotation: Math.random() * 360,
      speed: Math.random() * 0.5 + 0.1,
      type: ['triangle', 'circle', 'square', 'hexagon'][Math.floor(Math.random() * 4)] as Shape['type'],
      color: [
        'rgba(139, 92, 246, 0.1)',
        'rgba(80, 200, 255, 0.1)',
        'rgba(255, 255, 255, 0.05)',
        'rgba(236, 72, 153, 0.1)',
      ][Math.floor(Math.random() * 4)],
    }));

    setShapes(initialShapes);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      setShapes(prev => 
        prev.map(shape => ({
          ...shape,
          rotation: shape.rotation + shape.speed,
          x: shape.x + Math.sin(shape.rotation * 0.01) * 0.1,
          y: shape.y + Math.cos(shape.rotation * 0.01) * 0.1,
        }))
      );
    };

    const interval = setInterval(animate, 50);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const renderShape = (shape: Shape) => {
    const mouseInfluence = 0.3;
    const influencedX = shape.x + (mousePosition.x - 50) * mouseInfluence * 0.1;
    const influencedY = shape.y + (mousePosition.y - 50) * mouseInfluence * 0.1;

    const baseStyle = {
      position: 'absolute' as const,
      left: `${influencedX}%`,
      top: `${influencedY}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      transform: `rotate(${shape.rotation}deg)`,
      opacity: 0.6,
      transition: 'all 0.3s ease-out',
      pointerEvents: 'none' as const,
    };

    switch (shape.type) {
      case 'triangle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              background: shape.color,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
          />
        );
      case 'circle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              background: shape.color,
              borderRadius: '50%',
            }}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              background: shape.color,
              borderRadius: '8px',
            }}
          />
        );
      case 'hexagon':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              background: shape.color,
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)',
      }}
    >
      {shapes.map(renderShape)}
    </div>
  );
};

export default FloatingShapes; 