import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-screen text-gray-200 pb-24 md:pb-4 z-50 relative">
      <div className="w-full border-b border-purple-900/20 mb-4">
        <div className="w-full mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <div className="text-lg font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
            @stxgzi
          </div>
          <p className="text-xs text-gray-400 mt-1 font-mono">{`// developer & engineer`}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-2">
            <Link href="https://github.com/stxgzi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <div className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaGithub size={18} />
              </div>
            </Link>

                        <Link href="https://twitter.com/stxgzi" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <div className="text-gray-400 hover:text-purple-500 transition-colors">
                <img src="https://images.icon-icons.com/4029/PNG/512/twitter_x_new_logo_square_x_icon_256075.png" alt="Twitter X" className="w-5 h-5 object-contain" />
              </div>
            </Link>
            <Link href="https://linkedin.com/in/stxgzi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <div className="text-gray-400 hover:text-purple-500 transition-colors">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6KyW5WYCdoJ32KzNbJH6NMm43byKYpZuo7g&s" alt="LinkedIn" className="w-5 h-5 object-contain" />
              </div>
            </Link>
            <Link href="https://instagram.com/bbys4nta" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <div className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaInstagram size={18} />
              </div>
            </Link>
          </div>
          <div className="text-xs text-gray-500 font-mono flex items-center">
            <span className="text-green-400 mr-1">$</span>
            <span className="text-purple-400">git</span>
            <span className="text-blue-400 mx-1">commit</span>
            <span className="text-gray-400">-m</span>
            <span className="text-gray-300 ml-1">{`"©${currentYear} stxgzi"`}</span>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end font-mono text-xs">
          <Link href="#contact" className="text-gray-400 hover:text-purple-500 transition-colors">
            contact()
          </Link>
          <Link href="#projects" className="text-gray-400 hover:text-purple-500 transition-colors mt-1">
            projects()
          </Link>
          <Link href="#about" className="text-gray-400 hover:text-purple-500 transition-colors mt-1">
            about()
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
