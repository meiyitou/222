import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WALLPAPERS } from '../constants';

interface WallpaperPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  currentWallpaper: string;
}

const MotionDiv = motion.div as any;

const WallpaperPicker: React.FC<WallpaperPickerProps> = ({ isOpen, onClose, onSelect, currentWallpaper }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] md:w-[700px] h-[500px] bg-[#f5f5f5]/95 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 flex flex-col overflow-hidden font-sans text-gray-800"
      >
        {/* Header */}
        <div className="h-12 border-b border-gray-300/50 flex items-center justify-center relative shrink-0 bg-white/40">
          <div className="absolute left-4 flex gap-2 group">
             <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:brightness-90 transition-all" />
             <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a126] hover:brightness-90 transition-all" />
             <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1ea832] hover:brightness-90 transition-all" />
          </div>
          <span className="font-semibold text-[13px] text-gray-600">Wallpaper Settings</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          
          <div className="mb-6">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 ml-1">Project Presets</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {WALLPAPERS.map((wp) => (
                  <div 
                    key={wp.id} 
                    className={`group relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${currentWallpaper === wp.url ? 'border-blue-500 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                    onClick={() => onSelect(wp.url)}
                  >
                     <img src={wp.url} alt={wp.label} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                     <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md p-1.5">
                        <span className="text-[10px] text-white font-medium block text-center">{wp.label}</span>
                     </div>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </MotionDiv>
    </AnimatePresence>
  );
};

export default WallpaperPicker;