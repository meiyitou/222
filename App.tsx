import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { PROJECTS } from './constants';
import DesktopIcon from './components/DesktopIcon';
import Dock from './components/Dock';
import Window from './components/Window';
import { Filter } from 'lucide-react';

// High quality blurred background placeholder
const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop";

const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(PROJECTS[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleIconClick = (project: Project) => {
    setActiveProject(project);
  };

  const handleCloseWindow = () => {
    setActiveProject(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 text-sans select-none">
      
      {/* Wallpaper Layer with Blur */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      >
        {/* Heavy blur overlay to match screenshot style */}
        <div className="absolute inset-0 backdrop-blur-[80px] bg-white/30" />
        
        {/* Radial gradient for depth (vignette) */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20" />
      </div>

      {/* Interactive Desktop Layer */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        
        {/* Desktop Icons - Absolute Positioning */}
        {/* Hidden on mobile, specific grid for mobile could be added, but scaling down for "Replica" feel */}
        <div className="w-full h-full relative scale-75 md:scale-100 origin-top-left">
           {PROJECTS.map((project) => (
             <DesktopIcon 
               key={project.id} 
               project={project} 
               onClick={handleIconClick} 
             />
           ))}
        </div>

        {/* Floating decoration (Top Right cluster from screenshot) */}
        <div className="absolute top-20 right-10 flex flex-col gap-4 items-end pointer-events-none">
           {/* A mimic of the widget on the right side */}
           <div className="w-12 h-12 bg-gray-100/50 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg relative">
               <Filter className="text-gray-800 w-5 h-5" />
               <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white">1</div>
           </div>
           
           <div className="flex flex-col gap-2 bg-white/20 p-2 rounded-lg backdrop-blur-md">
              <div className="w-6 h-6 bg-gray-200/80 rounded flex items-center justify-center text-[10px]">⌘</div>
              <div className="w-6 h-6 bg-pink-200/80 rounded flex items-center justify-center text-[10px]">A</div>
           </div>
        </div>
      </div>

      {/* Active Window Modal */}
      <Window project={activeProject} onClose={handleCloseWindow} />

      {/* Dock */}
      <Dock />
    </div>
  );
};

export default App;