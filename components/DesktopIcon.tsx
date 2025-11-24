
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface DesktopIconProps {
  project: Project;
  onClick: (project: Project) => void;
  onUpdateMedia: (id: string, file: File) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ project, onClick, onUpdateMedia }) => {
  const isDragging = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpdateMedia(project.id, file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onUpdateMedia(project.id, file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

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
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />
      <motion.div
        drag
        dragMomentum={false}
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={() => { 
          setTimeout(() => isDragging.current = false, 50); 
        }}
        whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
        whileTap={{ scale: 0.95, cursor: 'grabbing' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        // Increased container width for better text wrapping
        className="absolute flex flex-col items-center gap-2 group cursor-grab w-28 md:w-32 z-10 select-none hover:z-30"
        style={{ top: project.position.top, left: project.position.left }}
        onClick={(e) => {
          if (!isDragging.current) {
            onClick(project);
          }
        }}
        onContextMenu={handleContextMenu}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Image Container - Frameless, Shadowed, Larger */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
          {/* Using object-contain to show full image shape instead of a box */}
          <img 
            src={displaySrc} 
            alt={project.title} 
            className="max-w-full max-h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] pointer-events-none select-none"
            draggable={false}
          />
          
          {/* Edit overlay (only appears on hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
             {/* Optional: Subtle edit hint, currently kept clean */}
          </div>
        </div>

        {/* Label - OS Style Typography */}
        {/* Using a nested span to allow the background to wrap tightly around the text */}
        <div className="flex flex-col items-center justify-center w-full px-1">
            <span 
                className="text-[12px] md:text-[13px] font-medium text-white text-center leading-tight tracking-wide px-2 py-1 rounded-[5px] transition-colors duration-200 break-words line-clamp-2 group-hover:bg-[#0058d0]/90 group-hover:text-white"
                style={{ 
                  // Heavy text shadow for readability on light/complex backgrounds
                  textShadow: "0 1px 3px rgba(0,0,0,0.8), 0 0 1px rgba(0,0,0,0.5)" 
                }}
            >
                {project.title}
            </span>
        </div>
      </motion.div>
    </React.Fragment>
  );
};

export default DesktopIcon;
