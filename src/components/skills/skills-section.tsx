"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motions/montion";
import { LibrariesAndFrameworks, ProgrammingLanguages, DeveloperTools } from "@/utils/constants/constants";
import SkillsHeader from "./skills-header";
import SkillCard from "./skills-card";
import TerminalWindow from "@/components/ui/terminal-window";


const Skills = () => {
  return (
    <>
      <section
        id="skills"
        className="flex flex-col items-center py-16 sm:py-20 md:py-24 relative z-50 min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
      <TerminalWindow title="skills.sh" promptText="~/portfolio/skills $">
      
      {/* Skills Grid Container */}
      <div className="w-full max-w-6xl mx-auto grid gap-8 sm:gap-10 lg:gap-12 mt-6">
        {/* Frameworks/Libraries */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          className="skill-category-container relative"
        >
          <div className="flex items-center gap-3 mb-5 sm:mb-6 bg-gray-800/80 px-4 py-2 rounded-lg border border-blue-500/30 w-fit">
            <span className="text-gray-400 font-mono">$</span>
            <span className="text-blue-500 font-mono">ls</span>
            <span className="text-gray-400 font-mono">-la</span>
            <span className="text-blue-400 font-mono">./frameworks-libraries</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {LibrariesAndFrameworks.map((skill, index) => (
              <SkillCard key={skill.id} {...skill} />
            ))}
          </div>

        </motion.div>
        
        {/* Languages & Others */}
        <motion.div
          variants={slideInFromRight(0.3)}
          className="skill-category-container relative"
        >
          <div className="flex items-center gap-3 mb-5 sm:mb-6 bg-gray-800/80 px-4 py-2 rounded-lg border border-blue-500/30 w-fit">
            <span className="text-gray-400 font-mono">$</span>
            <span className="text-blue-500 font-mono">ls</span>
            <span className="text-gray-400 font-mono">-la</span>
            <span className="text-blue-400 font-mono">./languages-core</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {ProgrammingLanguages.map((skill, index) => (
              <SkillCard key={skill.id} {...skill} />
            ))}
          </div>

        </motion.div>
        
        {/* Developer Tools */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          className="skill-category-container relative"
        >
          <div className="flex items-center gap-3 mb-5 sm:mb-6 bg-gray-800/80 px-4 py-2 rounded-lg border border-blue-500/30 w-fit">
            <span className="text-gray-400 font-mono">$</span>
            <span className="text-blue-500 font-mono">ls</span>
            <span className="text-gray-400 font-mono">-la</span>
            <span className="text-blue-400 font-mono">./dev-tools</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {DeveloperTools.map((skill, index) => (
              <SkillCard key={skill.id} {...skill} />
            ))}
          </div>

        </motion.div>
      </div>
      
      <div className="mt-6 w-full">
        <div className="font-mono text-gray-400 text-sm bg-gray-800/80 px-4 py-2 rounded-lg border border-blue-500/30 w-fit">
          <div className="flex gap-2">
            <span className="text-blue-500">$</span>
            <span className="text-white">echo</span>
            <span className="text-blue-300">"Skills loaded successfully"</span>
          </div>
        </div>
      </div>
      </TerminalWindow>
      
      {/* White network grid background */}
      <div className="absolute inset-0 -z-10">
        {/* Static white grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
    </section>
    </>
  );
};

export default memo(Skills);
