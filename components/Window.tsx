import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Project, MediaItem } from '../types';
import { X, Minus, Maximize2, Music, Edit2, Grid, Bookmark, User, Settings, Heart, MessageCircle, Play, Pause, SkipBack, SkipForward, Plus, Volume2, Disc } from 'lucide-react';
import SolarSystem from './SolarSystem'; 

interface WindowProps {
  project: Project | null;
  onClose: () => void;
  zIndex?: number;
  onFocus?: () => void;
}

interface AudioTrack {
    title: string;
    artist: string;
    url: string;
    cover?: string;
}

// --- SMART GRID ITEM COMPONENT ---
// Automatically spans 2 columns for Video or Landscape Images
const GalleryMedia: React.FC<{ item: MediaItem; index: number }> = ({ item, index }) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const isVideo = item.type === 'video';

  // If it's a video, we force it to span 2 cols immediately
  // If it's an image, we wait for load to detect aspect ratio
  const colSpanClass = isVideo || isLandscape ? 'col-span-2' : 'col-span-1';

  return (
    <motion.div 
      className={`relative group z-0 break-inside-avoid mb-4 ${colSpanClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <motion.div
        className="w-full h-full relative rounded-lg overflow-hidden bg-gray-200 shadow-sm border border-black/5"
        whileHover={{ 
            y: -5,
            scale: 1.01,
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
                    // Check aspect ratio: if width > height * 1.1, treat as landscape
                    if (img.naturalWidth > img.naturalHeight * 1.1) {
                      setIsLandscape(true);
                    }
                    setLoaded(true);
                  }}
                />
                {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse min-h-[200px]" />}
                
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 border border-white/10 rounded-lg z-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                </div>
              </>
          )}
      </motion.div>
    </motion.div>
  );
};

const Window: React.FC<WindowProps> = ({ project, onClose, zIndex = 20, onFocus }) => {
  const dragControls = useDragControls();
  const [isWindowDragging, setIsWindowDragging] = useState(false);
  
  // Random offset for window position so new windows don't perfectly overlap existing ones
  // Using ref to keep it constant across re-renders of this specific window instance
  const offset = useRef({
    x: Math.floor(Math.random() * 60) - 30, // -30px to 30px
    y: Math.floor(Math.random() * 60) - 30
  });

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
  const musicInputRef = useRef<HTMLInputElement>(null);

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

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
          const newTracks: AudioTrack[] = Array.from(files).map((file: File) => ({
              title: file.name.replace(/\.[^/.]+$/, ""),
              artist: 'Local File',
              url: URL.createObjectURL(file),
              cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=200&q=80'
          }));
          setTracks([...tracks, ...newTracks]);
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

  const mediaList: MediaItem[] = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [
        ...(project.videoUrl ? [{ type: 'video' as const, url: project.videoUrl }] : []),
        { type: 'image' as const, url: project.previewImage }
      ];
  
  // Single item mode check
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
    <motion.div
      // Center position + Random Offset logic
      initial={{ opacity: 0, scale: 0.9, x: `calc(-50% + ${offset.current.x}px)`, y: `calc(-40% + ${offset.current.y}px)` }}
      animate={{ opacity: 1, scale: 1, x: `calc(-50% + ${offset.current.x}px)`, y: `calc(-50% + ${offset.current.y}px)` }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag
      dragListener={false} 
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsWindowDragging(true)}
      onDragEnd={() => setIsWindowDragging(false)}
      // Z-Index Layering
      style={{ zIndex }}
      // Focus Handler
      onPointerDown={onFocus}
      className="fixed top-1/2 left-1/2 w-[90vw] md:w-[900px] h-[75vh] bg-[#f5f5f5]/95 backdrop-blur-3xl rounded-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col"
    >
      {/* Window Header - Draggable Area */}
      <div 
        className={`h-10 bg-gradient-to-b from-[#e6e6e6] to-[#dcdcdc] border-b border-[#bfbfbf] flex items-center px-4 justify-between shrink-0 z-20 select-none touch-none ${isWindowDragging ? 'cursor-grabbing' : 'cursor-grab active:cursor-grabbing'}`}
        onPointerDown={(e) => {
          // CRITICAL: prevent default to ensure drag works smoothly and prevents text selection
          e.preventDefault(); 
          e.stopPropagation();
          if(onFocus) onFocus();
          dragControls.start(e);
        }}
      >
        <div className="flex gap-2 group/traffic" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center transition-all shadow-sm"><X className="w-2 h-2 text-black/60 opacity-0 group-hover/traffic:opacity-100 transition-opacity" /></button>
          <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a126] flex items-center justify-center transition-all shadow-sm"><Minus className="w-2 h-2 text-black/60 opacity-0 group-hover/traffic:opacity-100 transition-opacity" /></button>
          <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1ea832] flex items-center justify-center transition-all shadow-sm"><Maximize2 className="w-2 h-2 text-black/60 opacity-0 group-hover/traffic:opacity-100 transition-opacity" /></button>
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
        <div className="flex-1 bg-[#f3f3f3] flex flex-col items-center justify-center p-4 md:p-8">
           {/* Netease Layout */}
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
         <div className="flex-1 bg-white/50 backdrop-blur-3xl flex overflow-hidden relative">
            <audio ref={audioRef} src={tracks[currentTrackIndex]?.url} onTimeUpdate={handleTimeUpdate} onEnded={nextTrack} />
            
            {/* Background Blur */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
               <motion.img 
                 key={tracks[currentTrackIndex]?.cover}
                 src={tracks[currentTrackIndex]?.cover} 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.4 }}
                 transition={{ duration: 1 }}
                 className="w-full h-full object-cover blur-[100px] scale-150" 
               />
               <div className="absolute inset-0 bg-white/40" />
            </div>

            {/* Sidebar */}
            <div className="w-80 border-r border-white/20 bg-white/40 backdrop-blur-md flex flex-col z-10 relative">
               <div className="p-4 border-b border-white/20 flex justify-between items-center bg-white/20">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                    <Disc className="w-4 h-4" /> Library
                  </span>
                  <button 
                    onClick={() => musicInputRef.current?.click()} 
                    className="p-1.5 hover:bg-white/50 rounded-full text-gray-600 transition-colors" 
                    title="Add Music"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <input type="file" ref={musicInputRef} className="hidden" accept="audio/*" multiple onChange={handleMusicUpload} />
               </div>
               <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                   {tracks.map((track, i) => (
                       <div 
                          key={i} 
                          onClick={() => playTrack(i)} 
                          className={`p-2.5 rounded-lg cursor-pointer flex items-center gap-3 transition-all ${i === currentTrackIndex ? 'bg-white/80 shadow-sm text-black' : 'hover:bg-white/40 text-gray-700'}`}
                       >
                          <div className="w-10 h-10 rounded-md bg-gray-300 overflow-hidden shrink-0 relative shadow-inner">
                             {track.cover && <img src={track.cover} className="w-full h-full object-cover"/>}
                             {i === currentTrackIndex && isPlaying && (
                               <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-[2px]">
                                  <div className="w-[2px] h-3 bg-white animate-[bounce_1s_infinite]" />
                                  <div className="w-[2px] h-5 bg-white animate-[bounce_1.2s_infinite]" />
                                  <div className="w-[2px] h-4 bg-white animate-[bounce_0.8s_infinite]" />
                               </div>
                             )}
                          </div>
                          <div className="overflow-hidden min-w-0">
                              <div className="text-sm font-semibold truncate leading-tight">{track.title}</div>
                              <div className="text-xs truncate opacity-70 mt-0.5">{track.artist}</div>
                          </div>
                       </div>
                   ))}
               </div>
            </div>

            {/* Main Player Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
                
                {/* Spinning Vinyl Album Art */}
                <div className="relative mb-10">
                   <motion.div 
                      className="w-72 h-72 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden border-4 border-black/5 bg-black relative"
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "center" }}
                   >
                      <img src={tracks[currentTrackIndex]?.cover} className="w-full h-full object-cover opacity-90" />
                      {/* Vinyl Shine Overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_50%,rgba(255,255,255,0.1)_100%)] pointer-events-none" />
                      <div className="absolute inset-0 rounded-full border-[20px] border-black/10 pointer-events-none" />
                   </motion.div>
                   {/* Center Hole */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/30 backdrop-blur-xl rounded-full border border-white/40 flex items-center justify-center shadow-inner z-20">
                      <div className="w-3 h-3 bg-black/80 rounded-full shadow-sm" />
                   </div>
                </div>

                {/* Info */}
                <div className="text-center mb-8 space-y-1">
                    <h3 className="text-3xl font-bold text-gray-800 drop-shadow-sm tracking-tight">{tracks[currentTrackIndex]?.title}</h3>
                    <p className="text-lg text-gray-600 font-medium">{tracks[currentTrackIndex]?.artist}</p>
                </div>

                {/* Glass Control Bar */}
                <div className="w-full max-w-lg bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/50">
                    {/* Progress */}
                    <div className="w-full mb-4 group">
                        <div 
                          className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all"
                          onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); if(audioRef.current) audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration; }}
                        >
                            <div className="h-full bg-black/80 rounded-full relative" style={{ width: `${(currentTime / duration) * 100}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 mt-1.5 font-medium font-mono">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-8">
                        <motion.button 
                          whileTap={{ scale: 0.9 }} 
                          onClick={prevTrack} 
                          className="text-gray-600 hover:text-black transition-colors p-2 hover:bg-black/5 rounded-full"
                        >
                          <SkipBack className="w-6 h-6 fill-current" />
                        </motion.button>
                        
                        <motion.button 
                          whileTap={{ scale: 0.9 }} 
                          onClick={togglePlay}
                          className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all"
                        >
                            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                        </motion.button>
                        
                        <motion.button 
                          whileTap={{ scale: 0.9 }} 
                          onClick={nextTrack} 
                          className="text-gray-600 hover:text-black transition-colors p-2 hover:bg-black/5 rounded-full"
                        >
                          <SkipForward className="w-6 h-6 fill-current" />
                        </motion.button>
                    </div>
                </div>
            </div>
         </div>

      ) : project.id === 'insta' ? (
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar flex flex-col items-center">
           {/* Insta Layout */}
           <div className="w-full max-w-3xl py-8 px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-12 border-b border-gray-200 pb-12">
               <div className="relative shrink-0 cursor-pointer">
                  <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976]">
                    <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden"><img src={project.thumbnail} alt="Profile" className="w-full h-full object-cover" /></div>
                  </div>
               </div>
               <div className="flex-1 flex flex-col items-center md:items-start gap-4 w-full">
                  <div className="flex flex-col md:flex-row items-center gap-4 w-full"><h2 className="text-xl font-normal text-gray-800">DUBHE</h2></div>
                  <div className="flex items-center gap-8 text-base"><div className="flex gap-1"><span className="font-bold text-gray-900">{mediaList.length}</span> posts</div><div className="flex gap-1"><span className="font-bold text-gray-900">12.4k</span> followers</div><div className="flex gap-1"><span className="font-bold text-gray-900">432</span> following</div></div>
                  <div className="text-sm text-gray-900 text-center md:text-left"><p className="font-semibold">MYT</p><p className="whitespace-pre-line">{project.description}</p><a href="#" className="text-[#00376b] font-semibold hover:underline mt-1 block">www.meiyitou.top</a></div>
               </div>
            </div>
            <div className="grid grid-cols-3 gap-1 md:gap-7">
              {mediaList.map((item, idx) => (
                 <div key={idx} className="group relative aspect-square bg-gray-100 cursor-pointer overflow-hidden">
                    {item.type === 'video' ? <video src={item.url} className="w-full h-full object-cover" /> : <img src={item.url} alt="Post" className="w-full h-full object-cover" />}
                 </div>
              ))}
            </div>
          </div>
        </div>
      ) : project.id === 'solar' ? (
        <div className="flex-1 bg-black relative overflow-hidden">
           <SolarSystem />
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

            <div className="p-6 md:px-8 pb-12 flex-1">
              {isSingleItem ? (
                /* === HERO LAYOUT (SINGLE ITEM) === */
                <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden shadow-inner border border-black/5">
                   {mediaList[0].type === 'video' ? (
                      <video 
                        src={mediaList[0].url}
                        controls
                        className="max-w-full max-h-full object-contain" 
                        preload="metadata"
                      />
                   ) : (
                      <img 
                        src={mediaList[0].url} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-contain"
                      />
                   )}
                </div>
              ) : (
                /* === SMART GRID LAYOUT (MULTI ITEM) === */
                <div className="grid grid-cols-2 gap-6 auto-rows-auto">
                  {mediaList.map((item, idx) => (
                    <GalleryMedia key={idx} item={item} index={idx} />
                  ))}
                </div>
              )}
            </div>
        </div>
      )}

    </motion.div>
  );
};

export default Window;