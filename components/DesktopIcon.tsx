import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface DesktopIconProps {
  project: Project;
  onClick: (project: Project) => void;
  onUpdateMedia: (id: string, file: File) => void;
}

const MotionDiv = motion.div as any;

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
      <MotionDiv
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
        className="absolute flex flex-col items-center gap-1.5 group cursor-grab w-28 select-none hover:z-30"
        style={{ 
          top: project.position.top, 
          left: project.position.left,
          right: project.position.right,
          bottom: project.position.bottom 
        }}
        onClick={(e: any) => {
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
          <img 
            src={displaySrc} 
            alt={project.title} 
            className="max-w-full max-h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] pointer-events-none select-none"
            draggable={false}
          />
        </div>

        {/* Label - Artistic Serif Typography */}
        <div className="flex flex-col items-center justify-center w-full px-1">
            <span 
                className="text-[12px] md:text-[13px] font-serif italic text-white text-center leading-tight tracking-widest px-2 py-0.5 transition-colors duration-200 break-words line-clamp-2 group-hover:text-blue-200"
                style={{ 
                  textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.5)",
                  textTransform: 'uppercase'
                }}
            >
                {project.title}
            </span>
        </div>
      </MotionDiv>
    </React.Fragment>
  );
};

export default DesktopIcon;