
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Project, MediaItem } from '../types';
import { X, Minus, Maximize2, UploadCloud, Plus, Music, Edit2 } from 'lucide-react';

interface WindowProps {
  project: Project | null;
  onClose: () => void;
  onAddMedia?: (file: File) => void;
}

const Window: React.FC<WindowProps> = ({ project, onClose, onAddMedia }) => {
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const dragControls = useDragControls();
  
  // Netease specific state
  const [neteaseId, setNeteaseId] = useState('3778678'); // Default Hot Playlist
  const [isEditingId, setIsEditingId] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!project) return null;

  // Normalize media into a list
  const mediaList: MediaItem[] = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [
        ...(project.videoUrl ? [{ type: 'video' as const, url: project.videoUrl }] : []),
        { type: 'image' as const, url: project.previewImage }
      ];
  
  // Logic to determine the display thumbnail for the info section (Top Left content)
  // Priority: 1. First Image in Gallery, 2. Preview Image, 3. Default Thumbnail
  const getInfoThumbnail = () => {
    if (project.gallery && project.gallery.length > 0) {
      const firstImage = project.gallery.find(m => m.type === 'image');
      if (firstImage) return firstImage.url;
    }
    if (project.previewImage) return project.previewImage;
    return project.thumbnail;
  };

  const infoThumbnail = getInfoThumbnail();
  
  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDraggingFile) setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && onAddMedia) {
      onAddMedia(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAddMedia) {
      onAddMedia(file);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag
        dragListener={false} // Disable dragging from anywhere in the window
        dragControls={dragControls} // Only drag when controls are started (via Header)
        dragMomentum={false}
        dragElastic={0.1}
        className="fixed top-10 md:top-24 left-4 md:left-24 z-40 w-[90vw] md:w-[800px] max-h-[85vh] bg-[#e8e8e8]/95 backdrop-blur-2xl rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/40 overflow-hidden flex flex-col"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Drop overlay */}
        {isDraggingFile && (
          <div className="absolute inset-0 z-50 bg-blue-500/20 backdrop-blur-sm border-4 border-blue-500 border-dashed m-2 rounded-lg flex flex-col items-center justify-center pointer-events-none">
             <UploadCloud className="w-16 h-16 text-blue-600 mb-2" />
             <span className="text-blue-700 font-bold text-lg">Drop to add to gallery</span>
          </div>
        )}

        {/* Window Header / Title Bar - Acts as Drag Handle */}
        <div 
          className="h-9 bg-[#dfdfdf] border-b border-[#c5c5c5] flex items-center px-4 justify-between shrink-0 z-20 select-none cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            dragControls.start(e);
          }}
        >
          {/* Traffic Lights */}
          <div className="flex gap-2 group" onPointerDown={(e) => e.stopPropagation()}>
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:brightness-90 active:brightness-75 transition-all"
            >
              <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a126] flex items-center justify-center hover:brightness-90 transition-all">
              <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1ea832] flex items-center justify-center hover:brightness-90 transition-all">
              <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
          </div>

          {/* Title */}
          <span className="text-xs font-semibold text-gray-600 tracking-wide opacity-80">
            {project.title.replace('\n', ' ')}
          </span>

          {/* Spacer */}
          <div className="w-10" /> 
        </div>

        {/* NETEASE PLAYER MODE */}
        {project.id === 'netease' ? (
          <div className="flex-1 bg-[#f3f3f3] flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
               {/* Player Header */}
               <div className="p-4 bg-[#dd001b] flex items-center justify-between text-white shadow-md z-10 relative">
                  <div className="flex items-center gap-3">
                     <div className="bg-black/20 p-1.5 rounded-full">
                       <Music className="w-5 h-5" />
                     </div>
                     <div className="flex flex-col">
                        <span className="font-bold text-base leading-tight">Netease Cloud Music</span>
                        <span className="text-[10px] opacity-80 uppercase tracking-wider font-medium">Embedded Player</span>
                     </div>
                  </div>
                  
                  {/* ID Editor */}
                  <div className="flex items-center gap-2 text-sm bg-black/20 pl-3 pr-1 py-1 rounded-full border border-white/10">
                      <span className="opacity-70 text-xs font-medium">Playlist ID:</span>
                      {isEditingId ? (
                        <input 
                          autoFocus
                          className="bg-white/90 text-black rounded px-1.5 py-0.5 border-none outline-none w-24 text-center text-xs font-mono"
                          defaultValue={neteaseId}
                          onBlur={(e) => {
                             if(e.target.value) setNeteaseId(e.target.value);
                             setIsEditingId(false);
                          }}
                          onKeyDown={(e) => {
                             if(e.key === 'Enter') {
                               if(e.currentTarget.value) setNeteaseId(e.currentTarget.value);
                               setIsEditingId(false);
                             }
                          }}
                        />
                      ) : (
                        <div 
                           onClick={() => setIsEditingId(true)} 
                           className="group/edit flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition-colors" 
                           title="Click to edit Playlist ID"
                        >
                           <span className="font-mono font-bold">{neteaseId}</span>
                           <Edit2 className="w-3 h-3 opacity-50 group-hover/edit:opacity-100" />
                        </div>
                      )}
                  </div>
               </div>

               {/* Iframe Widget */}
               <div className="w-full bg-gray-50 relative">
                  {/* Loading skeleton / placeholder behind iframe */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-100 -z-0">
                    <Music className="w-12 h-12 animate-pulse" />
                  </div>
                  
                  <iframe 
                    key={neteaseId} // Force re-render on ID change
                    frameBorder="no" 
                    width="100%" 
                    height="430" 
                    src={`https://music.163.com/outchain/player?type=0&id=${neteaseId}&auto=1&height=430`}
                    className="relative z-10 block"
                  ></iframe>
               </div>
               
               <div className="px-4 py-3 bg-gray-50 text-[11px] text-gray-400 text-center border-t border-gray-200">
                  Tip: Click the Playlist ID above to load your own public playlist.
               </div>
            </div>
         </div>
        ) : (
          /* STANDARD GALLERY CONTENT */
          <div className="flex-1 overflow-y-auto bg-[#f3f3f3] flex flex-col custom-scrollbar">
              
              {/* Info Section */}
              <div className="p-8 bg-white/60 border-b border-gray-200 backdrop-blur-sm">
                <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 shadow-md border border-white/50">
                      <img src={infoThumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1">{project.title}</h2>
                      <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">{project.category}</p>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap max-w-2xl">
                          {project.description}
                      </p>
                    </div>
                </div>
              </div>

              {/* Grid Media List - Optimized Layout */}
              <div className="p-6 md:px-8 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {mediaList.map((item, idx) => {
                    // Layout Pattern: 1 Full - 2 Split - 1 Full - 2 Split
                    // Index 0: Full
                    // Index 1: Split
                    // Index 2: Split
                    // Index 3: Full
                    // ...
                    const isFullWidth = idx % 3 === 0;
                    const colSpanClass = isFullWidth ? "md:col-span-2" : "md:col-span-1";
                    
                    // Use standard aspect ratios to prevent cropping important details
                    // Full width = Video (16:9)
                    // Split width = Standard Photo (4:3) - better than square for "full view"
                    const aspectClass = isFullWidth ? "aspect-video" : "aspect-[4/3]";

                    return (
                      <motion.div 
                        key={idx} 
                        className={`relative ${colSpanClass} ${aspectClass} group z-0 hover:z-10`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                      >
                        <motion.div
                          className="w-full h-full relative rounded-xl overflow-hidden bg-gray-100 shadow-sm"
                          whileHover={{ 
                              y: -10,
                              scale: 1.02,
                              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {item.type === 'video' ? (
                                <video 
                                  src={item.url}
                                  controls
                                  className="w-full h-full object-cover"
                                  preload="metadata"
                                />
                            ) : (
                                <>
                                  {/* Image with cover to fill grid, but less aggressive crop due to better aspect ratios */}
                                  <motion.img 
                                    src={item.url} 
                                    alt={`Media ${idx + 1}`} 
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                  />
                                  
                                  {/* High-end Interactions Overlay */}
                                  <div className="absolute inset-0 pointer-events-none">
                                      {/* Inner white border (inset) */}
                                      <div className="absolute inset-0 border border-white/10 rounded-xl z-20" />
                                      
                                      {/* Dark gradient vignette from bottom */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                      
                                      {/* Glossy Shine Animation */}
                                      <motion.div 
                                          className="absolute -top-[50%] -bottom-[50%] w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-25 z-20 blur-sm"
                                          initial={{ x: "-200%", opacity: 0 }}
                                          whileHover={{ x: "400%", opacity: 1 }}
                                          transition={{ duration: 1.5, ease: "easeInOut" }}
                                      />
                                  </div>
                                </>
                            )}
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Add Media Button */}
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*,video/*" />
                <motion.button 
                  whileHover={{ scale: 1.01, backgroundColor: "#fff" }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleUploadClick}
                  className="w-full mt-8 py-6 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors gap-2 bg-gray-50/50"
                >
                  <Plus className="w-6 h-6" />
                  <span className="font-medium">Add more images or videos</span>
                </motion.button>
              </div>
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
};

export default Window;
    