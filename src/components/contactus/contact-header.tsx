"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motions/montion";
import { HiCommandLine, HiOutlineCode, HiChatBubbleLeftRight } from "react-icons/hi2";
import { TypeAnimation } from 'react-type-animation';
import { PiCodeBlock } from "react-icons/pi";
import { FiMessageSquare } from "react-icons/fi";

export default function ContactHeader() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center px-4 relative">
      {/* Code Bar */}
      <motion.div
        variants={slideInFromTop}
        className="flex items-center space-x-2 py-1.5 px-4 sm:px-6 bg-black/50 rounded-full border border-white/20 hover:border-white/50 transition-colors duration-300 overflow-x-auto max-w-full backdrop-blur-sm shadow-lg shadow-white/5"
      >
        <div className="flex items-center gap-1.5 mr-1">
          <span className="w-2 h-2 rounded-full bg-white/30"></span>
          <span className="w-2 h-2 rounded-full bg-white/30"></span>
          <span className="w-2 h-2 rounded-full bg-white/30"></span>
        </div>
        <PiCodeBlock className="text-white h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
        <code className="text-xs sm:text-sm font-mono text-white flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <span className="text-white/80">const</span>
          <span className="text-white">connect</span>
          <span className="text-white/80">=</span>
          <span className="text-white/80">async</span>
          <span className="text-white/80">()</span>
          <span className="text-white/80">{" => {"}</span>
        </code>
      </motion.div>

      {/* Main Title */}
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="relative text-2xl sm:text-3xl md:text-5xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-center text-white px-2"
      >
        <span className="relative">
          Let's Connect & Collaborate
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0"></div>
        </span>
      </motion.div>

      {/* Animated Code Line */}
      <motion.div
        variants={slideInFromRight(0.5)}
        className="font-mono text-sm sm:text-base md:text-lg text-white text-center flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-sm"
      >
        <FiMessageSquare className="text-white/70" />
        <TypeAnimation
          sequence={[
            'await sendMessage({ priority: "high" })',
            1000,
            'await startConversation({ topic: "collaboration" })',
            1000,
            'await scheduleCall({ availability: "flexible" })',
            1000,
          ]}
          wrapper="span"
          speed={50}
          className="text-white text-xs sm:text-sm md:text-base truncate"
          repeat={Infinity}
        />
      </motion.div>
      
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-white/10 rounded-full opacity-20"></div>
      <div className="absolute bottom-1/3 left-1/3 w-24 h-24 border border-white/10 rounded-full opacity-10"></div>
    </div>
  );
}