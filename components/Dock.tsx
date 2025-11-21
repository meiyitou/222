import React from 'react';
import { DOCK_ITEMS } from '../constants';
import { Mail, Trash2, Instagram, Image as ImageIcon, StickyNote, AlertTriangle } from 'lucide-react';

// Helper to render the specific app icon style
const DockIconGraphic: React.FC<{ type: string }> = ({ type }) => {
  const baseClass = "w-10 h-10 md:w-12 md:h-12 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-sm border border-white/10 relative overflow-hidden transition-all duration-300 hover:-translate-y-2";

  switch (type) {
    case 'ae':
      return (
        <div className={`${baseClass} bg-[#00005b] text-[#d29bfd] border-[#d29bfd]/30`}>
          <span>Ae</span>
        </div>
      );
    case 'ps':
      return (
        <div className={`${baseClass} bg-[#001e36] text-[#31a8ff] border-[#31a8ff]/30`}>
          <span>Ps</span>
        </div>
      );
    case 'ai':
      return (
        <div className={`${baseClass} bg-[#330000] text-[#ff9a00] border-[#ff9a00]/30`}>
          <span>Ai</span>
        </div>
      );
    case 'warning':
      return (
        <div className={`${baseClass} bg-yellow-500`}>
          <AlertTriangle className="w-6 h-6 text-white" fill="currentColor" />
        </div>
      );
    case 'notes':
      return (
        <div className={`${baseClass} bg-yellow-100`}>
           <div className="absolute top-0 left-0 w-full h-2 bg-yellow-200" />
           <StickyNote className="w-6 h-6 text-gray-600" />
        </div>
      );
    case 'photos':
      return (
        <div className={`${baseClass} bg-white relative`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100" />
           {/* Flower pattern simulation */}
           <div className="w-full h-full absolute flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-pink-500" />
           </div>
        </div>
      );
    case 'insta':
      return (
        <div className={`${baseClass} bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500`}>
          <Instagram className="w-6 h-6 text-white" />
        </div>
      );
    case 'mail':
      return (
        <div className={`${baseClass} bg-blue-500`}>
          <Mail className="w-6 h-6 text-white" fill="white" />
        </div>
      );
    case 'trash':
      return (
        <div className={`${baseClass} bg-gradient-to-b from-gray-200 to-gray-300`}>
          <Trash2 className="w-6 h-6 text-gray-600" />
        </div>
      );
    default:
      return <div className={baseClass} />;
  }
};

const Dock: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-2 md:gap-3 px-4 py-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
        {DOCK_ITEMS.map((item, index) => (
          <div key={index} className="group relative flex flex-col items-center">
             {/* Tooltip */}
             <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-[10px] px-2 py-1 rounded mb-2 pointer-events-none backdrop-blur-sm">
               {item.label}
             </div>
             <DockIconGraphic type={item.iconType} />
             {/* Active Dot Indicator (Randomly active for visual fidelity) */}
             {index < 3 && (
               <div className="w-1 h-1 bg-black/60 rounded-full mt-1" />
             )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;