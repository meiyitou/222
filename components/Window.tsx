import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { Project, MediaItem } from '../types';
import { X, Minus, Maximize2, Music, Edit2, Grid, Bookmark, User, Settings, Heart, MessageCircle, Play, Pause, SkipBack, SkipForward, Plus, Volume2, Disc, Info } from 'lucide-react';
import SolarSystem from './SolarSystem';

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

// --- GALLERY ITEM COMPONENT ---
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
      <div className="w-full h-full relative rounded-lg overflow-hidden bg-gray-200 shadow-sm border border-black/5 group-hover:shadow-xl transition-all duration-300">
          {isVideo ? (
              <video src={item.url} controls className="w-full h-auto block" preload="metadata" />
          ) : (
              <>
                <img 
                  src={item.url} 
                  alt={`Media ${index}`} 
                  className={`w-full h-auto block transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth > img.naturalHeight * 1.1) setIsLandscape(true);
                    setLoaded(true);
                  }}
                />
                {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse min-h-[150px]" />}
              </>
          )}
      </div>
    </MotionDiv>
  );
};

const Window: React.FC<WindowProps> = ({ project, onClose, zIndex = 20, onFocus, initialX = 0, initialY = 0 }) => {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);
  
  // useMotionValue preserves position across re-renders
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  const [neteaseId, setNeteaseId] = useState('13904430662'); 
  const [isEditingId, setIsEditingId] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const tracks = [{ title: 'Demo Song', artist: 'Unknown Artist', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' }];

  useEffect(() => {
     if(project?.id === 'localmusic' && audioRef.current) {
         if(isPlaying) audioRef.current.play().catch(() => {}); else audioRef.current.pause();
     }
  }, [isPlaying, project]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  if (!project) return null;

  const mediaList = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [
        ...(project.videoUrl ? [{ type: 'video' as const, url: project.videoUrl }] : []),
        { type: 'image' as const, url: project.previewImage }
      ];
  
  const isSingleItem = mediaList.length === 1;
  const infoThumbnail = project.thumbnail;

  // --- RENDER CONTENT BASED ON APP ID ---
  const renderContent = () => {
    
    // === 1. INSTAGRAM UI (Priority) ===
    if (project.id === 'insta') {
      return (
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar flex flex-col items-center font-sans">
          <div className="w-full max-w-4xl py-8 px-6 md:px-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 mb-12 border-b border-gray-200 pb-12">
               {/* Avatar with Story Ring */}
               <div className="relative shrink-0 cursor-pointer group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-[3px] bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976] group-hover:scale-105 transition-transform">
                    <div className="w-full h-full rounded-full border-[3px] border-white bg-white overflow-hidden">
                      <img src={project.thumbnail} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>
               </div>

               {/* Info */}
               <div className="flex-1 flex flex-col items-center md:items-start gap-5 w-full pt-2">
                  <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                     <h2 className="text-2xl font-light text-gray-800">DUBHE</h2>
                     <div className="flex items-center gap-3">
                        <button className="px-4 py-1.5 bg-[#efefef] hover:bg-[#dbdbdb] text-sm font-semibold rounded-lg transition-colors">Edit profile</button>
                        <button className="px-4 py-1.5 bg-[#efefef] hover:bg-[#dbdbdb] text-sm font-semibold rounded-lg transition-colors">View archive</button>
                        <button className="p-2 text-gray-800"><Settings className="w-6 h-6" /></button>
                     </div>
                  </div>

                  <div className="flex items-center gap-10 text-base">
                     <div className="flex gap-1.5"><span className="font-semibold text-gray-900">{mediaList.length}</span> posts</div>
                     <div className="flex gap-1.5"><span className="font-semibold text-gray-900">12.4k</span> followers</div>
                     <div className="flex gap-1.5"><span className="font-semibold text-gray-900">432</span> following</div>
                  </div>

                  <div className="text-sm text-gray-900 text-center md:text-left space-y-1">
                     <p className="font-semibold">ovo</p>
                     <p className="whitespace-pre-line leading-snug text-gray-600">{project.description}</p>
                     <a href="#" className="text-[#00376b] font-semibold hover:underline block">meiyitou.com</a>
                  </div>
               </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-16 border-t border-gray-200 -mt-12 mb-6">
               <button className="flex items-center gap-1.5 h-[52px] border-t border-black text-xs font-semibold tracking-widest uppercase text-black -mt-[1px]">
                  <Grid className="w-3 h-3" /> Posts
               </button>
               <button className="flex items-center gap-1.5 h-[52px] border-t border-transparent text-gray-400 text-xs font-semibold tracking-widest uppercase hover:text-gray-600 transition-colors -mt-[1px]">
                  <Bookmark className="w-3 h-3" /> Saved
               </button>
               <button className="flex items-center gap-1.5 h-[52px] border-t border-transparent text-gray-400 text-xs font-semibold tracking-widest uppercase hover:text-gray-600 transition-colors -mt-[1px]">
                  <User className="w-3 h-3" /> Tagged
               </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-1 md:gap-8">
              {mediaList.map((item, idx) => (
                 <div key={idx} className="group relative aspect-square bg-gray-100 cursor-pointer overflow-hidden">
                    {item.type === 'video' ? (
                       <video src={item.url} className="w-full h-full object-cover" />
                    ) : (
                       <img src={item.url} alt="Post" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold z-10">
                        <div className="flex items-center gap-2"><Heart className="w-5 h-5 fill-white" /><span>{Math.floor(Math.random() * 500) + 120}</span></div>
                        <div className="flex items-center gap-2"><MessageCircle className="w-5 h-5 fill-white" /><span>{Math.floor(Math.random() * 20) + 2}</span></div>
                    </div>
                 </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="mt-16 text-xs text-gray-400 text-center pb-8 space-y-4">
               <div className="flex justify-center gap-4 flex-wrap">
                  {['Meta', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 'Terms'].map(l => (
                      <span key={l} className="hover:underline cursor-pointer">{l}</span>
                  ))}
               </div>
               <div>© 2025 INSTAGRAM FROM META (REPLICA)</div>
            </div>
          </div>
        </div>
      );
    }

    // 2. NETEASE MUSIC
    if (project.id === 'netease') {
      return (
        <div className="flex-1 bg-[#f3f3f3] flex flex-col items-center justify-center p-4 md:p-8">
           <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
             <div className="p-4 bg-[#C20C0C] flex items-center justify-between text-white shadow-md z-10 relative">
                <div className="flex items-center gap-3">
                   <div className="bg-black/20 p-1.5 rounded-full"><Music className="w-5 h-5" /></div>
                   <div className="flex flex-col"><span className="font-bold text-base leading-tight">Netease Cloud Music</span><span className="text-[10px] opacity-80 uppercase tracking-wider font-medium">Embedded Player</span></div>
                </div>
                <div className="flex items-center gap-2 text-sm bg-black/20 pl-3 pr-1 py-1 rounded-full border border-white/10">
                    <span className="opacity-70 text-xs font-medium">Playlist ID:</span>
                    {isEditingId ? (
                      <input autoFocus className="bg-white/90 text-black rounded px-1.5 py-0.5 border-none outline-none w-24 text-center text-xs font-mono" defaultValue={neteaseId} onBlur={(e) => { if(e.target.value) setNeteaseId(e.target.value); setIsEditingId(false); }} onKeyDown={(e) => { if(e.key === 'Enter') { if(e.currentTarget.value) setNeteaseId(e.currentTarget.value); setIsEditingId(false); }}} />
                    ) : (
                      <div onClick={() => setIsEditingId(true)} className="group/edit flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-0.5 rounded transition-colors"><span className="font-mono font-bold">{neteaseId}</span><Edit2 className="w-3 h-3 opacity-50 group-hover/edit:opacity-100" /></div>
                    )}
                </div>
             </div>
             <div className="w-full bg-gray-50 relative"><iframe key={neteaseId} frameBorder="no" width="100%" height="430" src={`https://music.163.com/outchain/player?type=0&id=${neteaseId}&auto=1&height=430`} className="relative z-10 block"></iframe></div>
          </div>
       </div>
      );
    }

    // 3. LOCAL MUSIC
    if (project.id === 'localmusic') {
      return (
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
      );
    }

    // 4. SOLAR SYSTEM
    if (project.id === 'solar') {
       return <div className="flex-1 bg-black"><SolarSystem /></div>;
    }

    // 5. DEFAULT GALLERY
    return (
      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-[#fdfdfd]">
         <div className="p-8 pb-4 bg-white/50 sticky top-0 z-10 backdrop-blur-md border-b border-gray-200/50">
            <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-white rounded-xl overflow-hidden shrink-0 shadow-md border border-gray-100"><img src={infoThumbnail} alt="" className="w-full h-full object-cover" /></div>
                <div className="flex-1 pt-1">
                   <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">{project.title}</h1>
                   <p className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-3">{project.category}</p>
                   <p className="text-gray-600 leading-relaxed max-w-3xl">{project.description}</p>
                </div>
            </div>
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
    );
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      
      drag
      dragListener={false} 
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0} 
      
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      
      // POSITION
      style={{ 
        zIndex, 
        position: 'fixed', 
        top: '50%', 
        left: '50%',
        marginTop: '-37.5vh', 
        marginLeft: '-450px', 
        x, 
        y
      }}
      
      onPointerDownCapture={onFocus}
      
      className="w-[90vw] md:w-[900px] h-[75vh] bg-[#f5f5f5]/95 backdrop-blur-3xl rounded-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col"
    >
      {/* HEADER */}
      <div 
        className={`h-10 bg-gradient-to-b from-[#e6e6e6] to-[#dcdcdc] border-b border-[#bfbfbf] flex items-center px-4 justify-between shrink-0 z-20 select-none touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          dragControls.start(e);
        }}
      >
        <div className="flex gap-2 group/traffic" onPointerDown={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:shadow-inner transition-all"><X className="w-2 h-2 text-black/50 opacity-0 group-hover/traffic:opacity-100" /></button>
          <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a126] flex items-center justify-center hover:shadow-inner transition-all"><Minus className="w-2 h-2 text-black/50 opacity-0 group-hover/traffic:opacity-100" /></button>
          <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1ea832] flex items-center justify-center hover:shadow-inner transition-all"><Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover/traffic:opacity-100" /></button>
        </div>
        <div className="flex items-center gap-1.5 opacity-70 pointer-events-none">
          <span className="text-[13px] font-semibold text-gray-700 tracking-tight shadow-white drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
            {project.id === 'insta' ? 'Instagram' : project.title.replace('\n', ' ')}
          </span>
        </div>
        <div className="w-10" /> 
      </div>

      {/* CONTENT WRAPPER */}
      <div 
        className="flex-1 overflow-hidden relative flex flex-col"
        onPointerDown={(e) => e.stopPropagation()} 
      >
        {renderContent()}
      </div>
    </MotionDiv>
  );
};

export default Window;