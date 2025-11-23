
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Project, MediaItem } from '../types';
import { X, Minus, Maximize2, Music, Edit2, Grid, Bookmark, User, Settings, Heart, MessageCircle, Play, Pause, SkipBack, SkipForward, Plus, Volume2 } from 'lucide-react';
import SolarSystem from './SolarSystem'; 

interface WindowProps {
  project: Project | null;
  onClose: () => void;
}

interface AudioTrack {
    title: string;
    artist: string;
    url: string;
    cover?: string;
}

const Window: React.FC<WindowProps> = ({ project, onClose }) => {
  const dragControls = useDragControls();
  
  // Netease specific state
  const [neteaseId, setNeteaseId] = useState('3778678'); 
  const [isEditingId, setIsEditingId] = useState(false);
  
  // Local Music Player State
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

  // Normalize media into a list (for Gallery apps)
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
        initial={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
        animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
        exit={{ opacity: 0, scale: 0.95, y: "-40%", x: "-50%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag
        dragListener={false} 
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.1}
        // 900px width, 75vh height, Centered
        className="fixed top-1/2 left-1/2 z-40 w-[90vw] md:w-[900px] h-[75vh] bg-[#f5f5f5]/95 backdrop-blur-3xl rounded-xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col"
      >
        {/* Window Header */}
        <div 
          className="h-10 bg-gradient-to-b from-[#e6e6e6] to-[#dcdcdc] border-b border-[#bfbfbf] flex items-center px-4 justify-between shrink-0 z-20 select-none cursor-grab active:cursor-grabbing touch-none"
          onPointerDown={(e) => {
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
          /* === NETEASE PLAYER MODE === */
          <div className="flex-1 bg-[#f3f3f3] flex flex-col items-center justify-center p-4 md:p-8">
             <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
               <div className="p-4 bg-[#dd001b] flex items-center justify-between text-white shadow-md z-10 relative">
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
           /* === LOCAL MUSIC PLAYER MODE === */
           <div className="flex-1 bg-white/50 backdrop-blur-xl flex overflow-hidden">
              <audio ref={audioRef} src={tracks[currentTrackIndex]?.url} onTimeUpdate={handleTimeUpdate} onEnded={nextTrack} />
              <div className="w-1/3 border-r border-gray-200/50 bg-gray-50/50 flex flex-col">
                 <div className="p-3 border-b border-gray-200/50 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Library</span>
                    <button onClick={() => musicInputRef.current?.click()} className="p-1 hover:bg-gray-200 rounded text-gray-600" title="Add Music"><Plus className="w-4 h-4" /></button>
                    <input type="file" ref={musicInputRef} className="hidden" accept="audio/*" multiple onChange={handleMusicUpload} />
                 </div>
                 <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                     {tracks.map((track, i) => (
                         <div key={i} onClick={() => playTrack(i)} className={`p-2 rounded-lg mb-1 cursor-pointer flex items-center gap-3 transition-colors ${i === currentTrackIndex ? 'bg-pink-500 text-white shadow-md' : 'hover:bg-gray-200/50 text-gray-700'}`}>
                            <div className="w-8 h-8 rounded-md bg-gray-300 overflow-hidden shrink-0">{track.cover && <img src={track.cover} className="w-full h-full object-cover"/>}</div>
                            <div className="overflow-hidden"><div className="text-sm font-semibold truncate">{track.title}</div><div className={`text-xs truncate ${i === currentTrackIndex ? 'text-pink-100' : 'text-gray-400'}`}>{track.artist}</div></div>
                         </div>
                     ))}
                 </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                  <div className="absolute inset-0 z-0 opacity-30"><img src={tracks[currentTrackIndex]?.cover} className="w-full h-full object-cover blur-3xl scale-150" /></div>
                  <div className="w-64 h-64 rounded-2xl shadow-2xl overflow-hidden mb-8 z-10 relative border border-white/20"><img src={tracks[currentTrackIndex]?.cover} className="w-full h-full object-cover" /></div>
                  <div className="text-center z-10 mb-8"><h3 className="text-2xl font-bold text-gray-800 drop-shadow-sm">{tracks[currentTrackIndex]?.title}</h3><p className="text-gray-500 font-medium">{tracks[currentTrackIndex]?.artist}</p></div>
                  <div className="w-full max-w-md z-10 mb-6 group">
                      <div className="w-full h-1.5 bg-gray-300/50 rounded-full overflow-hidden cursor-pointer" onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); if(audioRef.current) audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * duration; }}>
                          <div className="h-full bg-pink-500 rounded-full relative" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
                  </div>
                  <div className="flex items-center gap-8 z-10">
                      <button onClick={prevTrack} className="text-gray-600 hover:text-black transition-colors"><SkipBack className="w-6 h-6 fill-current" /></button>
                      <button onClick={togglePlay} className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all">{isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}</button>
                      <button onClick={nextTrack} className="text-gray-600 hover:text-black transition-colors"><SkipForward className="w-6 h-6 fill-current" /></button>
                  </div>
              </div>
           </div>

        ) : project.id === 'insta' ? (
          /* === INSTAGRAM APP MODE === */
          <div className="flex-1 bg-white overflow-y-auto custom-scrollbar flex flex-col items-center">
             <div className="w-full max-w-3xl py-8 px-4 md:px-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-12 border-b border-gray-200 pb-12">
                 <div className="relative shrink-0 cursor-pointer">
                    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full p-[3px] bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976]">
                      <div className="w-full h-full rounded-full border-2 border-white bg-white overflow-hidden"><img src={project.thumbnail} alt="Profile" className="w-full h-full object-cover" /></div>
                    </div>
                 </div>
                 <div className="flex-1 flex flex-col items-center md:items-start gap-4 w-full">
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full"><h2 className="text-xl font-normal text-gray-800">bychudy</h2></div>
                    <div className="flex items-center gap-8 text-base"><div className="flex gap-1"><span className="font-bold text-gray-900">{mediaList.length}</span> posts</div><div className="flex gap-1"><span className="font-bold text-gray-900">12.4k</span> followers</div><div className="flex gap-1"><span className="font-bold text-gray-900">432</span> following</div></div>
                    <div className="text-sm text-gray-900 text-center md:text-left"><p className="font-semibold">Bartek Chudy</p><p className="whitespace-pre-line">{project.description}</p><a href="#" className="text-[#00376b] font-semibold hover:underline mt-1 block">bychudy.com</a></div>
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
          /* === SOLAR SYSTEM APP MODE === */
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

              {/* MASONRY LAYOUT (Waterfall) - Optimized for Portrait/Landscape */}
              <div className="p-6 md:px-8 pb-12">
                <div className="columns-1 md:columns-2 gap-6 space-y-6">
                  {mediaList.map((item, idx) => {
                    return (
                      <motion.div 
                        key={idx} 
                        className="break-inside-avoid mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                      >
                        <motion.div
                          className="w-full relative rounded-lg overflow-hidden bg-gray-200 shadow-sm border border-black/5 group"
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
                                  className="w-full h-auto block" // h-auto allows natural aspect ratio
                                  preload="metadata"
                                />
                            ) : (
                                <>
                                  <motion.img 
                                    src={item.url} 
                                    alt={`Media ${idx + 1}`} 
                                    className="w-full h-auto block" // h-auto for natural aspect ratio (Vertical/Horizontal)
                                    whileHover={{ scale: 1.05 }}
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
                {/* Upload functionality totally removed */}
              </div>
          </div>
        )}

      </motion.div>
    </AnimatePresence>
  );
};

export default Window;
