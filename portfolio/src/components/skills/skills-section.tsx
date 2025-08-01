"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/utils/motions/montion";
import { LibrariesAndFrameworks, ProgrammingLanguages, DeveloperTools } from "@/utils/constants/constants";
import SkillsHeader from "./skills-header";
import SkillCard from "./skills-card";
import WaveAnimation from "@/components/common/WaveAnimation";

const Skills = () => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      id="skills"
      className="flex flex-col items-center py-10 sm:py-16 md:py-20 relative z-50 min-h-screen px-4 sm:px-6 lg:px-8"
    >
      <SkillsHeader />
      {/* Skills Grid Container */}
      <div className="w-full max-w-6xl mx-auto grid gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12">
        {/* Frameworks/Libraries */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          className="skill-category-container"
        >
          <h3 className="text-lg sm:text-xl font-mono mb-3 sm:mb-4 text-purple-400 px-2 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Frameworks/Libraries</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {LibrariesAndFrameworks.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillCard {...skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Languages & Others */}
        <motion.div
          variants={slideInFromRight(0.3)}
          className="skill-category-container"
        >
          <h3 className="text-lg sm:text-xl font-mono mb-3 sm:mb-4 text-green-400 px-2 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Languages & Others</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {ProgrammingLanguages.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillCard {...skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Developer Tools */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          className="skill-category-container"
        >
          <h3 className="text-lg sm:text-xl font-mono mb-3 sm:mb-4 text-blue-400 px-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Developer Tools</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {DeveloperTools.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillCard {...skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Background Effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>
      
      {/* Wave Animation at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveAnimation />
      </div>
    </motion.section>
  );
};

export default Skills;
