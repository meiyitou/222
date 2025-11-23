import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface DesktopIconProps {
  project: Project;
  onClick: (project: Project) => void;
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
    <React.Fragment>
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={() => { 
          setTimeout(() => isDragging.current = false, 50); 
        }}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        whileDrag="drag"
        variants={{
          idle: { zIndex: 10, scale: 1 },
          hover: { zIndex: 50, scale: 1 }, // Scale handled by children for specificity
          tap: { scale: 0.95 },
          drag: { scale: 1.1, zIndex: 100, cursor: 'grabbing' }
        }}
        className="absolute flex flex-col items-center gap-2 group cursor-grab w-32 select-none"
        style={{ top: project.position.top, left: project.position.left }}
        onClick={(e) => {
          if (!isDragging.current) {
            onClick(project);
          }
        }}
      >
        {/* Image Container - Handles Scale & Glow */}
        <motion.div 
          className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28"
          variants={{
            idle: { 
              scale: 1, 
              filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.4))"
            },
            hover: { 
              scale: 1.2, 
              filter: "drop-shadow(0 0 15px rgba(255,255,255,0.4)) drop-shadow(0 20px 40px rgba(0,0,0,0.5))",
              transition: { type: "spring", stiffness: 300, damping: 15 }
            }
          }}
        >
          <img 
            src={displaySrc} 
            alt={project.title} 
            className="max-w-full max-h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
          {/* Optional subtle border overlay for better definition on dark backgrounds */}
          <div className="absolute inset-0 rounded-sm ring-1 ring-white/10 pointer-events-none" />
        </motion.div>

        {/* Label - Premium Typography & Design */}
        <motion.div 
          className="flex flex-col items-center justify-center max-w-full px-1"
          variants={{
            hover: { y: 8, scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } },
            idle: { y: 0, scale: 1 }
          }}
        >
            <span 
                className="text-[12px] md:text-[13px] font-medium text-white text-center leading-tight tracking-wide px-2.5 py-1 rounded-[6px] transition-all duration-200 break-words line-clamp-2 group-hover:bg-[#0058d0]/90 group-hover:text-white backdrop-blur-[2px] group-hover:backdrop-blur-none"
                style={{ 
                  textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 1px rgba(0,0,0,0.6)",
                  fontSmooth: "antialiased",
                  WebkitFontSmoothing: "antialiased"
                }}
            >
                {project.title}
            </span>
        </motion.div>
      </motion.div>
    </React.Fragment>
  );
};

export default DesktopIcon;