
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface DesktopIconProps {
  project: Project;
  onClick: (project: Project) => void;
  // Removed onUpdateMedia
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ project, onClick }) => {
  const isDragging = useRef(false);

  // Logic to determine the display thumbnail
  const getDisplayThumbnail = () => {
    if (project.gallery && project.gallery.length > 0) {
      const firstImage = project.gallery.find(m => m.type === 'image');
      if (firstImage) return firstImage.url;
    }
    if (project.previewImage) return project.previewImage;
    return project.thumbnail;
  };

  const displaySrc = getDisplayThumbnail();

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
      className="absolute flex flex-col items-center gap-1 group cursor-grab w-[100px] z-10 select-none hover:z-30 p-1 rounded-md"
      style={{ top: project.position.top, left: project.position.left }}
      onClick={(e) => {
        if (!isDragging.current) {
          onClick(project);
        }
      }}
    >
      {/* Icon Container */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gray-800 rounded-[4px] shadow-xl overflow-hidden ring-2 ring-transparent group-hover:ring-white/30 transition-all">
        <img 
          src={displaySrc} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"
        />
        {/* Gloss effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Label - Mac Style Text */}
      <span 
        className="text-[11px] font-medium text-white text-center leading-[1.2] whitespace-pre-line drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded-[4px] group-hover:bg-[#0058d0] group-hover:drop-shadow-none transition-colors max-w-full break-words"
        style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.5)" }}
      >
        {project.title}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;
    