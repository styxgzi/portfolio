"use client";
import { SocialHandles } from "../../utils/constants/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motions/montion";
import Link from "next/link";
import { RiTerminalBoxFill, RiCodeBoxLine } from "react-icons/ri";
import { RiHome4Line, RiCodeSSlashLine, RiProjector2Line, RiMailLine } from "react-icons/ri";

export default function Header() {
  const [isActive, setIsActive] = useState<string>("about-me");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: "about-me", label: "About", icon: <RiHome4Line className="w-5 h-5" /> },
    { id: "skills", label: "Skills", icon: <RiCodeSSlashLine className="w-5 h-5" /> },
    { id: "projects", label: "Projects", icon: <RiProjector2Line className="w-5 h-5" /> },
    { id: "contact", label: "Contact", icon: <RiMailLine className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
          currentSection = section.getAttribute("id") || "";
        }
      });
      setIsActive(currentSection);
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        className={`fixed top-0 w-screen z-[100] transition-all duration-300 ${isScrolled 
          ? "bg-black/70 backdrop-blur-xl border-b border-blue-500/20" 
          : "bg-transparent"}`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-16 h-20">
          <div className="w-full h-full flex items-center justify-between">
            {/* Logo Section */}
            <motion.a
              variants={slideInFromLeft(0.5)}
              href="#about-me"
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                <div className="absolute inset-0 bg-blue-500/20 rounded-md blur-md group-hover:blur-lg transition-all duration-300" />
                <div className="relative w-full h-full bg-black/80 rounded-md p-2 border border-blue-500/30 flex items-center justify-center overflow-hidden group-hover:border-blue-400/50 transition-all duration-300">
                  <RiTerminalBoxFill className="w-full h-full text-blue-400 group-hover:text-blue-300 transition-colors duration-500" />
                  <div className="absolute -inset-1 bg-blue-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-base sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-200">
                  SAHIL GOSWAMI
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs text-blue-400 font-mono">~/data_scientist</span>
                  <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                </div>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <motion.nav
              variants={slideInFromTop}
              className="hidden md:block"
            >
              <div className="flex items-center gap-3 p-2 rounded-md border border-blue-500/20 bg-black/60 backdrop-blur-xl shadow-lg">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${isActive === item.id
                      ? "text-blue-300"
                      : "text-white/70 hover:text-blue-200 hover:bg-blue-900/10"
                      }`}
                  >
                    <span className={`text-lg ${isActive === item.id ? "text-blue-400" : ""}`}>{item.icon}</span>
                    {isActive === item.id && (
                      <motion.div
                        layoutId="navbar-pill"
                        className="absolute inset-0 bg-blue-900/20 rounded-md -z-10 border border-blue-500/30"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.div
                variants={slideInFromRight(0.5)}
                className="hidden sm:flex items-center gap-4"
              >
                <div className="flex items-center gap-3">
                  {SocialHandles.map((social, index) => (
                    <Link
                      href={social.link}
                      key={social.name}
                      target="_blank"
                      className="group relative"
                    >
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + (index * 0.1) }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-blue-500/30 rounded-md opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
                        <div className="relative p-2 rounded-md border border-blue-500/30 bg-black/70 backdrop-blur-xl group-hover:border-blue-400/50 transition-all duration-300 shadow-lg">
                          <Image
                            src={social.src}
                            alt={social.name}
                            width={20}
                            height={20}
                            className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 group-hover:brightness-110"
                            style={{ filter: 'brightness(0) invert(1)' }}
                          />
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Mobile Social Links */}
              <div className="flex md:hidden items-center gap-2">
                {SocialHandles.map((social) => (
                  <Link
                    href={social.link}
                    key={social.name}
                    target="_blank"
                    className="group relative"
                  >
                    <div className="relative p-1.5 rounded-md border border-blue-500/30 bg-black/70 backdrop-blur-xl">
                      <Image
                        src={social.src}
                        alt={social.name}
                        width={16}
                        height={16}
                        className="opacity-90 group-hover:opacity-100"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[90] md:hidden bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-md shadow-lg w-[90%] max-w-sm">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex flex-col items-center justify-center w-full h-full ${isActive === item.id
                ? "text-blue-300"
                : "text-white/70 hover:text-blue-200"
                }`}
            >
              <div className={`relative p-2 ${isActive === item.id ? "" : ""}`}>
                {item.icon}
                {isActive === item.id && (
                  <motion.div 
                    layoutId="mobile-navbar-pill"
                    className="absolute inset-0 bg-blue-900/20 rounded-md -z-10 border border-blue-500/30"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </div>
              <span className="text-xs mt-0.5 font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}