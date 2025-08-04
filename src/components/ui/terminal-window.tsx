'use client';

import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  showPrompt?: boolean;
  promptText?: string;
  maximized?: boolean;
}

const TerminalWindow: React.FC<TerminalWindowProps> = ({
  children,
  title = 'terminal',
  className = '',
  showPrompt = true,
  promptText = '~/portfolio $',
  maximized = false,
}) => {
  const [isMaximized, setIsMaximized] = useState(maximized);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-6xl mx-auto rounded-lg overflow-hidden border border-gray-700 shadow-lg ${isMaximized ? 'fixed inset-4 z-50' : ''} ${className}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div 
            className="w-3 h-3 rounded-full bg-blue-500 cursor-pointer"
            onClick={() => setIsMaximized(!isMaximized)}
          ></div>
        </div>
        <div className="text-xs text-gray-400 font-mono">{title}</div>
        <div className="w-16"></div>
      </div>

      {/* Terminal Content */}
      <div className="bg-black p-4 font-mono text-sm">
        {showPrompt && (
          <div className="flex items-start mb-2">
            <span className="text-blue-400 mr-2">{promptText}</span>
            <span className="text-white/80 animate-pulse">_</span>
          </div>
        )}
        <div className="text-gray-300">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(TerminalWindow);