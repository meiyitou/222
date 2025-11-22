
import React, { useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Project, MediaItem } from '../types';
import { X, Minus, Maximize2, Music, Edit2 } from 'lucide-react';

interface WindowProps {
  project: Project | null;
  onClose: () => void;
  // Removed onAddMedia prop
}

const Window: React.FC<WindowProps> = ({ project, onClose }) => {
  const dragControls = useDragControls();
  
  // Netease specific state
  const [neteaseId, setNeteaseId] = useState('3778678'); // Default Hot Playlist
  const [isEditingId, setIsEditingId] = useState(false);
  
  if (!project) return null;

  // Normalize media into a list
  const mediaList: MediaItem[] = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [
        ...(project.videoUrl ? [{ type: 'video' as const, url: project.videoUrl }] : []),
        { type: 'image' as const, url: project.previewImage }
      ];
  
  // Logic to determine the display thumbnail for the info section (Top Left content)
  const getInfoThumbnail = () => {
    if (project.gallery && project.gallery.length > 0) {
      const firstImage = project.gallery.find(m => m.type === 'image');
      if (firstImage) return firstImage.url;
    }
    if (project.previewImage) return project.previewImage;
    return project.thumbnail;
  };

  const infoThumbnail = getInfoThumbnail();

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
        // Updated window styling: Lighter border, distinct macOS deep shadow, slightly more opaque background
        className="fixed top-10 md:top-24 left-4 md:left-24 z-40 w-[90vw] md:w-[800px] max-h-[85vh] bg-[#f5f5f5]/95 backdrop-blur-3xl rounded-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col"
      >
        {/* Window Header / Title Bar - macOS Style */}
        <div 
          className="h-10 bg-gradient-to-b from-[#e6e6e6] to-[#dcdcdc] border-b border-[#bfbfbf] flex items-center px-4 justify-between shrink-0 z-20 select-none cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            dragControls.start(e);
          }}
        >
          {/* macOS Traffic Lights - Symbols appear on hover group */}
          <div className="flex gap-2 group/traffic" onPointerDown={(e) => e.stopPropagation()}>
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center transition-all shadow-sm"
            >
              <X className="w-2 h-2 text-black/60 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a126] flex items-center justify-center transition-all shadow-sm">
              <Minus className="w-2 h-2 text-black/60 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1ea832] flex items-center justify-center transition-all shadow-sm">
              <Maximize2 className="w-2 h-2 text-black/60 opacity-0 group-hover/traffic:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Title */}
          <div className="flex items-center gap-1.5 opacity-70">
            <span className="text-[13px] font-semibold text-gray-700 tracking-tight shadow-white drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
              {project.title.replace('\n', ' ')}
            </span>
          </div>

          {/* Spacer to balance header */}
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
          <div className="flex-1 overflow-y-auto bg-[#f0f0f0] flex flex-col custom-scrollbar">
              
              {/* Info Section */}
              <div className="p-8 bg-white/40 border-b border-gray-200/50 backdrop-blur-sm">
                <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden shrink-0 shadow-lg border border-gray-100 p-1">
                      <img src={infoThumbnail} alt="" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-1 tracking-tight">{project.title}</h2>
                      <p className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-4">{project.category}</p>
                      <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap max-w-2xl font-medium">
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
                    const isFullWidth = idx % 3 === 0;
                    const colSpanClass = isFullWidth ? "md:col-span-2" : "md:col-span-1";
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
                          className="w-full h-full relative rounded-lg overflow-hidden bg-gray-200 shadow-sm border border-black/5"
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
                                  {/* Image with cover */}
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
                                      <div className="absolute inset-0 border border-white/10 rounded-lg z-20" />
                                      
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
              </div>
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
};

export default Window;
    