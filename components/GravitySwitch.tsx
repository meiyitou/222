import React from 'react';

const GravitySwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={enabled}
    aria-label="桌面重力"
    title={enabled ? '关闭重力，或按 Esc 归位' : '开启重力，抓起图标或窗口甩动试试'}
    onClick={onChange}
    className="flex h-6 shrink-0 items-center gap-2 rounded-full bg-white/90 px-2.5 text-[12px] font-medium text-[#262626] shadow-sm ring-1 ring-black/5 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
  >
    <svg viewBox="0 0 24 16" fill="currentColor" className="h-4 w-5" aria-hidden="true">
      <path d="M6 6a6 6 0 0 1 12 0H6Zm-5 1c0-1 5-2 11-2s11 1 11 2-5 3-11 3S1 8 1 7Z" />
      <path d="M8 10h8l-2 4h-4l-2-4Z" opacity=".65" />
    </svg>
    <span>Gravity</span>
    <span className={`relative h-[18px] w-8 rounded-full transition-colors duration-200 ${enabled ? 'bg-[#2457f5]' : 'bg-[#c8cbd1]'}`}>
      <span className={`absolute left-0 top-0.5 h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 motion-reduce:transition-none ${enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </span>
  </button>
);

export default GravitySwitch;
