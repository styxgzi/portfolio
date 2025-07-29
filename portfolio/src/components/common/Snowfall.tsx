'use client';

import React, { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Create initial snowflakes
    const initialSnowflakes: Snowflake[] = Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1.5,
      speed: Math.random() * 3 + 0.8,
      opacity: Math.random() * 0.9 + 0.3,
    }));

    setSnowflakes(initialSnowflakes);

    // Animation loop
    const animate = () => {
      setSnowflakes(prev => 
        prev.map(snowflake => ({
          ...snowflake,
          y: snowflake.y + snowflake.speed,
          x: snowflake.x + (Math.sin(snowflake.y * 0.01) * 0.5),
        })).map(snowflake => 
          snowflake.y > window.innerHeight 
            ? { ...snowflake, y: -10, x: Math.random() * window.innerWidth }
            : snowflake
        )
      );
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(1); }
        }
      `}</style>
      {snowflakes.map(snowflake => (
        <div
          key={snowflake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${snowflake.x}px`,
            top: `${snowflake.y}px`,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            opacity: snowflake.opacity,
            filter: 'blur(0.8px)',
            boxShadow: `0 0 ${snowflake.size * 0.8}px rgba(255, 255, 255, 0.9)`,
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall; 