"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
} from "@/utils/motions/montion";

// Define slideInFromTop function
const slideInFromTop = (delay: number) => {
  return {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration: 0.5
      }
    }
  };
};
import { HiCommandLine, HiOutlineCommandLine } from "react-icons/hi2";
import { FaCode, FaBrain, FaLaptopCode, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

export default function SkillsHeader() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center px-4">
      {/* First Code-style Embed */}
      <motion.div
        variants={slideInFromTop(0.05)}
        className="flex flex-col space-y-1 py-3 px-4 sm:px-6 bg-gray-800/80 backdrop-blur-xl rounded-md border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 overflow-hidden max-w-full shadow-lg mb-8"
      >
        <code className="text-xs sm:text-sm font-mono text-white/80 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <span className="text-blue-400">import</span>
          <span className="text-blue-200">{'{'}</span>
          <span className="text-blue-300">Developer</span>
          <span className="text-blue-200">{'}'}</span>
          <span className="text-blue-400">from</span>
          <span className="text-blue-300">"@/portfolio"</span>
        </code>
        <code className="text-xs sm:text-sm font-mono text-white/80 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <span className="text-blue-400">const</span>
          <span className="text-blue-200">profile</span>
          <span className="text-white">=</span>
          <span className="text-blue-400">new</span>
          <span className="text-blue-300">Developer()</span>
        </code>
      </motion.div>
      
      {/* Connect Code-style Heading */}
      <motion.div
        variants={slideInFromTop(0.1)}
        className="flex flex-col space-y-1 py-3 px-4 sm:px-6 bg-gray-800/80 backdrop-blur-xl rounded-md border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 overflow-hidden max-w-full shadow-lg mb-8"
      >
        <code className="text-xs sm:text-sm font-mono text-white/80 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <span className="text-blue-400">const</span>
          <span className="text-blue-200">connect</span>
          <span className="text-white">=</span>
          <span className="text-blue-400">async</span>
          <span className="text-blue-300">()</span>
          <span className="text-white">{'=>'}</span>
          <span className="text-white">{'{'}</span>
        </code>
        <code className="text-xs sm:text-sm font-mono text-white/80 flex items-center gap-1 sm:gap-2 whitespace-nowrap pl-4">
          <span className="text-blue-300">Let's Connect & Collaborate</span>
        </code>
        <code className="text-xs sm:text-sm font-mono text-white/80 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <span className="text-white">{'}'}</span>
        </code>
      </motion.div>
      
      {/* Terminal-like Badge */}
      <motion.div
        variants={slideInFromTop(0.2)}
        className="flex flex-col space-y-1 py-3 px-4 sm:px-6 bg-gray-800/80 backdrop-blur-xl rounded-md border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 overflow-hidden max-w-full shadow-lg"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400"></div>
          </div>
          <span className="text-blue-300 text-xs font-mono">skills.sh</span>
          <div className="w-5"></div>
        </div>
        
        {/* Command Line */}
        <code className="text-xs sm:text-sm font-mono text-white/80 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <span className="text-blue-400">$</span>
          <span className="text-blue-300">./get_expertise</span>
          <span className="animate-pulse">_</span>
        </code>
        <code className="text-xs sm:text-sm font-mono text-white/80 flex items-center gap-1 sm:gap-2 whitespace-nowrap pl-4">
          <span className="text-blue-400">const</span>
          <span className="text-blue-200">expertise</span>
          <span className="text-white">=</span>
          <span className="text-blue-400">await</span>
          <span className="text-blue-300">getTechStack()</span>
          <span className="text-white">;</span>
        </code>
      </motion.div>

      {/* Let's Connect & Collaborate Heading */}
      <motion.h2 
        variants={slideInFromLeft(0.3)}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400 mt-8 mb-4 text-center"
      >
        Let's Connect & Collaborate
      </motion.h2>
      
      <motion.p 
        variants={slideInFromRight(0.5)}
        className="text-gray-300 text-center max-w-3xl mx-auto mb-6"
      >
        I'm always open to new opportunities, collaborations, and interesting projects. 
        Feel free to reach out through any of the channels below!
      </motion.p>
      
      {/* Social Links */}
      <motion.div 
        variants={slideInFromTop(0.7)}
        className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8"
      >
        {/* GitHub */}
        <a 
          href="https://github.com/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800/80 px-4 py-3 rounded-lg border border-blue-500/30 hover:border-blue-400/70 transition-all duration-300 group"
        >
          <FaGithub className="text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-gray-300 group-hover:text-white transition-colors">GitHub</span>
        </a>
        
        {/* LinkedIn */}
        <a 
          href="https://linkedin.com/in/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800/80 px-4 py-3 rounded-lg border border-blue-500/30 hover:border-blue-400/70 transition-all duration-300 group"
        >
          <FaLinkedin className="text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-gray-300 group-hover:text-white transition-colors">LinkedIn</span>
        </a>
        
        {/* Twitter */}
        <a 
          href="https://twitter.com/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800/80 px-4 py-3 rounded-lg border border-blue-500/30 hover:border-blue-400/70 transition-all duration-300 group"
        >
          <FaTwitter className="text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-gray-300 group-hover:text-white transition-colors">Twitter</span>
        </a>
        
        {/* Email */}
        <a 
          href="mailto:your.email@example.com" 
          className="flex items-center gap-2 bg-gray-800/80 px-4 py-3 rounded-lg border border-blue-500/30 hover:border-blue-400/70 transition-all duration-300 group"
        >
          <FaEnvelope className="text-blue-400 group-hover:text-blue-300 transition-colors" />
          <span className="text-gray-300 group-hover:text-white transition-colors">Email</span>
        </a>
      </motion.div>
    </div>
  );
}
