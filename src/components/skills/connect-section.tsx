"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motions/montion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

const ConnectSection = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="w-full max-w-6xl mx-auto mb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Connect Header */}
      <motion.div
        variants={slideInFromLeft(0.3)}
        className="flex items-center gap-3 mb-6 bg-gray-800/80 px-4 py-2 rounded-lg border border-blue-500/30 w-fit"
      >
        <span className="text-blue-400 font-mono">const</span>
        <span className="text-white font-mono">connect</span>
        <span className="text-blue-300 font-mono">=</span>
        <span className="text-blue-400 font-mono">async</span>
        <span className="text-blue-300 font-mono">()</span>
        <span className="text-white font-mono">=&gt;</span>
        <span className="text-blue-300 font-mono">{"{"};</span>
      </motion.div>

      {/* Connect Content */}
      <motion.div
        variants={slideInFromRight(0.5)}
        className="bg-gray-800/80 px-6 py-5 rounded-lg border border-blue-500/30"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Let's Connect & Collaborate</h3>
        
        <p className="text-slate-300 mb-6">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out through any of these platforms!
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* GitHub */}
          <Link 
            href="https://github.com/styxgzi" 
            target="_blank"
            className="flex items-center gap-3 bg-gray-900/80 hover:bg-gray-900 px-4 py-3 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300">
              <FaGithub className="text-blue-400 text-xl" />
            </div>
            <span className="text-slate-200 group-hover:text-white transition-colors">GitHub</span>
          </Link>
          
          {/* LinkedIn */}
          <Link 
            href="https://www.linkedin.com/in/sahil-goswami-57b00232a/" 
            target="_blank"
            className="flex items-center gap-3 bg-gray-900/80 hover:bg-gray-900 px-4 py-3 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300">
              <FaLinkedin className="text-blue-400 text-xl" />
            </div>
            <span className="text-slate-200 group-hover:text-white transition-colors">LinkedIn</span>
          </Link>
          
          {/* Twitter */}
          <Link 
            href="https://x.com/styxgzi" 
            target="_blank"
            className="flex items-center gap-3 bg-gray-900/80 hover:bg-gray-900 px-4 py-3 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300">
              <FaTwitter className="text-blue-400 text-xl" />
            </div>
            <span className="text-slate-200 group-hover:text-white transition-colors">Twitter</span>
          </Link>
          
          {/* Email */}
          <Link 
            href="mailto:contact@example.com" 
            className="flex items-center gap-3 bg-gray-900/80 hover:bg-gray-900 px-4 py-3 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300">
              <FaEnvelope className="text-blue-400 text-xl" />
            </div>
            <span className="text-slate-200 group-hover:text-white transition-colors">Email</span>
          </Link>
        </div>
      </motion.div>
      
      {/* Closing bracket */}
      <motion.div
        variants={slideInFromLeft(0.7)}
        className="flex items-center gap-3 mt-2 bg-gray-800/80 px-4 py-2 rounded-lg border border-blue-500/30 w-fit ml-auto"
      >
        <span className="text-blue-300 font-mono">{"}"};</span>
      </motion.div>
    </motion.div>
  );
};

export default ConnectSection;