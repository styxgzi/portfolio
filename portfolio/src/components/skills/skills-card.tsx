import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface SkillCardProps {
  skill_name: string;
  Image: string;
  des: string;
}

const SkillCard = ({ skill_name, Image, des }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });
  const brightness = useSpring(useTransform(y, [-100, 100], [1.1, 0.9]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, z: 20 }}
      style={{
        rotateX,
        rotateY,
        filter: `brightness(${brightness.get()})`,
        transformStyle: "preserve-3d",
      }}
      className="py-2 px-3 sm:px-4 rounded-lg bg-gray-900/20 backdrop-blur-md border border-gray-800/50 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
    >
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-6 h-6 sm:w-8 sm:h-8 relative flex-shrink-0">
          <img
            src={Image}
            alt={skill_name}
            className="object-contain w-full h-full drop-shadow-lg"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-200 truncate bg-gradient-to-r from-gray-200 to-gray-300 bg-clip-text text-transparent">{skill_name}</h4>
          {des && <p className="text-[10px] sm:text-xs text-gray-400 truncate">{des}</p>}
        </div>
      </div>
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-cyan-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default SkillCard;