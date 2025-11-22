
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

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
    e.preventDefault(); // Necessary to allow dropping
  };

  // Logic to determine the display thumbnail
  // Priority: 1. First Image in Gallery, 2. Preview Image, 3. Default Thumbnail
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
    <>
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
        onContextMenu={handleContextMenu}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Icon Container */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gray-800 rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.5)] overflow-hidden ring-2 ring-transparent group-hover:ring-white/30 transition-all">
          <img 
            src={displaySrc} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"
          />
          {/* Gloss effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          
          {/* Edit Hint Overlay (visible on group hover) */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
             <div className="text-[8px] text-white font-mono uppercase tracking-wider bg-black/50 px-1 rounded backdrop-blur">
               Edit
             </div>
          </div>
        </div>

        {/* Label with shadow for readability on any background */}
        <span 
          className="text-[10px] md:text-[11px] font-semibold text-white text-center leading-tight whitespace-pre-line drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] px-1 rounded-sm group-hover:bg-blue-600/80 group-hover:drop-shadow-none transition-colors"
        >
          {project.title}
        </span>
      </motion.div>
    </>
  );
};

export default DesktopIcon;
