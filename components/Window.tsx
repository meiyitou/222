
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { X, Minus, Maximize2, Share2, Grid } from 'lucide-react';

interface WindowProps {
  project: Project | null;
  onClose: () => void;
}

const Window: React.FC<WindowProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag
        dragMomentum={false}
        className="fixed top-10 md:top-24 left-4 md:left-24 z-40 w-[90vw] md:w-[650px] max-h-[80vh] bg-[#e8e8e8]/95 backdrop-blur-2xl rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/40 overflow-hidden flex flex-col"
        // Only allow drag on the header to prevent issues when selecting text
        dragListener={false}
        dragControls={undefined} // We'll use a custom drag handle
      >
        {/* Window Header / Title Bar */}
        <motion.div 
          className="h-8 bg-[#dfdfdf] border-b border-[#c5c5c5] flex items-center px-4 justify-between shrink-0 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            // @ts-ignore - Framer motion internal drag trigger
            e.target.closest('.framer-motion-div')?.setPointerCapture(e.pointerId);
          }}
          whileTap={{ cursor: "grabbing" }}
          dragControls={undefined} // Inherits from parent but constrained here logic-wise if we were using useDragControls
        >
          {/* Traffic Lights */}
          <div className="flex gap-2 group">
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:brightness-90 active:brightness-75"
            >
              <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a126] flex items-center justify-center hover:brightness-90">
              <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1ea832] flex items-center justify-center hover:brightness-90">
              <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
          </div>

          {/* Title */}
          <div className="flex gap-1.5 items-center">
             <span className="text-xs font-medium text-gray-600">Information about: {project.title.replace('\n', ' ')}</span>
          </div>

          {/* Spacer for balance */}
          <div className="w-10" /> 
        </motion.div>

        {/* Window Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f3f3f3]">
            
            {/* Info Section */}
            <div className="p-5 border-b border-gray-200 bg-white/50">
               <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-black rounded-md overflow-hidden shrink-0 shadow-md">
                    <img src={project.thumbnail} alt="" className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-black leading-tight mb-0.5">{project.title}</h2>
                    <p className="text-xs font-semibold text-gray-500 mb-2">{project.category}</p>
                    
                    <div className="bg-white/60 p-3 rounded-md border border-gray-200/50 shadow-sm">
                       <p className="text-sm text-gray-700 leading-relaxed">
                         {project.description}
                       </p>
                    </div>
                  </div>
               </div>
               
               <div className="mt-3 flex gap-2">
                 <button className="px-2 py-1 bg-white border border-gray-300 rounded text-[10px] font-medium text-gray-600 flex items-center gap-1 hover:bg-gray-50">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span> Preview
                 </button>
               </div>
            </div>

            {/* Large Preview Area */}
            <div className="p-0 bg-gray-100 relative group min-h-[200px]">
              <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-black/50 text-white rounded backdrop-blur-md hover:bg-black/70">
                     <Grid size={14} />
                  </button>
                  <button className="p-1.5 bg-black/50 text-white rounded backdrop-blur-md hover:bg-black/70">
                     <Share2 size={14} />
                  </button>
              </div>
              
              {project.videoUrl ? (
                <video 
                  src={project.videoUrl}
                  poster={project.previewImage}
                  controls
                  className="w-full h-auto block grayscale contrast-125 outline-none"
                />
              ) : (
                <img 
                  src={project.previewImage} 
                  alt="Preview" 
                  className="w-full h-auto block grayscale contrast-125" 
                />
              )}
              
              <div className="h-32 bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-xs uppercase tracking-widest">
                End of preview
              </div>
            </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Window;
