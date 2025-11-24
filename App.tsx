import React, { useState, useEffect, useRef } from 'react';
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
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  // State for projects
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [dockApps, setDockApps] = useState<Record<string, Project>>(DOCK_APPS_CONTENT);
  
  // --- MULTI-WINDOW STATE ---
  // Use an array to store all currently open projects
  const [openWindows, setOpenWindows] = useState<Project[]>([]);
  // Track the stacking order of windows by their ID (last element = top)
  const [windowOrder, setWindowOrder] = useState<string[]>([]);
  
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isWallpaperPickerOpen, setIsWallpaperPickerOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState<string>(DEFAULT_WALLPAPER);
  const [showFireworks, setShowFireworks] = useState(false);
  const wallpaperInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setWallpaper(DEFAULT_WALLPAPER);
  }, [DEFAULT_WALLPAPER]);

  // Determine active app name (Topmost window title)
  const activeWindowId = windowOrder[windowOrder.length - 1];
  const activeWindow = openWindows.find(p => p.id === activeWindowId);
  const activeAppName = isTerminalOpen ? 'Terminal' : isWallpaperPickerOpen ? 'System Settings' : (activeWindow ? activeWindow.title : 'Finder');

  // --- WINDOW MANAGEMENT ---

  // Bring a window to the front
  const focusWindow = (id: string) => {
    setWindowOrder(prev => {
      // If it's already at the end, no need to update state (prevents re-renders)
      if (prev[prev.length - 1] === id) return prev;
      
      const others = prev.filter(windowId => windowId !== id);
      return [...others, id];
    });
  };

  // Open a new window or focus existing one
  const handleOpenProject = (project: Project) => {
    const isAlreadyOpen = openWindows.find(p => p.id === project.id);
    
    if (isAlreadyOpen) {
      focusWindow(project.id);
    } else {
      // Add to open list and put on top of order
      setOpenWindows(prev => [...prev, project]);
      setWindowOrder(prev => [...prev, project.id]);
    }
  };

  // Close a specific window
  const handleCloseWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(p => p.id !== id));
    setWindowOrder(prev => prev.filter(windowId => windowId !== id));
  };

  const handleIconClick = (project: Project) => {
    handleOpenProject(project);
  };

  const handleUpdateMedia = (id: string, file: File) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const url = URL.createObjectURL(file);
        if (file.type.startsWith('image/')) {
          // Update thumbnail/preview and gallery if needed
          let newGallery = p.gallery ? [...p.gallery] : [];
          // If gallery exists and has images, replace the first image
          const firstImageIdx = newGallery.findIndex(item => item.type === 'image');
          if (firstImageIdx !== -1) {
            newGallery[firstImageIdx] = { ...newGallery[firstImageIdx], url };
          } else if (p.gallery) {
            // If gallery exists but no images (only videos?), add image to start
            newGallery.unshift({ type: 'image', url });
          }

          return {
            ...p,
            thumbnail: url,
            previewImage: url,
            gallery: p.gallery ? newGallery : undefined
          };
        } else if (file.type.startsWith('video/')) {
          return {
            ...p,
            videoUrl: url
          };
        }
      }
      return p;
    }));
  };

  const handleDockIconClick = (appId: string) => {
    if (appId === 'terminal') {
      setIsTerminalOpen(true);
      return;
    }
    const content = dockApps[appId];
    if (content) {
      handleOpenProject(content);
    }
  };

  const handleTerminalSpecialCommand = (cmd: string) => {
    if (cmd === 'fireworks') {
      setShowFireworks(true);
    }
  };

  const handleWallpaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWallpaper(URL.createObjectURL(file));
    }
  };

  const handleBackgroundContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWallpaperPickerOpen(true);
  };
  
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 font-sans select-none text-gray-800">
      
      <TopBar activeApp={activeAppName} />

      {showFireworks && (
        <Fireworks onComplete={() => setShowFireworks(false)} />
      )}

      <input 
        type="file" 
        ref={wallpaperInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={handleWallpaperChange}
      />

      {/* Wallpaper Layer */}
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
        <div className="absolute bottom-2 right-2 text-white/30 text-[10px] pointer-events-none opacity-0 hover:opacity-100 transition-opacity z-10 drop-shadow-md">
          Right-click to change wallpaper
        </div>
      </div>

      {/* Desktop Icons Layer */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none pt-8">
        <div className="w-full h-full relative scale-75 md:scale-100 origin-top-left pointer-events-auto">
           {projects.map((project) => (
             <DesktopIcon 
               key={project.id} 
               project={project} 
               onClick={handleIconClick}
               onUpdateMedia={handleUpdateMedia}
             />
           ))}
        </div>
      </div>

      {/* --- WINDOWS RENDERER --- */}
      <AnimatePresence>
        {openWindows.map((project) => {
          // Calculate Z-Index based on order array
          const orderIndex = windowOrder.indexOf(project.id);
          // Base z-index 20
          const zIndex = 20 + orderIndex; 
          
          return (
            <Window 
              key={project.id}
              project={project} 
              zIndex={zIndex}
              onClose={() => handleCloseWindow(project.id)} 
              onFocus={() => focusWindow(project.id)}
            />
          );
        })}
      </AnimatePresence>

      <Terminal 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        projects={projects}
        onOpenProject={handleOpenProject}
        onSpecialCommand={handleTerminalSpecialCommand}
      />
      
      <WallpaperPicker 
        isOpen={isWallpaperPickerOpen}
        onClose={() => setIsWallpaperPickerOpen(false)}
        onSelect={(url) => setWallpaper(url)}
        currentWallpaper={wallpaper}
      />

      <Dock onAppClick={handleDockIconClick} />
    </div>
  );
};

export default App;