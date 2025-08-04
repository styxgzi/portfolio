"use client";
import React, { useState, useRef, useEffect } from "react";
import ProjectCard from "./project-card";
import { projectData } from "@/utils/constants/projects-tech";
import ProjectHeader from "./project-header";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { HiAdjustmentsHorizontal, HiArrowPath, HiCubeTransparent } from "react-icons/hi2";
import { FaLaptopCode, FaMobileAlt, FaRobot } from "react-icons/fa";
import { PiSparkle } from "react-icons/pi";
import TerminalWindow from "@/components/ui/terminal-window";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Define main project categories with icons
  const projectCategories = [
    { id: "all", label: "All Projects", icon: <HiAdjustmentsHorizontal /> },
    { id: "website", label: "Websites", icon: <FaLaptopCode /> },
    { id: "app", label: "Applications", icon: <FaMobileAlt /> },
    { id: "ai/ml", label: "AI/ML", icon: <FaRobot /> },
    { id: "featured", label: "Featured", icon: <PiSparkle /> }
  ];

  // Get unique tech categories from projects
  const techCategories = ["all", ...Array.from(new Set(projectData.flatMap(project =>
    project.tech.map(t => t.title.toLowerCase())

  )))].slice(0, 6); // Limit to 6 categories for UI

  const filteredProjects = filter === "all"
    ? projectData
    : filter === "featured"
    ? projectData.filter(project => project.featured)
    : projectData.filter(project =>
      project.category?.toLowerCase() === filter ||
      project.tech.some(tech => tech.title.toLowerCase() === filter)
    );

  const handleFilterChange = (category: string) => {
    setIsLoading(true);
    setFilter(category);
    setTimeout(() => setIsLoading(false), 600); // Simulate loading for 600ms
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="flex flex-col items-center justify-center py-20 min-h-screen relative z-50 px-4 sm:px-6 lg:px-8"
        id="projects"
      >
        <TerminalWindow title="projects.sh" promptText="~/portfolio/projects $">

      {/* Terminal Command Line */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 mt-4">
        <div className="font-mono text-sm mb-4 bg-gray-800/80 p-3 rounded-lg border border-blue-500/30">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">$</span>
            <span className="text-blue-300">find</span>
            <span className="text-slate-300">./projects</span>
            <span className="text-blue-300">-type</span>
            <span className="text-slate-300">f</span>
            <span className="text-blue-300">-name</span>
            <span className="text-slate-300">"*{filter === 'all' ? '' : `.${filter}`}*"</span>
          </div>
        </div>
        
        {/* Filter Controls - Terminal Style */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-900/50 p-2 rounded-md border border-gray-700">
          {/* Main Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {projectCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 text-xs rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 font-mono ${filter === category.id
                  ? "bg-gray-800 text-white border border-blue-500/50"
                  : "bg-gray-900 text-gray-300 border border-gray-800 hover:border-blue-500/30"
                  }`}
              >
                <span className={filter === category.id ? "text-blue-400" : "text-gray-400"}>{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Tech Filters */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {techCategories.filter(cat => cat !== "all").map((tech) => (
              <motion.button
                key={tech}
                onClick={() => handleFilterChange(tech)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-2 py-1 text-xs rounded-md transition-all whitespace-nowrap font-mono ${filter === tech
                  ? "bg-gray-800 text-white border border-blue-500/50"
                  : "bg-gray-900 text-gray-300 border border-gray-800 hover:border-blue-500/30"
                  }`}
              >
                {tech.charAt(0).toUpperCase() + tech.slice(1)}
              </motion.button>
            ))}

            <motion.button
              onClick={() => handleFilterChange("all")}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-300 transition-colors flex items-center gap-1 text-xs px-2 py-1 bg-gray-900 rounded-md border border-gray-800 hover:border-gray-700 font-mono"
            >
              <HiArrowPath className="w-3 h-3" />
              clear
            </motion.button>
          </div>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="font-mono text-sm text-gray-400 mt-2">
          <div className="flex items-start gap-2">
            <span>Found</span>
            <span className="text-yellow-400">{filteredProjects.length}</span>
            <span>items</span>
          </div>
        </div>
      </div>

      {/* Projects Grid - Terminal Style */}
      <div className="h-max w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900/30 border border-gray-800 rounded-md p-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
            >
              {/* Generate skeleton cards based on previous filter count */}
              {Array.from({ length: Math.min(filteredProjects.length || 6, 6) }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
            >
              {filteredProjects.map((data: any, index: number) => (
                <motion.div
                  key={data.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="h-full"
                >
                  <ProjectCard
                    {...data}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProjects.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 font-mono"
          >
            <div className="text-red-400 mb-2">Error: No matching files found</div>
            <div className="text-gray-400 mb-4">Try a different search pattern</div>
            <button
              onClick={() => handleFilterChange("all")}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors border border-gray-700 font-mono"
            >
              $ find ./projects -type f
            </button>
          </motion.div>
        )}
      </div>
      
      <div className="mt-6 w-full">
        <div className="font-mono text-gray-400 text-sm">
          <div className="flex gap-2">
            <span className="text-blue-400">$</span>
            <span className="text-white">_</span>
          </div>
        </div>
      </div>
      </TerminalWindow>

      {/* Additional background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.3, 0.2],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-white/20 rounded-full" 
      />
    </section>
    </>
  );
};

// Skeleton loading component for project cards
const ProjectCardSkeleton = () => {
  return (
    <div className="bg-black/50 rounded-xl overflow-hidden border border-white/10 h-[400px] relative shadow-lg shadow-white/5 hover:shadow-white/10 transition-all backdrop-blur-sm">
      {/* Image skeleton */}
      <div className="relative aspect-video overflow-hidden bg-black/50">
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 skeleton-loading" />
      </div>

      {/* Content skeleton */}
      <div className="p-6">
        {/* Title skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-white/5 rounded-md w-2/3 skeleton-loading" />
          <div className="h-8 w-8 bg-white/5 rounded-full skeleton-loading" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-white/5 rounded-md w-full skeleton-loading" />
          <div className="h-4 bg-white/5 rounded-md w-5/6 skeleton-loading" />
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-white/5 rounded-full w-16 skeleton-loading" />
          ))}
        </div>

        {/* Links skeleton */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex gap-3">
            <div className="h-4 bg-white/5 rounded-md w-16 skeleton-loading" />
            <div className="h-4 bg-white/5 rounded-md w-16 skeleton-loading" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
