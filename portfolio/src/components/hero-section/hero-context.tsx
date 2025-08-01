"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
} from "@/utils/motions/montion";
import Image from "next/image";
import LeftSideHero from "./widgets/leftside.hero";
import NetworkGlobe from "@/components/hero-section/NetworkGlobe";

const HeroContent = () => {
  return (
    <div className="relative w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-24 min-h-[calc(100vh-4rem)] gap-6 sm:gap-8 lg:gap-10"
      >
        <LeftSideHero />

        {/* Right Section - Image */}
        <motion.div
          variants={slideInFromRight(0.8)}
          className="w-full sm:w-3/4 lg:w-1/2 hidden md:flex justify-center items-center z-20"
        >
          <NetworkGlobe />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-0 sm:bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <code className="text-gray-400 text-xs sm:text-sm">scroll.toExplore()</code>
      </motion.div>
    </div>
  );
};

export default HeroContent;

/* Gradient animation */
