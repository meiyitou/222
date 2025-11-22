
import React, { useState, useRef } from 'react';
import { Project, MediaItem } from './types';
import { PROJECTS } from './constants';
import DesktopIcon from './components/DesktopIcon';
import Dock from './components/Dock';
import Window from './components/Window';
import Terminal from './components/Terminal';
import Fireworks from './components/Fireworks';
import { Filter } from 'lucide-react';

// NOTE: Please save your image as 'wallpaper.png' inside the 'public' folder of your project.
const DEFAULT_WALLPAPER = "/wallpaper.png";

// Dummy content for Dock Apps to open in the Window component
const DOCK_APPS_CONTENT: Record<string, Project> = {
  ae: {
    id: 'ae',
    title: 'Adobe After Effects',
    category: 'Application',
    description: 'Create cinematic movie titles, intros, and transitions. Remove an object from a clip. Start a fire or make it rain. Navigate and design in a 3D space. With After Effects, the industry-standard motion graphics and visual effects software, you can take any idea and make it move.',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b79931fd29a?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  ps: {
    id: 'ps',
    title: 'Adobe Photoshop',
    category: 'Application',
    description: 'From photo editing and compositing to digital painting, animation, and graphic design — you can do it all in Photoshop. Bring ideas to life across desktop and iPad. Magically transform images with the power of AI.',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  ai: {
    id: 'ai',
    title: 'Adobe Illustrator',
    category: 'Application',
    description: 'The industry-standard vector graphics software lets you create everything from web and mobile graphics to logos, icons, book illustrations, product packaging, and billboards.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1572044162444-ad6021105507?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  warning: {
    id: 'warning',
    title: 'System Notifications',
    category: 'System',
    description: 'No new alerts.\n\n• System is up to date\n• No security threats detected\n• Backup completed successfully at 03:00 AM',
    thumbnail: 'https://images.unsplash.com/photo-1555421689-491a97ff4181?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1555421689-491a97ff4181?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  notes: {
    id: 'notes',
    title: 'Notes',
    category: 'Productivity',
    description: 'Ideas for next project:\n- Interactive 3D header\n- Physics-based icons\n- Dark/Light mode toggle\n\nTo Do:\n[x] Fix navigation bug\n[ ] Update portfolio content\n[ ] Reply to emails',
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  photos: {
    id: 'photos',
    title: 'Photos Library',
    category: 'Gallery',
    description: 'Displaying recent favorites from Camera Roll. Drag and drop images here to add them.',
    thumbnail: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&w=1200&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1200&q=80' }
    ],
    position: { top: '0', left: '0' }
  },
  netease: {
    id: 'netease',
    title: 'Netease Cloud Music',
    category: 'Music',
    description: 'Now Playing: Daily Recommendation\n\nDiscover new tracks based on your listening history. Your personal radio station is ready.',
    thumbnail: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    gallery: [
       { type: 'image', url: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&w=1200&q=80' }, // Party
       { type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80' }, // Mic
       { type: 'image', url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=1200&q=80' }, // Surf
    ],
    position: { top: '0', left: '0' }
  },
  insta: {
    id: 'insta',
    title: 'Instagram',
    category: 'Social Media',
    description: 'Latest posts from @bychudy.\n\n"Creating digital experiences that matter."\n\nFollow for more design updates and behind the scenes work.',
    thumbnail: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  mail: {
    id: 'mail',
    title: 'Mail',
    category: 'Communication',
    description: 'Inbox: 0 Unread Messages\n\nDraft: Project Inquiry\nTo: contact@studio.com\nSubject: Collaboration\n\nHello, I would like to discuss a potential project...',
    thumbnail: 'https://images.unsplash.com/photo-1557200130-967055729456?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1557200130-967055729456?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  trash: {
    id: 'trash',
    title: 'Trash',
    category: 'System',
    description: 'Trash is empty.',
    thumbnail: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  }
};

const App: React.FC = () => {
  // State for projects to allow content updates
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [dockApps, setDockApps] = useState<Record<string, Project>>(DOCK_APPS_CONTENT);
  const [activeProject, setActiveProject] = useState<Project | null>(PROJECTS[0]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [wallpaper, setWallpaper] = useState<string>(DEFAULT_WALLPAPER);
  const [showFireworks, setShowFireworks] = useState(false);
  const wallpaperInputRef = useRef<HTMLInputElement>(null);

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

  // Unified handler to add media to a project (supports both replacements and gallery additions)
  const handleProjectMediaUpdate = (projectId: string, file: File) => {
    const fileUrl = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    const newMediaItem: MediaItem = { 
      type: isVideo ? 'video' : 'image', 
      url: fileUrl 
    };

    // Helper to update a specific project instance
    const updateProjectData = (p: Project) => {
      const updated = { ...p };
      // Initialize gallery if needed
      if (!updated.gallery) {
        updated.gallery = [
          ...(updated.videoUrl ? [{ type: 'video' as const, url: updated.videoUrl }] : []),
          { type: 'image' as const, url: updated.previewImage }
        ];
      }
      
      // Append new media to gallery
      updated.gallery = [...updated.gallery, newMediaItem];

      // If it's an image, also update the thumbnail/icon for the desktop experience
      if (isImage) {
        updated.thumbnail = fileUrl;
      }
      // Set the main preview to the new item (so it looks like it was "replaced" or "added")
      if (isImage) updated.previewImage = fileUrl;
      if (isVideo) updated.videoUrl = fileUrl;

      return updated;
    };

    // Check if it's a desktop project
    const isDesktopProject = projects.some(p => p.id === projectId);

    if (isDesktopProject) {
      setProjects(prev => prev.map(p => {
        if (p.id === projectId) {
          const updated = updateProjectData(p);
          if (activeProject && activeProject.id === projectId) {
            setActiveProject(updated);
          }
          return updated;
        }
        return p;
      }));
    } else {
      // Must be a dock app
      setDockApps(prev => {
        const updated = { ...prev };
        if (updated[projectId]) {
          updated[projectId] = updateProjectData(updated[projectId]);
          if (activeProject && activeProject.id === projectId) {
            setActiveProject(updated[projectId]);
          }
        }
        return updated;
      });
    }
  };

  // Handler specifically for dropping files onto the Open Window
  const handleWindowAddMedia = (file: File) => {
    if (activeProject) {
      handleProjectMediaUpdate(activeProject.id, file);
    }
  };

  // Handle changing wallpaper
  const handleWallpaperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setWallpaper(imageUrl);
    }
  };

  const handleBackgroundContextMenu = (e: React.MouseEvent) => {
    // Prevent default context menu on wallpaper
    e.preventDefault();
    // Trigger hidden wallpaper input
    wallpaperInputRef.current?.click();
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900 text-sans select-none">
      
      {/* Fireworks Overlay */}
      {showFireworks && (
        <Fireworks onComplete={() => setShowFireworks(false)} />
      )}

      {/* Hidden Input for Wallpaper */}
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
        {/* Hint for changing wallpaper (subtle) */}
        <div className="absolute bottom-2 right-2 text-white/30 text-[10px] pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
          Right-click to change wallpaper
        </div>
      </div>

      {/* Interactive Desktop Layer */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        
        {/* Desktop Icons - Absolute Positioning */}
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

        {/* Floating decoration (Top Right cluster) */}
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
        onAddMedia={handleWindowAddMedia}
      />

      {/* Terminal Modal */}
      <Terminal 
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        projects={projects}
        onOpenProject={(p) => {
          setActiveProject(p);
          // Optional: close terminal after opening? 
          // setIsTerminalOpen(false); 
        }}
        onSpecialCommand={handleTerminalSpecialCommand}
      />

      {/* Dock */}
      <Dock onAppClick={handleDockIconClick} />
    </div>
  );
};

export default App;
