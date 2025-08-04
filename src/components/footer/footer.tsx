import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-screen text-white pb-24 md:pb-4 z-50 relative">
      <div className="w-full border-b border-white/20 mb-4">
        <div className="w-full mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-lg font-mono font-bold text-white">
            @stxgzi
          </div>
          <p className="text-xs text-white mt-1 font-mono">{`// developer & engineer`}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-2">
            <Link href="https://github.com/stxgzi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <div className="text-white hover:text-white/70 transition-colors">
                <FaGithub size={18} />
              </div>
            </Link>

                        <Link href="https://twitter.com/stxgzi" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <div className="text-white hover:text-white/70 transition-colors">
                <img src="https://images.icon-icons.com/4029/PNG/512/twitter_x_new_logo_square_x_icon_256075.png" alt="Twitter X" className="w-5 h-5 object-contain" />
              </div>
            </Link>
            <Link href="https://linkedin.com/in/stxgzi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <div className="text-white hover:text-white/70 transition-colors">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6KyW5WYCdoJ32KzNbJH6NMm43byKYpZuo7g&s" alt="LinkedIn" className="w-5 h-5 object-contain" />
              </div>
            </Link>
            <Link href="https://instagram.com/bbys4nta" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="text-white hover:text-white/70 transition-colors">
                <FaInstagram size={18} />
              </div>
            </Link>
          </div>
          <div className="text-xs text-white font-mono flex items-center">
            <span className="text-white mr-1">$</span>
            <span className="text-white">git</span>
            <span className="text-white mx-1">commit</span>
            <span className="text-white">-m</span>
            <span className="text-white ml-1">{`"©${currentYear} stxgzi"`}</span>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end font-mono text-xs">
          <Link href="#contact" className="text-white hover:text-white/70 transition-colors">
            contact()
          </Link>
          <Link href="#projects" className="text-white hover:text-white/70 transition-colors mt-1">
            projects()
          </Link>
          <Link href="#about" className="text-white hover:text-white/70 transition-colors mt-1">
            about()
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
