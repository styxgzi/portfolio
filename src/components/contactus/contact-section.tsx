"use client";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motions/montion";
import ContactInput from "./contact-input";
import ContactHeader from "./contact-header";
import { HiSparkles, HiCommandLine, HiQrCode, HiChatBubbleLeftRight } from "react-icons/hi2";
import { Button } from "@/components/ui/moving-border-btn";
import { FaTerminal } from "react-icons/fa";
import { FiMessageCircle, FiCode } from "react-icons/fi";
import { PiCodeBlock } from "react-icons/pi";
import TerminalWindow from "@/components/ui/terminal-window";

export default function ContactUs() {
  const [hoverState, setHoverState] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="flex relative flex-col items-center justify-center md:px-20 mt-16 md:mt-0 w-full pt-12 h-full overflow-hidden"
      >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Blurred Circles */}
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-white/5 filter blur-[80px] opacity-50" />
        <div className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] rounded-full bg-white/5 filter blur-[60px] opacity-40" />
        
        {/* Animated Circles */}
        <motion.div 
          className="absolute top-1/2 left-1/4 w-32 h-32 border border-white/10 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-40 h-40 border border-white/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="z-50 flex w-full">
        <ContactHeader />
      </div>

      <div className="font-mono w-full text-base text-white sm:px-10 z-50 mt-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            variants={slideInFromLeft(0.5)}
            className="w-full"
          >
            <TerminalWindow title="contact.sh --send-message">
              <ContactInput />
            </TerminalWindow>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            variants={slideInFromRight(0.5)}
            className="w-full md:flex items-start justify-center flex-col text-white md:mt-0 md:ml-auto hidden"
          >
            <TerminalWindow title="man get_in_touch">
              <div className="font-mono text-base leading-relaxed bg-black/30 p-4 rounded-lg border border-white/10 mb-6">
                <p className="mb-3">
                  <span className="text-white/70">/**</span>
                </p>
                <p className="mb-2 pl-4">
                  <span className="text-white/70">* </span>
                  <span className="text-white">I'm always open to discussing new projects,</span>
                </p>
                <p className="mb-2 pl-4">
                  <span className="text-white/70">* </span>
                  <span className="text-white">creative ideas or opportunities to be part</span>
                </p>
                <p className="mb-2 pl-4">
                  <span className="text-white/70">* </span>
                  <span className="text-white">of your tech visions.</span>
                </p>
                <p className="mb-3 pl-4">
                  <span className="text-white/70">* </span>
                  <span className="text-white">Response time: ~24hrs</span>
                </p>
                <p className="mb-3">
                  <span className="text-white/70">*/</span>
                </p>
              </div>

              <motion.div
                className="p-4 border border-white/20 rounded-lg bg-black/30 backdrop-blur-sm shadow-inner shadow-white/5"
                whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.3)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onHoverStart={() => setHoverState(true)}
                onHoverEnd={() => setHoverState(false)}
              >
                <AnimatePresence mode="wait">
                  {hoverState ? (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-center font-mono"
                    >
                      <span className="text-white/80">$ </span>
                      <span className="text-white">npm </span>
                      <span className="text-white">install </span>
                      <span className="text-white/80">collaboration</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-center flex items-center justify-center gap-2"
                    >
                      <HiQrCode className="text-white/80" />
                      <span className="text-white">Let's build something amazing together</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}