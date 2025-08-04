"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUpRight, HiEye, HiClock } from "react-icons/hi2";
import { FaGithub, FaExternalLinkAlt, FaLaptopCode, FaRobot, FaMobileAlt, FaTerminal } from "react-icons/fa";
import { SiNetlify, SiVercel } from "react-icons/si";
import { PiLightningFill, PiCodeSimpleBold } from "react-icons/pi";
import { cn } from "@/utils/cn";
import TerminalWindow from "@/components/ui/terminal-window";


interface Itech {
  title: string;
  color: string;
}

interface ProjectCardProps {
  title: string;
  category: string;
  tech: Itech[];
  img: any;
  githubLink?: string;
  liveLink?: string;
  linkTitle?: string;
  des: string;
  time: number;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  des,
  tech,
  img,
  category,
  githubLink,
  liveLink,
  linkTitle,
  time,
  index,
  featured = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Use a professional blue color for project titles
  const titleColor = '#3b82f6'; // blue-500


  // Determine hosting platform icon
  const getHostingIcon = () => {
    if (liveLink?.includes('vercel')) return <SiVercel className="w-3.5 h-3.5" />;
    if (liveLink?.includes('netlify')) return <SiNetlify className="w-3.5 h-3.5" />;
    return <FaExternalLinkAlt className="w-3 h-3" />;
  };

  // Format time (months) to readable format
  const formatTime = (months: number) => {
    if (months < 1) return `${Math.round(months * 30)} days`;
    if (months === 1) return "1 month";
    return `${months} months`;
  };

  // Get category icon
  const getCategoryIcon = () => {
    switch (category?.toLowerCase()) {
      case 'website':
        return <FaLaptopCode className="w-3.5 h-3.5" />;
      case 'app':
        return <FaMobileAlt className="w-3 h-3" />;
      default:
        return <FaRobot className="w-3.5 h-3.5" />;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden transition-all duration-300 backdrop-blur-sm",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      <TerminalWindow 
        title={`cat ./projects/${title.toLowerCase().replace(/\s+/g, '-')}.md`}
        maximized={isHovered}
      >
      {/* Terminal content */}
      <div className="font-mono text-sm">
        {/* Featured Badge as a comment */}
        {featured && (
          <div className="text-gray-300 mb-2 bg-gray-800/80 px-3 py-1 rounded-lg border border-blue-500/30 inline-block">
            <span className="text-blue-400"># </span>
            <span className="text-blue-300">FEATURED</span>
            <span> project - high priority</span>
          </div>
        )}
        
        {/* Image as ASCII art representation */}
        <div className="border border-gray-700 mb-4 p-2 bg-black/30 overflow-hidden">
          <div className="relative aspect-video w-full max-h-[150px] overflow-hidden">
            <Image
              src={img}
              alt={title}
              className="object-cover w-full h-full opacity-70 filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={featured}
              loading={featured ? "eager" : "lazy"}
              quality={70}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </div>
        </div>
        
        {/* Project title as a command output */}
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-1 bg-gray-800/80 px-3 py-1 rounded-lg border border-blue-500/30">
            <span className="text-blue-400">$</span>
            <span className="text-slate-300">echo $PROJECT_NAME</span>
          </div>
          <div className="pl-4 font-bold bg-gray-800/70 px-3 py-2 rounded-lg border border-blue-500/20" style={{ color: titleColor }}>
            {title}
          </div>
        </div>
        
        {/* Description as command output */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1 bg-gray-800/80 px-3 py-1 rounded-lg border border-blue-500/30">
            <span className="text-blue-400">$</span>
            <span className="text-slate-300">cat description.txt</span>
          </div>
          <div className="pl-4 text-gray-300 whitespace-pre-wrap bg-gray-800/70 px-3 py-2 rounded-lg border border-blue-500/20">
            {des}
          </div>
        </div>
        
        {/* Tech stack as ls command */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1 bg-gray-800/80 px-3 py-1 rounded-lg border border-blue-500/30">
            <span className="text-blue-400">$</span>
            <span className="text-slate-300">ls -la ./tech</span>
          </div>
          <div className="pl-4 flex flex-wrap gap-2 mt-1 bg-gray-800/70 px-3 py-2 rounded-lg border border-blue-500/20">
            {tech && tech.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs inline-flex items-center gap-1 px-2 py-1 bg-gray-800 rounded border border-blue-500/20"
              >
                <span className="text-blue-300">-rw-r--r--</span>
                <span className="font-bold text-slate-200">{tech.title}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Links as commands */}
        <div className="flex flex-col gap-2">
          {/* Category as a variable */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1 bg-gray-800/80 px-3 py-1 rounded-lg border border-blue-500/30">
              <span className="text-blue-400">$</span>
              <span className="text-slate-300">echo $CATEGORY</span>
            </div>
            <div className="pl-4 flex items-center gap-1 bg-gray-800/70 px-3 py-2 rounded-lg border border-blue-500/20">
              <span className="text-blue-300">{getCategoryIcon()}</span>
              <span className="text-slate-300">{category}</span>
            </div>
          </div>
          
          {/* Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-gray-800/70 px-3 py-2 rounded-lg border border-blue-500/20">
            {githubLink && (
              <div className="flex items-center gap-2">
                <span className="text-blue-400">$</span>
                <Link href={githubLink} target="_blank" className="text-blue-300 hover:underline hover:text-blue-200 transition-colors">
                  git clone {githubLink.replace('https://github.com/', '')}
                </Link>
              </div>
            )}
            
            {liveLink && (
              <div className="flex items-center gap-2">
                <span className="text-blue-400">$</span>
                <Link href={liveLink} target="_blank" className="text-blue-300 hover:underline hover:text-blue-200 transition-colors">
                  open {liveLink.replace(/https?:\/\//, '')}
                </Link>
              </div>
            )}
          </div>
          
          {/* Time as a timestamp */}
          {time > 0 && (
            <div className="text-slate-300 mt-2 text-xs bg-gray-800/80 px-3 py-1 rounded-lg border border-blue-500/30 inline-block">
              <span className="text-blue-400"># </span>
              <span>Development time: {formatTime(time)}</span>
            </div>
          )}
        </div>

        {/* Blinking cursor */}
        <div className="mt-2 flex items-center">
          <span className="text-blue-400">$ </span>
          <span className="text-white">_</span>
          <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse"></span>
        </div>
      </div>
    </TerminalWindow>
    </motion.div>
  );
}
