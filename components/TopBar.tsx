
import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search, Command, Apple } from 'lucide-react';

export const TopBar: React.FC<{ activeApp?: string }> = ({ activeApp = 'Finder' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit' 
    }).replace(/,/g, '');
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-xl z-[100] flex items-center justify-between px-4 text-white/90 text-[13px] font-medium select-none shadow-sm border-b border-white/5">
      {/* Left Side: Apple Menu & App Menus */}
      <div className="flex items-center gap-4">
        <div className="hover:bg-white/10 p-1 rounded -ml-1 cursor-default">
           {/* Simple Apple Logo Representation or Icon */}
           <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-90">
             <path d="M17.088 3.871c-.676.851-1.595 1.374-2.495 1.325-.226-.983.362-2.025 1.059-2.639.633-.573 1.627-1.024 2.369-.966.108 1.054-.419 1.888-.933 2.28zm-5.662 12.921c.985 0 2.018-.893 2.485-.893.453 0 1.325.868 2.423.868 1.327-.025 2.747-1.132 3.23-2.612-.066-.033-1.886-1.132-1.886-3.602 0-2.383 1.911-3.534 1.965-3.584-.041-.033-1.245-1.442-2.515-1.442-1.091 0-1.938.685-2.495.685-.557 0-1.575-.659-2.487-.659-1.966 0-3.83 1.608-3.83 4.442 0 3.179 1.942 6.797 3.111 6.797z"/>
           </svg>
        </div>
        <span className="font-bold tracking-wide cursor-default">{activeApp}</span>
        
        {/* Standard Mac Menus */}
        <div className="hidden md:flex items-center gap-4 font-normal opacity-90">
          <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-default">File</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-default">Edit</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-default">View</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-default">Go</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-default">Window</span>
          <span className="hover:bg-white/10 px-2 py-0.5 rounded cursor-default">Help</span>
        </div>
      </div>

      {/* Right Side: Status Icons & Clock */}
      <div className="flex items-center gap-3 md:gap-5">
        <div className="hidden md:flex items-center gap-4 opacity-90">
           <Battery className="w-4 h-4" />
           <Wifi className="w-4 h-4" />
           <Search className="w-4 h-4" />
           <div className="hover:bg-white/10 p-0.5 rounded cursor-default">
             <Command className="w-4 h-4" />
           </div>
        </div>
        
        <span className="cursor-default hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
};
