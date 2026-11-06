import { useState } from 'react';
import './DesktopCat.css';

export default function DesktopCat({ gravityEnabled }: { gravityEnabled: boolean }) {
  const [awake, setAwake] = useState(false);
  const pose = gravityEnabled ? 'clinging' : awake ? 'awake' : 'asleep';

  return (
    <div className="desktop-cat" data-pose={pose}>
      <span className="desktop-cat-bubble" role="status">
        {gravityEnabled ? '抱紧小鱼！' : awake ? '喵～' : ''}
      </span>
      <button
        className="desktop-cat-button"
        type="button"
        aria-label="桌面小猫"
        aria-pressed={awake}
        onClick={() => setAwake(value => !value)}
      >
        <svg viewBox="0 0 116 74" aria-hidden="true" focusable="false">
          <ellipse cx="61" cy="67" rx="47" ry="4" fill="#22160e" opacity=".19" />
          <g className="desktop-cat-pose" stroke="#6f472d" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
            <g className="desktop-cat-tail">
              <path d="M40 54C24 53 15 62 10 54S15 40 23 43" fill="none" stroke="#6f472d" strokeWidth="10" />
              <path d="M40 54C24 53 15 62 10 54S15 40 23 43" fill="none" stroke="#eeb166" strokeWidth="7" />
              <path d="M12 49l4 2m4 6 1-4" fill="none" stroke="#bd763e" strokeWidth="2.4" />
            </g>
            <path className="desktop-cat-body" d="M21 56c0-14 13-25 30-25 16 0 31 7 33 19 2 12-8 16-24 16H34c-8 0-13-3-13-10Z" fill="#f5bd78" />
            <path d="M31 54c7-9 21-9 30-4 3 2 5 7 3 11H33c-6 0-7-3-2-7Z" fill="#ffd79c" stroke="none" />
            <path d="M34 36c3 2 5 5 5 8m5-11c3 2 5 5 5 9m5-10c3 2 5 5 5 8" fill="none" stroke="#c47b42" strokeWidth="2.5" />
            <path d="M36 62c4-6 13-7 20-2 3 2 1 5-2 5H38c-3 0-4-1-2-3Z" fill="#ffe3ba" />

            <g className="desktop-cat-head">
              <path d="M57 45c-1-6-1-13 1-20 1-3 3-3 5-1l11 8c4-1 8-1 12 0l11-8c2-2 4-1 5 2 2 6 2 12 1 18 5 6 4 13-1 17-5 4-12 5-21 5-15 0-27-4-27-14 0-3 1-5 3-7Z" fill="#f6c280" />
              <path d="m61 29 8 6-8 4c-1-4-1-7 0-10Zm37 0c1 3 2 7 1 10l-8-4Z" fill="#e29b86" stroke="none" />
              <path d="M62 54c2-5 8-7 14-5l5 3 5-3c6-2 12 0 14 5 3 7-8 10-19 10s-22-3-19-10Z" fill="#ffe6c2" stroke="none" />
              <path d="m74 33 2 5m5-6v5m5-4-1 5" fill="none" stroke="#c47b42" strokeWidth="2.15" />
              {pose === 'asleep' ? (
                <path d="M66 48q3 3 6 0m16 0q3 3 6 0" fill="none" stroke="#563522" />
              ) : (
                <g fill="#4e3226" stroke="none">
                  <ellipse cx="69.5" cy="47.5" rx="2.4" ry={gravityEnabled ? 3.6 : 2.8} />
                  <ellipse cx="91.5" cy="47.5" rx="2.4" ry={gravityEnabled ? 3.6 : 2.8} />
                  <circle cx="70" cy="46.5" r=".7" fill="#fff3df" /><circle cx="92" cy="46.5" r=".7" fill="#fff3df" />
                </g>
              )}
              <path d="M77 52q4-2 8 0l-4 3Z" fill="#b97063" stroke="none" />
              <path d="M81 54v2m0 0q-2 2-4 0m4 0q2 2 4 0m-22-4-6-1m7 4-6 1m41-4 6-1m-7 4 6 1" fill="none" stroke="#936146" strokeWidth="1.1" />
            </g>
            {gravityEnabled ? (
              <g className="desktop-cat-toy">
                <rect x="68" y="46" width="28" height="24" rx="7" fill="#80c9ce" stroke="#326d79" />
                <path d="M74 58q6-7 12-1l4-3v7l-4-3q-6 6-12 0Z" fill="#e8ffff" stroke="none" />
                <circle cx="78" cy="57.5" r=".8" fill="#326d79" stroke="none" />
                <path d="M62 53c4-2 8-2 11 1 3 3 1 7-3 7-3 0-6-1-8-3m41-5c-4-2-8-2-11 1-3 3-1 7 3 7 3 0 6-1 8-3" fill="#ffe3ba" />
              </g>
            ) : (
              <path d="M68 63c4-4 10-4 13 1 3-4 9-4 12-1 3 3 1 5-2 5H70c-3 0-4-2-2-5Z" fill="#ffe3ba" />
            )}
          </g>
          {pose === 'asleep' && <text className="desktop-cat-zzz" x="92" y="18">zZ</text>}
        </svg>
      </button>
    </div>
  );
}
