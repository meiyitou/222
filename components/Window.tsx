import React, { useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Project, MediaItem } from '../types';
import { X, Minus, Maximize2, Music, Edit2, Grid, Bookmark, User, Settings, Heart, MessageCircle } from 'lucide-react';

interface WindowProps {
  project: Project | null;
  onClose: () => void;
  onAddMedia?: (file: File) => void;
}

const Window: React.FC<WindowProps> = ({ project, onClose }) => {
  const dragControls = useDragControls();
  
  // Netease specific state
  const [neteaseId, setNeteaseId] = useState('3778678'); // Default Hot Playlist
  const [isEditingId, setIsEditingId] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  if (!project) return null;

  // Normalize media into a list
  const mediaList: MediaItem[] = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [
        ...(project.videoUrl ? [{ type: 'video' as const, url: project.videoUrl }] : []),
        { type: 'image' as const, url: project.previewImage }
      ];
  
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
        className="fixed top-10 md:top-24 left-4 md:left-24 z-40 w-[90vw] md:w-[800px] max-h-[85vh] bg-[#f5f5f5]/95 backdrop-blur-3xl rounded-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col"
      >
        {/* Window Header */}
        <div 
          className="h-10 bg-gradient-to-b from-[#e6e6e6] to-[#dcdcdc] border-b border-[#bfbfbf] flex items-center px-4 justify-between shrink-0 z-20 select-none cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            dragControls.start(e);
          }}
        >
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

          <div className="flex items-center gap-1.5 opacity-70">
            <span className="text-[13px] font-semibold text-gray-700 tracking-tight shadow-white drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
              {project.title.replace('\n', ' ')}
            </span>
          </div>

          <div className="w-10" /> 
        </div>

        {/* CONTENT RENDERER */}
        {project.id === 'netease' ? (
          /* === NETEASE PLAYER MODE === */
          <div className="flex-1 bg-[#f3f3f3] flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
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

               <div className="w-full bg-gray-50 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-100 -z-0">
                    <Music className="w-12 h-12 animate-pulse" />
                  </div>
                  <iframe 
                    key={neteaseId}
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

        ) : project.id === 'insta' ? (
          /* === INSTAGRAM APP MODE === */
          <div className="flex-1 bg-white overflow-y-auto custom-scrollbar flex flex-col items-center">
            <div className="w-full max-w-3xl py-8 px-4 md:px-8">
              
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-12 border-b border-gray-200 pb-12">
                 {/* Avatar with Story Ring */}
                 <div className="relative shrink-0 cursor-pointer">
                    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976]">
                      <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden">
                        <img src={project.thumbnail} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    </div>
                 </div>

                 {/* Info */}
                 <div className="flex-1 flex flex-col items-center md:items-start gap-4 w-full">
                    
                    {/* Top Row: Username & Buttons */}
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                       <h2 className="text-xl font-normal text-gray-800">bychudy</h2>
                       <div className="flex items-center gap-2">
                          <button className="px-4 py-1.5 bg-[#efefef] hover:bg-[#dbdbdb] text-sm font-semibold rounded-lg transition-colors">Edit profile</button>
                          <button className="px-4 py-1.5 bg-[#efefef] hover:bg-[#dbdbdb] text-sm font-semibold rounded-lg transition-colors">View archive</button>
                          <button className="p-2 text-gray-800"><Settings className="w-6 h-6" /></button>
                       </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-8 text-base">
                       <div className="flex gap-1"><span className="font-bold text-gray-900">{mediaList.length}</span> posts</div>
                       <div className="flex gap-1"><span className="font-bold text-gray-900">12.4k</span> followers</div>
                       <div className="flex gap-1"><span className="font-bold text-gray-900">432</span> following</div>
                    </div>

                    {/* Bio */}
                    <div className="text-sm text-gray-900 text-center md:text-left">
                       <p className="font-semibold">Bartek Chudy</p>
                       <p className="whitespace-pre-line">{project.description}</p>
                       <a href="#" className="text-[#00376b] font-semibold hover:underline mt-1 block">bychudy.com</a>
                    </div>
                 </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex justify-center gap-12 border-t border-gray-200 -mt-12 mb-4">
                 <button className="flex items-center gap-2 h-[52px] border-t border-black text-xs font-semibold tracking-widest uppercase text-black">
                    <Grid className="w-3 h-3" /> Posts
                 </button>
                 <button className="flex items-center gap-2 h-[52px] border-t border-transparent text-gray-400 text-xs font-semibold tracking-widest uppercase hover:text-gray-600 transition-colors">
                    <Bookmark className="w-3 h-3" /> Saved
                 </button>
                 <button className="flex items-center gap-2 h-[52px] border-t border-transparent text-gray-400 text-xs font-semibold tracking-widest uppercase hover:text-gray-600 transition-colors">
                    <User className="w-3 h-3" /> Tagged
                 </button>
              </div>

              {/* Post Grid */}
              <div className="grid grid-cols-3 gap-1 md:gap-7">
                {mediaList.map((item, idx) => (
                   <div key={idx} className="group relative aspect-square bg-gray-100 cursor-pointer overflow-hidden">
                      {item.type === 'video' ? (
                         <video src={item.url} className="w-full h-full object-cover" />
                      ) : (
                         <img src={item.url} alt="Post" className="w-full h-full object-cover" />
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                          <div className="flex items-center gap-2">
                             <Heart className="w-5 h-5 fill-white" />
                             <span>{Math.floor(Math.random() * 500) + 120}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <MessageCircle className="w-5 h-5 fill-white" />
                             <span>{Math.floor(Math.random() * 20) + 2}</span>
                          </div>
                      </div>
                   </div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="mt-12 text-xs text-gray-400 text-center pb-8">
                 <div className="flex justify-center gap-4 mb-4 flex-wrap">
                    <span>Meta</span><span>About</span><span>Blog</span><span>Jobs</span><span>Help</span><span>API</span><span>Privacy</span><span>Terms</span>
                 </div>
                 <div>© 2024 INSTAGRAM FROM META (REPLICA)</div>
              </div>

            </div>
          </div>
        ) : (
          /* === STANDARD GALLERY CONTENT (DEFAULT) === */
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
                                  <motion.img 
                                    src={item.url} 
                                    alt={`Media ${idx + 1}`} 
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                  />
                                  <div className="absolute inset-0 pointer-events-none">
                                      <div className="absolute inset-0 border border-white/10 rounded-lg z-20" />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
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