
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Project } from '../types';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onSpecialCommand?: (cmd: string) => void;
}

interface TerminalLine {
  type: 'input' | 'output';
  text: string;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, projects, onOpenProject, onSpecialCommand }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', text: 'Last login: ' + new Date().toUTCString() + ' on ttys000' },
    { type: 'output', text: 'Type "help" for available commands.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, lines]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = inputValue; 
      const newLines: TerminalLine[] = [...lines, { type: 'input', text: command }];
      
      processCommand(command.trim(), newLines);
      setInputValue('');
    }
  };

  const processCommand = (cmd: string, currentHistory: TerminalLine[]) => {
    if (!cmd) {
      setLines(currentHistory);
      return;
    }

    const args = cmd.split(' ');
    const mainCommand = args[0].toLowerCase();
    const arg = args.slice(1).join(' ');

    let response = '';

    switch (mainCommand) {
      case 'help':
        response = `Available commands:
  ls          List all files (projects)
  open [name] Open a specific file/project
  [name]      Type a file name to open it directly
  fireworks   Launch a visual celebration
  clear       Clear terminal history
  date        Show current date
  whoami      Show current user`;
        break;
      
      case 'ls':
        response = projects.map(p => p.title).join('\n');
        break;

      case 'clear':
        setLines([]);
        return;

      case 'date':
        response = new Date().toString();
        break;

      case 'whoami':
        response = 'guest@portfolio-os';
        break;
      
      case 'fireworks':
      case '烟花':
        response = 'Launching fireworks sequence... 🎆';
        if (onSpecialCommand) onSpecialCommand('fireworks');
        break;

      case 'open':
        if (!arg) {
          response = 'Usage: open [filename]';
        } else {
          const found = projects.find(p => 
            p.title.toLowerCase().includes(arg.toLowerCase())
          );
          
          if (found) {
            response = `Opening "${found.title}"...`;
            onOpenProject(found);
          } else {
            response = `File not found: ${arg}`;
          }
        }
        break;

      default:
        // Attempt to treat the command as a direct filename/project title query
        // Using 'cmd' allows matching multi-word titles without quotes
        const shortcutFound = projects.find(p => 
           p.title.toLowerCase().includes(cmd.toLowerCase())
        );

        if (shortcutFound) {
           response = `Opening "${shortcutFound.title}"...`;
           onOpenProject(shortcutFound);
        } else {
           response = `zsh: command not found: ${mainCommand}`;
        }
        break;
    }

    setLines([...currentHistory, { type: 'output', text: response }]);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
       <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag
        dragMomentum={false}
        className="fixed top-20 left-20 md:top-1/3 md:left-1/3 z-50 w-[90vw] md:w-[600px] h-[400px] bg-[#1a1b1e]/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden font-mono"
      >
        {/* Title Bar */}
        <div 
          className="h-8 bg-[#2b2d31] border-b border-gray-700 flex items-center px-4 justify-between shrink-0 cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
             // @ts-ignore 
             e.target.closest('.framer-motion-div')?.setPointerCapture(e.pointerId);
          }}
        >
           <div className="flex gap-2 group">
            <button 
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] flex items-center justify-center hover:brightness-90"
            >
               <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d8a126]" />
            <button className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1ea832]" />
          </div>
          <div className="text-gray-400 text-xs">guest — -zsh — 80x24</div>
          <div className="w-10"></div>
        </div>

        {/* Terminal Content */}
        <div 
          className="flex-1 p-4 overflow-y-auto text-sm md:text-[13px] leading-relaxed text-white custom-scrollbar" 
          onClick={handleContainerClick}
        >
          {lines.map((line, i) => (
            <div key={i} className={`${line.type === 'output' ? 'text-gray-300 whitespace-pre-wrap mb-1' : 'text-white font-bold mt-2'}`}>
               {line.type === 'input' && <span className="text-[#4ade80] mr-2">➜  ~</span>}
               {line.text}
            </div>
          ))}
          
          {/* Active Input Line */}
          <div className="flex items-center text-white font-bold mt-2">
            <span className="text-[#4ade80] mr-2">➜  ~</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 text-white caret-white"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div ref={endRef} />
        </div>

      </motion.div>
    </AnimatePresence>
  );
};

export default Terminal;
