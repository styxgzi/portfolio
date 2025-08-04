import { motion } from "framer-motion";
import { memo, useRef, useState } from "react";
// Removed SkillIcon import as it's no longer needed


interface SkillCardProps {
  skill_name: string;
  Image?: string; // Made optional since we're not displaying logos anymore
  des: string;
}

const SkillCard = ({ skill_name, Image, des }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Using a consistent professional color palette with only 2-3 colors
  const cardColors = {
    primary: '#3b82f6', // blue-500
    secondary: '#1e40af', // blue-800
    text: '#f8fafc', // slate-50
    border: 'rgba(80, 80, 80, 0.5)'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`py-4 px-5 rounded-lg relative overflow-hidden font-sans
        border border-blue-500/50 transition-all duration-300
        bg-gray-800/90`}
      style={{
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        backgroundColor: 'rgba(31, 41, 55, 0.9)', // Always visible background
        boxShadow: isHovered 
          ? `0 0 8px 2px ${cardColors.primary}50` 
          : `0 0 6px 1px ${cardColors.primary}40`
      }}
    >
      <div className="flex items-center justify-between relative z-10">
        {/* Skill Text */}
        <div className="flex-1">
          <span style={{ color: cardColors.text }} className="text-base font-medium block">{skill_name}</span>
          {des && (
            <span className="block mt-1 text-sm text-gray-400">{des}</span>
          )}
        </div>
      </div>
      
      {/* Always show a highlight effect, enhanced on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none z-0"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: isHovered ? 0.8 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default memo(SkillCard);