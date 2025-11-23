
import React, { useState, useEffect } from 'react';
import { Project } from './types';
import { PROJECTS, WALLPAPERS, DOCK_APPS_CONTENT, DEFAULT_WALLPAPER } from './constants';
import DesktopIcon from './components/DesktopIcon';
import Dock from './components/Dock';
import Window from './components/Window';
import Terminal from './components/Terminal';
import Fireworks from './components/Fireworks';
import WallpaperPicker from './components/WallpaperPicker';
import { TopBar } from './components/TopBar';
import { Filter } from 'lucide-react';

const App: React.FC = () => {
  // State for projects
  const [projects] = useState<Project[]>(PROJECTS);
  const [dockApps] = useState<Record<string, Project>>(DOCK_APPS_CONTENT);
  
  // FIXED: Set initial state to null so the desktop starts empty
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isWallpaperPickerOpen, setIsWallpaperPickerOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState<string>(DEFAULT_WALLPAPER);
  const [showFireworks, setShowFireworks] = useState(false);

  // Force update wallpaper when DEFAULT_WALLPAPER constant changes
  useEffect(() => {
    setWallpaper(DEFAULT_WALLPAPER);
  }, [DEFAULT_WALLPAPER]);

  // Determine active app name for TopBar
  const activeAppName = isTerminalOpen ? 'Terminal' : isWallpaperPickerOpen ? 'System Settings' : activeProject ? activeProject.title : 'Finder';

  const handleIconClick = (project: Project) => {
    setActiveProject(project);
  };

  const handleDockIconClick = (appId: string) => {
    if (appId === 'terminal') {
      setIsTerminalOpen(true);
      return;
    }
    const content = dockApps[appId];
    if (content) {
      setActiveProject(content);
    }
  };

  const handleCloseWindow = () => {
    setActiveProject(null);
  };

  const handleTerminalSpecialCommand = (cmd: string) => {
    if (cmd === 'fireworks') {
      setShowFireworks(true);
    }
  };

  const handleBackgroundContextMenu = (e: React.MouseEvent) => {
    // Prevent default context menu on wallpaper
    e.preventDefault();
    // Open the Wallpaper Picker
    setIsWallpaperPickerOpen(true);
  };
  
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 font-sans select-none text-gray-800">
      
      {/* macOS Top Menu Bar */}
      <TopBar activeApp={activeAppName} />

      {/* Fireworks Overlay */}
      {showFireworks && (
        <Fireworks onComplete={() => setShowFireworks(false)} />
      )}

      {/* Wallpaper Layer - Supports Context Menu */}
      <div 
        className="absolute inset-0 z-0 cursor-default"
        onContextMenu={handleBackgroundContextMenu}
      >
        <img 
          src={wallpaper}
          alt="Desktop Wallpaper"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
        {/* Hint for changing wallpaper (subtle) */}
        <div className="absolute bottom-2 right-2 text-white/30 text-[10px] pointer-events-none opacity-0 hover:opacity-100 transition-opacity z-10 drop-shadow-md">
          Right-click to change wallpaper
        </div>
      </div>

      {/* Interactive Desktop Layer */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none pt-8">
        
        {/* Desktop Icons */}
        <div className="w-full h-full relative scale-75 md:scale-100 origin-top-left pointer-events-auto">
           {projects.map((project) => (
             <DesktopIcon 
               key={project.id} 
               project={project} 
               onClick={handleIconClick} 
             />
           ))}
        </div>

        {/* Floating decoration */}
        <div className="absolute top-20 right-10 flex flex-col gap-4 items-end pointer-events-none">
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
      <Window 
        project={activeProject} 
        onClose={handleCloseWindow} 
      />

      {/* Terminal Modal */}
      <Terminal 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        projects={projects}
        onOpenProject={(p) => {
          setActiveProject(p);
        }}
        onSpecialCommand={handleTerminalSpecialCommand}
      />
      
      {/* Wallpaper Picker Modal */}
      <WallpaperPicker 
        isOpen={isWallpaperPickerOpen}
        onClose={() => setIsWallpaperPickerOpen(false)}
        onSelect={(url) => setWallpaper(url)}
        currentWallpaper={wallpaper}
      />

      {/* Dock */}
      <Dock onAppClick={handleDockIconClick} />
    </div>
  );
};

export default App;
