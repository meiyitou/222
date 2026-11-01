
import React from 'react';
import { DOCK_ITEMS } from '../constants';
import { Mail, AlertTriangle, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

// Helper to render the specific app icon style with high fidelity
const DockIconGraphic: React.FC<{ type: string }> = ({ type }) => {
  const baseClass = "w-11 h-11 md:w-[46px] md:h-[46px] rounded-[11px] shadow-[0_4px_10px_rgba(0,0,0,0.28)] flex items-center justify-center text-white text-xl md:text-2xl font-sans font-bold relative overflow-hidden ring-1 ring-white/15 select-none pointer-events-none transition-all duration-200";

  switch (type) {
    case 'chatgpt':
      return <div className={`${baseClass} bg-[#74aa9c]`}><img src="/ai-icons/chatgpt.svg" alt="" className="h-full w-full object-cover" /></div>;
    case 'gemini':
      return <div className={`${baseClass} bg-gradient-to-br from-[#2b69df] via-[#7855d9] to-[#c354a9]`}><img src="/ai-icons/gemini.svg" alt="" className="h-7 w-7" /></div>;
    case 'claude':
      return <div className={`${baseClass} bg-[#c46f53]`}><img src="/ai-icons/claude.svg" alt="" className="h-7 w-7" /></div>;
    case 'deepseek':
      return <div className={`${baseClass} bg-gradient-to-br from-[#1558c9] to-[#063a8b]`}><img src="/ai-icons/deepseek.svg" alt="" className="h-7 w-7" /></div>;
    case 'ae':
      return (
        <div className={`${baseClass} bg-[#00005b] text-[#d6bbfb]`}>
          <span className="mt-0.5 tracking-tight drop-shadow-md">Ae</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      );
    case 'ps':
      return (
        <div className={`${baseClass} bg-[#001e36] text-[#31a8ff]`}>
          <span className="mt-0.5 tracking-tight drop-shadow-md">Ps</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      );
    case 'ai':
      return (
        <div className={`${baseClass} bg-[#330000] text-[#ff9a00]`}>
          <span className="mt-0.5 tracking-tight drop-shadow-md">Ai</span>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>
      );
    case 'terminal':
      return (
        <div className={`${baseClass} bg-[#1f2937] border border-gray-600`}>
          <div className="text-gray-100 font-mono text-[10px] leading-none absolute top-1.5 left-1.5 opacity-50">
             command
          </div>
          <div className="text-[#4ade80] font-mono text-lg font-bold mr-1 mt-2">{`>_`}</div>
        </div>
      );
    case 'warning':
      return (
        <div className={`${baseClass} bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center`}>
             <div className="w-full h-full bg-[#fbbf24] flex items-center justify-center relative overflow-hidden">
                <AlertTriangle className="w-7 h-7 text-white fill-white stroke-2 drop-shadow-sm" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/30" />
             </div>
        </div>
      );
    case 'notes':
      return (
        <div className={`${baseClass} bg-white flex flex-col border-0`}>
           <div className="h-[25%] w-full bg-[#fde047] border-b border-[#eab308]/30" />
           <div className="flex-1 w-full p-2 flex flex-col gap-1.5 items-start justify-start opacity-60">
              <div className="w-full h-[2px] bg-gray-200 rounded-full" />
              <div className="w-full h-[2px] bg-gray-200 rounded-full" />
              <div className="w-2/3 h-[2px] bg-gray-200 rounded-full" />
           </div>
        </div>
      );
    case 'photos':
      return (
        <div className={`${baseClass} bg-white relative border-0`}>
           <div className="absolute inset-0 flex items-center justify-center scale-90">
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
                  className="absolute w-3 h-6 rounded-full mix-blend-multiply opacity-90 shadow-sm"
                  style={{
                    backgroundColor: color,
                    transform: `rotate(${i * 45}deg) translateY(-6px)`
                  }}
                />
              ))}
           </div>
        </div>
      );
    case 'netease':
      return (
        <div className={`${baseClass} bg-[#C20C0C] flex items-center justify-center relative overflow-hidden`}>
           <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
           <div className="relative w-7 h-7 rounded-full border-[1.5px] border-white flex items-center justify-center">
              <div className="w-3 h-4 bg-white rounded-full relative -top-[1px] -left-[1px]">
                 <div className="absolute top-1 left-1 w-1.5 h-2 bg-[#C20C0C] rounded-full" />
                 <div className="absolute top-0 right-0 w-3 h-1.5 bg-white rounded-t-full" />
                 <div className="absolute bottom-0 right-0 w-4 h-1 bg-white rounded-full rotate-[-15deg]" />
              </div>
           </div>
        </div>
      );
    case 'insta':
      return (
        <div className={`${baseClass} bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]`}>
           <Instagram className="w-8 h-8 stroke-[2.2] drop-shadow-sm" aria-hidden="true" />
        </div>
      );
    case 'mail':
      return (
        <div className={`${baseClass} bg-gradient-to-b from-[#60a5fa] to-[#3b82f6]`}>
          <Mail className="w-7 h-7 text-white fill-white drop-shadow-md" />
        </div>
      );
    case 'trash':
      return (
        <div className={`${baseClass} bg-transparent !shadow-none !ring-0 overflow-visible`}>
           <div className="w-9 h-11 md:w-[40px] md:h-[46px] bg-gradient-to-b from-white/40 to-white/20 rounded-b-[10px] border-x-[0.5px] border-b-[0.5px] border-white/40 backdrop-blur-[2px] relative flex items-end justify-center pb-1 shadow-md">
              <div className="absolute inset-0 rounded-b-[10px] opacity-40 bg-[linear-gradient(0deg,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:3px_3px]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-white rounded-sm shadow-sm rotate-12 border border-gray-200" />
              <div className="absolute bottom-3 right-2 w-3.5 h-3.5 bg-white rounded-sm shadow-sm -rotate-12 border border-gray-200" />
           </div>
        </div>
      );
    default:
      return <div className={baseClass} />;
  }
};

const Separator = () => (
  <div className="w-px h-9 shrink-0 bg-white/35 mx-1.5 md:mx-2 rounded-full" />
);

interface DockProps {
  onAppClick: (appId: string) => void;
}

const Dock: React.FC<DockProps> = ({ onAppClick }) => {
  return (
    <div className="site-dock fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
      <MotionDiv 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, delay: 0.25 }}
        className="dock-track flex items-center gap-0.5 px-1.5 py-1.5 bg-black/35 backdrop-blur-2xl border border-white/25 rounded-[17px] shadow-[0_14px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.18)]"
      >
        {DOCK_ITEMS.map((item, index) => {
          const showSeparatorAfter = index === 3 || index === 4 || index === 6 || index === 9;

          return (
            <React.Fragment key={index}>
              <MotionButton
                type="button"
                aria-label={item.label}
                className="group relative flex shrink-0 items-center justify-center mx-0.5 border-0 bg-transparent p-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-xl"
                onClick={() => onAppClick(item.iconType)}
                whileHover={{ scale: 1.12, y: -9 }}
                whileTap={{ scale: 0.92, y: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 18, mass: 0.7 }}
              >
                 <div className="absolute -top-12 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 bg-[#f7f7f7]/95 text-black/80 text-[11px] px-2.5 py-1 rounded-[6px] pointer-events-none backdrop-blur-md shadow-lg whitespace-nowrap font-medium border border-black/5 z-20 translate-y-1 group-hover:translate-y-0 transform">
                   {item.label}
                   <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#e8e8e8]/90 rotate-45 border-r border-b border-black/5"></div>
                 </div>
                 
                 <DockIconGraphic type={item.iconType} />
                 
              </MotionButton>
              
              {showSeparatorAfter && <Separator />}
            </React.Fragment>
          );
        })}
      </MotionDiv>
    </div>
  );
};

export default Dock;
