
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
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [dockApps, setDockApps] = useState<Record<string, Project>>(DOCK_APPS_CONTENT);
  
  // --- MULTI-WINDOW STATE ---
  interface OpenWindowInstance {
    id: string;       
    projectId: string;
    project: Project;
    zIndex: number;
    defaultX: number; // Fixed initial offset
    defaultY: number; // Fixed initial offset
  }

  const [windows, setWindows] = useState<OpenWindowInstance[]>([]);
  const [nextZIndex, setNextZIndex] = useState(20);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isWallpaperPickerOpen, setIsWallpaperPickerOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState<string>(DEFAULT_WALLPAPER);
  const [showFireworks, setShowFireworks] = useState(false);
  const wallpaperInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setWallpaper(DEFAULT_WALLPAPER);
  }, [DEFAULT_WALLPAPER]);

  const activeWindow = windows.find(w => w.id === activeWindowId);
  const activeAppName = isTerminalOpen ? 'Terminal' : isWallpaperPickerOpen ? 'System Settings' : (activeWindow ? activeWindow.project.title : 'Finder');

  // --- WINDOW MANAGEMENT ---

  const focusWindow = (instanceId: string) => {
    if (activeWindowId === instanceId) return;

    setActiveWindowId(instanceId);
    setNextZIndex(n => n + 1);
    
    setWindows(prev => prev.map(w => 
      w.id === instanceId ? { ...w, zIndex: nextZIndex } : w
    ));
  };

  const openProject = (project: Project) => {
    const existingInstance = windows.find(w => w.projectId === project.id);

    if (existingInstance) {
      focusWindow(existingInstance.id);
    } else {
      // Calculate cascade position (30px steps)
      const count = windows.length;
      const offset = (count % 8) * 30; 

      const newInstance: OpenWindowInstance = {
        id: `${project.id}-${Date.now()}`,
        projectId: project.id,
        project: project,
        zIndex: nextZIndex,
        defaultX: offset,
        defaultY: offset
      };

      setNextZIndex(n => n + 1);
      setWindows(prev => [...prev, newInstance]);
      setActiveWindowId(newInstance.id);
    }
  };

  const closeWindow = (instanceId: string) => {
    setWindows(prev => prev.filter(w => w.id !== instanceId));
    if (activeWindowId === instanceId) {
      setActiveWindowId(null);
    }
  };

  const handleIconClick = (project: Project) => {
    openProject(project);
  };

  const handleDockIconClick = (appId: string) => {
    if (appId === 'terminal') {
      setIsTerminalOpen(true);
      return;
    }
    const content = dockApps[appId];
    if (content) {
      openProject(content);
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

  // Stub for media update
  const handleProjectMediaUpdate = (id: string, file: File) => {};
  
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

      {/* Wallpaper */}
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
      </div>

      {/* Icons */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none pt-8">
        <div className="w-full h-full relative scale-75 md:scale-100 origin-top-left pointer-events-auto">
           {projects.map((project) => (
             <DesktopIcon 
               key={project.id} 
               project={project} 
               onClick={handleIconClick} 
               onUpdateMedia={handleProjectMediaUpdate}
             />
           ))}
        </div>
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((win) => (
          <Window 
            key={win.id}
            project={win.project} 
            zIndex={win.zIndex}
            initialX={win.defaultX}
            initialY={win.defaultY}
            onClose={() => closeWindow(win.id)} 
            onFocus={() => focusWindow(win.id)}
          />
        ))}
      </AnimatePresence>

      <Terminal 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        projects={projects}
        onOpenProject={openProject}
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
