
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, useMotionValue } from 'framer-motion';
import { Project, MediaItem } from '../types';
import { X, Minus, Maximize2, Music, Edit2, Grid, Bookmark, User, Settings, Heart, MessageCircle, Play, Pause, SkipBack, SkipForward, Plus, Volume2, Disc, Info } from 'lucide-react';

interface WindowProps {
  project: Project | null;
  onClose: () => void;
  zIndex?: number;
  onFocus?: () => void;
  initialX?: number;
  initialY?: number;
}

interface AudioTrack {
    title: string;
    artist: string;
    url: string;
    cover?: string;
}

const MotionDiv = motion.div as any;

// --- SMART GRID ITEM COMPONENT ---
const GalleryMedia: React.FC<{ item: MediaItem; index: number }> = ({ item, index }) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const isVideo = item.type === 'video';
  const colSpanClass = isVideo || isLandscape ? 'col-span-2' : 'col-span-1';

  return (
    <MotionDiv 
      className={`relative group z-0 break-inside-avoid mb-4 ${colSpanClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <MotionDiv
        className="w-full h-full relative rounded-lg overflow-hidden bg-gray-200 shadow-sm border border-black/5"
        whileHover={{ 
            y: -5,
            scale: 1.02,
            boxShadow: "0 15px 30px -10px rgba(0,0,0,0.3)",
            zIndex: 10
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
          {isVideo ? (
              <video 
                src={item.url}
                controls
                className="w-full h-auto block"
                preload="metadata"
              />
          ) : (
              <>
                <img 
                  src={item.url} 
                  alt={`Media ${index}`} 
                  className={`w-full h-auto block transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth > img.naturalHeight * 1.1) {
                      setIsLandscape(true);
                    }
                    setLoaded(true);
                  }}
                />
                {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse min-h-[150px]" />}
                
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 border border-white/10 rounded-lg z-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                </div>
              </>
          )}
          
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
             <div className="bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1.5 shadow-lg border border-white/10">
                <Info className="w-3 h-3 opacity-70" />
                <span className="font-medium tracking-wide uppercase">{item.type}</span>
             </div>
          </div>
      </MotionDiv>
    </MotionDiv>
  );
};

const Window: React.FC<WindowProps> = ({ project, onClose, zIndex = 20, onFocus, initialX = 0, initialY = 0 }) => {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);
  
  // Use MotionValues for position. This separates position state from React render cycle.
  // This ensures that when parent re-renders (e.g. opening another window), 
  // this window doesn't reset to initialX/Y.
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const [neteaseId, setNeteaseId] = useState('13904430662'); 
  const [isEditingId, setIsEditingId] = useState(false);
  
  const [tracks, setTracks] = useState<AudioTrack[]>([
      { title: 'Demo Song', artist: 'Unknown Artist', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' }
  ]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
     if(project?.id === 'localmusic' && audioRef.current) {
         if(isPlaying) {
             audioRef.current.play().catch(e => console.log("Playback failed", e));
         } else {
             audioRef.current.pause();
         }
     }
  }, [isPlaying, currentTrackIndex, project]);

  const handleTimeUpdate = () => {
      if(audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          setDuration(audioRef.current.duration || 0);
      }
  };

  const playTrack = (index: number) => {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
  };
  
  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };
  const prevTrack = () => {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const formatTime = (time: number) => {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60);
      return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };
  
  if (!project) return null;

  // --- CRASH SIMULATION (AE/PS/AI) ---
  const isAdobeApp = ['ae', 'ps', 'ai'].includes(project.id);
  if (isAdobeApp) {
     return (
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          
          drag
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          
          onPointerDown={onFocus}
          style={{ zIndex: zIndex || 50, position: 'fixed', top: '50%', left: '50%' }}
          className="w-[420px] bg-[#ececec] rounded-lg shadow-2xl overflow-hidden flex flex-col font-sans text-sm border border-gray-300"
        >
           <div 
              className="h-6 bg-gradient-to-b from-[#e8e8e8] to-[#dcdcdc] border-b border-[#c2c2c2] flex items-center justify-center relative select-none cursor-grab active:cursor-grabbing"
              onPointerDown={(e: any) => { 
                 e.preventDefault();
                 e.stopPropagation();
                 dragControls.start(e); 
              }}
            >
               <span className="text-[12px] font-semibold text-gray-600 drop-shadow-sm">{project.title}</span>
           </div>
           <div className="p-5 flex gap-4">
              <div className="w-14 h-14 bg-transparent flex-shrink-0">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Mac_OS_X_10.5_error.png" alt="Alert" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                 <h3 className="font-bold text-[13px] text-black mb-2">{project.title} quit unexpectedly.</h3>
                 <p className="text-[11px] text-gray-700 leading-relaxed mb-4">
                    Click Reopen to open the application again. Click Report to see more detailed information and send a report to Apple.
                 </p>
                 <div className="text-[10px] text-gray-500 cursor-pointer hover:underline mb-1">Report...</div>
                 <div className="text-[10px] text-gray-500 cursor-pointer hover:underline">Ignore</div>
              </div>
           </div>
           <div className="px-4 py-3 bg-transparent flex justify-end gap-3">
               <button onClick={onClose} className="px-4 py-0.5 bg-white border border-gray-400 rounded shadow-sm text-[13px] active:bg-gray-100">Ignore</button>
               <button onClick={onClose} className="px-4 py-0.5 bg-white border border-gray-400 rounded shadow-sm text-[13px] active:bg-gray-100">Report...</button>
               <button onClick={onClose} className="px-4 py-0.5 bg-[#007aff] text-white border border-[#004999] rounded shadow-sm text-[13px] font-medium active:brightness-90">Reopen</button>
           </div>
        </MotionDiv>
     );
  }

  const mediaList = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [
        ...(project.videoUrl ? [{ type: 'video' as const, url: project.videoUrl }] : []),
        { type: 'image' as const, url: project.previewImage }
      ];
  
  const isSingleItem = mediaList.length === 1;

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
    <MotionDiv
      // IMPORTANT: We do NOT animate x and y here. 
      // We let the MotionValues and Drag control x/y.
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      
      drag
      dragListener={false} // Must start drag manually from header
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0} 
      
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      
      // Position is handled by style (fixed centered) + transform (x,y motion values)
      style={{ 
        zIndex, 
        position: 'fixed', 
        top: '50%', 
        left: '50%',
        marginTop: '-37.5vh', // Half of 75vh height
        marginLeft: '-450px', // Half of 900px width
        // Bind MotionValues to transform x/y. 
        // This applies the initial offset AND updates automatically on drag.
        x,
        y
      }}
      
      onPointerDownCapture={onFocus}
      
      className="w-[90vw] md:w-[900px] h-[75vh] bg-[#f5f5f5]/95 backdrop-blur-3xl rounded-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col"
    >
      {/* === WINDOW HEADER (DRAG HANDLE) === */}
      <div 
        className={`h-10 bg-gradient-to-b from-[#e6e6e6] to-[#dcdcdc] border-b border-[#bfbfbf] flex items-center px-4 justify-between shrink-0 z-20 select-none touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          dragControls.start(e);
        }}
      >
        <div className="flex gap-2 group/traffic" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center transition-all shadow-sm"><X className="w-2 h-2 text-black/60 opacity-0 group-hover/traffic:opacity-100 transition-opacity" /></button>
          <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a126] flex items-center justify-center transition-all shadow-sm"><Minus className="w-2 h-2 text-black/60 opacity-0 group-hover/traffic:opacity-100 transition-opacity" /></button>
          <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1ea832] flex items-center justify-center transition-all shadow-sm"><Maximize2 className="w-2 h-2 text-black/60 opacity-0 group-hover/traffic:opacity-100 transition-opacity" /></button>
        </div>
        <div className="flex items-center gap-1.5 opacity-70 pointer-events-none">
          <span className="text-[13px] font-semibold text-gray-700 tracking-tight shadow-white drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
            {project.title.replace('\n', ' ')}
          </span>
        </div>
        <div className="w-10" /> 
      </div>

      {/* CONTENT */}
      <div 
        className="flex-1 overflow-hidden relative flex flex-col"
        onPointerDown={(e) => e.stopPropagation()} // Prevent content clicks from starting dragging
      >
        {/* RENDERERS */}
        {project.id === 'netease' ? (
          <div className="flex-1 bg-[#f3f3f3] flex flex-col items-center justify-center p-4 md:p-8">
             <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
               <div className="p-4 bg-[#C20C0C] flex items-center justify-between text-white shadow-md z-10 relative">
                  <div className="flex items-center gap-3">
                     <div className="bg-black/20 p-1.5 rounded-full"><Music className="w-5 h-5" /></div>
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
                          onBlur={(e) => { if(e.target.value) setNeteaseId(e.target.value); setIsEditingId(false); }}
                          onKeyDown={(e) => { if(e.key === 'Enter') { if(e.currentTarget.value) setNeteaseId(e.currentTarget.value); setIsEditingId(false); }}}
                        />
                      ) : (
                        <div onClick={() => setIsEditingId(true)} className="group/edit flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
                           <span className="font-mono font-bold">{neteaseId}</span>
                           <Edit2 className="w-3 h-3 opacity-50 group-hover/edit:opacity-100" />
                        </div>
                      )}
                  </div>
               </div>
               <div className="w-full bg-gray-50 relative">
                  <iframe key={neteaseId} frameBorder="no" width="100%" height="430" src={`https://music.163.com/outchain/player?type=0&id=${neteaseId}&auto=1&height=430`} className="relative z-10 block"></iframe>
               </div>
            </div>
         </div>
        ) : project.id === 'localmusic' ? (
           <div className="flex-1 bg-white/50 backdrop-blur-xl flex flex-col items-center justify-center p-10 relative overflow-hidden">
              <audio ref={audioRef} src={tracks[0].url} onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)} />
              <div className="relative w-64 h-64 rounded-full bg-black border-4 border-black/10 shadow-2xl mb-8 flex items-center justify-center overflow-hidden">
                 <motion.img src={tracks[0].cover} className="w-full h-full object-cover opacity-80" animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
                 <div className="absolute w-20 h-20 bg-gray-200 rounded-full border border-gray-300 shadow-inner" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{tracks[0].title}</h2>
              <p className="text-gray-500 mb-8">{tracks[0].artist}</p>
              <button onClick={togglePlay} className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                 {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current ml-1" />}
              </button>
           </div>
        ) : (
           // Default Gallery Layout
           <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-[#fdfdfd]">
              <div className="p-8 pb-4 bg-white/50 sticky top-0 z-10 backdrop-blur-md border-b border-gray-200/50">
                 <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{project.title}</h1>
                 <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">{project.category}</p>
                 <p className="text-gray-600 leading-relaxed max-w-3xl">{project.description}</p>
              </div>
              <div className="p-8">
                {isSingleItem ? (
                   <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-xl border border-black/5 shadow-inner p-4">
                      {mediaList[0].type === 'video' ? <video src={mediaList[0].url} controls className="h-full object-contain" /> : <img src={mediaList[0].url} className="h-full object-contain" />}
                   </div>
                ) : (
                   <div className="grid grid-cols-2 gap-6">
                      {mediaList.map((m, i) => <GalleryMedia key={i} item={m} index={i} />)}
                   </div>
                )}
              </div>
           </div>
        )}
      </div>
    </MotionDiv>
  );
};

export default Window;
