
import React from 'react';
import { DOCK_ITEMS } from '../constants';
import { Mail, Instagram, AlertTriangle, Music } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper to render the specific app icon style with high fidelity
const DockIconGraphic: React.FC<{ type: string }> = ({ type }) => {
  // Base shape and common styles for all icons
  // Removed CSS hover/active scales to let Framer Motion handle the physics
  const baseClass = "w-12 h-12 md:w-14 md:h-14 rounded-[14px] shadow-xl flex items-center justify-center text-white text-xl md:text-2xl font-sans font-bold relative overflow-hidden ring-1 ring-white/10 select-none pointer-events-none";

  switch (type) {
    case 'ae':
      return (
        <div className={`${baseClass} bg-[#00005b] text-[#d6bbfb] border-[0.5px] border-[#d6bbfb]/20`}>
          <span className="mt-0.5 tracking-tight">Ae</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      );
    case 'ps':
      return (
        <div className={`${baseClass} bg-[#001e36] text-[#31a8ff] border-[0.5px] border-[#31a8ff]/20`}>
          <span className="mt-0.5 tracking-tight">Ps</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      );
    case 'ai':
      return (
        <div className={`${baseClass} bg-[#330000] text-[#ff9a00] border-[0.5px] border-[#ff9a00]/20`}>
          <span className="mt-0.5 tracking-tight">Ai</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      );
    case 'terminal':
      return (
        <div className={`${baseClass} bg-[#1a1b1e] border-[0.5px] border-gray-600`}>
          <div className="text-[#4ade80] font-mono text-lg font-bold mr-1">{`>_`}</div>
          <div className="absolute top-1 left-0 w-full h-[1px] bg-white/10"></div>
        </div>
      );
    case 'warning':
      return (
        <div className={`${baseClass} bg-[#fbbf24] flex items-center justify-center`}>
           <AlertTriangle className="w-8 h-8 text-white fill-white stroke-2" />
        </div>
      );
    case 'notes':
      return (
        <div className={`${baseClass} bg-white flex flex-col border border-gray-200`}>
           {/* Yellow header */}
           <div className="h-[28%] w-full bg-[#fde047] border-b border-gray-300/50" />
           {/* Paper lines */}
           <div className="flex-1 w-full p-2.5 flex flex-col gap-1.5 items-start justify-start opacity-60">
              <div className="w-full h-1 bg-gray-300 rounded-full" />
              <div className="w-full h-1 bg-gray-300 rounded-full" />
              <div className="w-2/3 h-1 bg-gray-300 rounded-full" />
           </div>
        </div>
      );
    case 'photos':
      return (
        <div className={`${baseClass} bg-white relative border border-gray-200`}>
           {/* macOS Photos style petals */}
           <div className="absolute inset-0 flex items-center justify-center">
              {[
                '#ff9c00', // Orange
                '#ffcc00', // Yellow
                '#84cc16', // Lime
                '#10b981', // Emerald
                '#06b6d4', // Cyan
                '#3b82f6', // Blue
                '#a855f7', // Purple
                '#f43f5e'  // Rose
              ].map((color, i) => (
                <div key={i} 
                  className="absolute w-3 h-7 rounded-full mix-blend-multiply opacity-90 shadow-sm"
                  style={{
                    backgroundColor: color,
                    transform: `rotate(${i * 45}deg) translateY(-7px)`
                  }}
                />
              ))}
           </div>
        </div>
      );
    case 'netease':
      return (
        <div className={`${baseClass} bg-[#dd001b] flex items-center justify-center`}>
           {/* Netease Red Background + White Music Icon */}
           <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
              <Music className="w-4 h-4 text-white fill-current" />
           </div>
        </div>
      );
    case 'insta':
      return (
        <div className={`${baseClass} bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] to-[#d62976]`}>
          <Instagram className="w-8 h-8 text-white stroke-[2.5]" />
        </div>
      );
    case 'mail':
      return (
        <div className={`${baseClass} bg-[#3b82f6]`}>
          <Mail className="w-8 h-8 text-white fill-white" />
        </div>
      );
    case 'trash':
      return (
        <div className={`${baseClass} bg-transparent !shadow-none !ring-0 overflow-visible`}>
           {/* Bin Container - Mesh/Glass effect */}
           <div className="w-10 h-12 md:w-12 md:h-14 bg-gradient-to-b from-white/30 to-white/10 rounded-b-[14px] border-x-[0.5px] border-b-[0.5px] border-white/40 backdrop-blur-[2px] relative flex items-end justify-center pb-1 shadow-lg">
              
              {/* Simulated Mesh/Lines */}
              <div className="absolute inset-0 rounded-b-[14px] opacity-30 bg-[linear-gradient(0deg,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:4px_4px]" />

              {/* Crumpled Papers */}
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/90 rounded-full shadow-sm rotate-12" />
              <div className="absolute bottom-3 right-2 w-3.5 h-3.5 bg-white/90 rounded-full shadow-sm -rotate-12" />
              <div className="absolute bottom-5 left-3.5 w-3 h-3 bg-white/90 rounded-full shadow-sm rotate-45" />
              
           </div>
        </div>
      );
    default:
      return <div className={baseClass} />;
  }
};

// Separator component
const Separator = () => (
  <div className="w-[1px] h-8 md:h-10 bg-white/15 mx-1.5 md:mx-2 rounded-full" />
);

interface DockProps {
  onAppClick: (appId: string) => void;
}

const Dock: React.FC<DockProps> = ({ onAppClick }) => {
  // Indices of apps that should show the "active" dot indicator
  // Added Terminal (index 3) to active list if desired, but leaving dynamic logic to parent is better.
  // For now, visual dummy active states.
  const activeIndices = [0, 1, 2, 6, 7, 8];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto">
      {/* Dock Container */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.5 }}
        className="flex items-center px-3 py-3 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[24px] md:rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
      >
        
        {DOCK_ITEMS.map((item, index) => {
          // Logic for separators: Adobe Group | Apps Group | Trash
          // Indices: 0,1,2 | 3 (Terminal) | 4,5,6,7,8 | 9 (Trash)
          // Update logic to account for new item position
          const showSeparatorAfter = index === 2 || index === 8;
          const isActive = activeIndices.includes(index);

          return (
            <React.Fragment key={index}>
              <motion.div 
                className="group relative flex flex-col items-center mx-1 md:mx-1.5 cursor-pointer"
                onClick={() => onAppClick(item.iconType)}
                whileHover={{ scale: 1.2, y: -15 }}
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                 {/* Tooltip */}
                 <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-gray-900/90 text-white text-[11px] px-2.5 py-1 rounded-md pointer-events-none backdrop-blur-sm shadow-xl whitespace-nowrap font-medium border border-white/10 z-20">
                   {item.label}
                   {/* Tooltip Arrow */}
                   <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-r border-b border-white/10"></div>
                 </div>
                 
                 <DockIconGraphic type={item.iconType} />
                 
                 {/* Active Dot Indicator */}
                 <div className={`w-1 h-1 bg-white/60 rounded-full mt-1.5 absolute -bottom-2.5 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
              </motion.div>
              
              {showSeparatorAfter && <Separator />}
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dock;
