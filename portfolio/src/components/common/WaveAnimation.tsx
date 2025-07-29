'use client';

import React from 'react';

const WaveAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-20 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(80, 200, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 */}
        <path
          d="M0,60 C300,20 600,100 1200,60 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="M0,60 C300,20 600,100 1200,60 L1200,120 L0,120 Z;
                    M0,60 C300,100 600,20 1200,60 L1200,120 L0,120 Z;
                    M0,60 C300,20 600,100 1200,60 L1200,120 L0,120 Z"
          />
        </path>
        
        {/* Wave 2 */}
        <path
          d="M0,80 C300,40 600,120 1200,80 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="M0,80 C300,40 600,120 1200,80 L1200,120 L0,120 Z;
                    M0,80 C300,120 600,40 1200,80 L1200,120 L0,120 Z;
                    M0,80 C300,40 600,120 1200,80 L1200,120 L0,120 Z"
          />
        </path>
        
        {/* Wave 3 */}
        <path
          d="M0,100 C300,60 600,140 1200,100 L1200,120 L0,120 Z"
          fill="url(#waveGradient)"
          opacity="0.2"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="M0,100 C300,60 600,140 1200,100 L1200,120 L0,120 Z;
                    M0,100 C300,140 600,60 1200,100 L1200,120 L0,120 Z;
                    M0,100 C300,60 600,140 1200,100 L1200,120 L0,120 Z"
          />
        </path>
      </svg>
    </div>
  );
};

export default WaveAnimation; 