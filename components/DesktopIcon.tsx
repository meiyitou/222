import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface DesktopIconProps {
  project: Project;
  onClick: (project: Project) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ project, onClick }) => {
  const isDragging = useRef(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => { isDragging.current = true; }}
      onDragEnd={() => { 
        // Small delay to ensure the click event doesn't fire immediately after dragging
        setTimeout(() => isDragging.current = false, 50); 
      }}
      whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
      whileTap={{ scale: 0.95, cursor: 'grabbing' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute flex flex-col items-center gap-1.5 group cursor-grab w-24 z-10 select-none hover:z-30"
      style={{ top: project.position.top, left: project.position.left }}
      onClick={(e) => {
        if (!isDragging.current) {
          onClick(project);
        }
      }}
    >
      {/* Icon Container */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gray-800 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.5)] overflow-hidden ring-2 ring-transparent group-hover:ring-white/30 transition-all">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"
        />
        {/* Gloss effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Label with shadow for readability on any background */}
      <span 
        className="text-[10px] md:text-[11px] font-semibold text-white text-center leading-tight whitespace-pre-line drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] px-1 rounded-sm group-hover:bg-blue-600/80 group-hover:drop-shadow-none transition-colors"
      >
        {project.title}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;