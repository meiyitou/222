import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { PROJECTS } from '../constants';
import './RandomPhoto.css';

const photosByUrl = new Map(PROJECTS.flatMap(project =>
  (project.gallery ?? [])
    .filter(item => item.type === 'image' && !/\.gif(?:[?#]|$)/i.test(item.url))
    .map(item => [item.url, { url: item.url, project }] as const)
));
const photos = [...photosByUrl.values()];
type Photo = typeof photos[number];

function CameraImage({ photo, preview = false }: { photo: Photo; preview?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return preview ? null : <span className="camera-empty">这张照片暂时打不开</span>;
  return (
    <img src={photo.url} alt={preview ? '' : `${photo.project.title}作品集中的照片`}
      draggable={false} decoding="async" loading={preview ? 'lazy' : 'eager'}
      onError={() => setFailed(true)} />
  );
}

export default function RandomPhoto({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const flashTimer = useRef<number | undefined>(undefined);
  const reduceMotion = useReducedMotion();
  const [album, setAlbum] = useState(() => ({
    order: photos,
    index: photos.length ? Math.floor(Math.random() * photos.length) : 0,
  }));
  const [flash, setFlash] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const { order, index } = album;
  const current = order[index];
  const canBrowse = order.length > 1;
  const previous = canBrowse ? order[(index - 1 + order.length) % order.length] : undefined;
  const next = order.length > 2 ? order[(index + 1) % order.length] : undefined;
  const note = current?.project.description.trim();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      window.clearTimeout(flashTimer.current);
      if (audioRef.current) void audioRef.current.close().catch(() => {});
      audioRef.current = null;
    };
  }, []);

  function browse(direction: number) {
    if (!canBrowse) return;
    setFlashing(false);
    setAlbum(album => ({ ...album, index: (album.index + direction + album.order.length) % album.order.length }));
  }

  function moveToEnd() {
    if (!canBrowse) return;
    setFlashing(false);
    setAlbum(({ order, index }) => {
      const reordered = [...order];
      const [photo] = reordered.splice(index, 1);
      reordered.push(photo);
      return { order: reordered, index: index % (reordered.length - 1) };
    });
  }

  function shoot() {
    if (!current) return;
    setFlash(value => value + 1);
    setFlashing(true);
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlashing(false), 450);

    try {
      const audio = audioRef.current ??= new AudioContext();
      if (audio.state === 'suspended') void audio.resume().catch(() => {});
      const click = audio.createOscillator();
      const volume = audio.createGain();
      const time = audio.currentTime;
      click.type = 'triangle';
      click.frequency.setValueAtTime(630, time);
      click.frequency.exponentialRampToValueAtTime(160, time + 0.075);
      volume.gain.setValueAtTime(0.09, time);
      volume.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
      click.connect(volume).connect(audio.destination);
      click.onended = () => { click.disconnect(); volume.disconnect(); };
      click.start(time);
      click.stop(time + 0.095);
    } catch {
      // The screen still flashes in browsers where sound is unavailable.
    }
  }

  const transition = { duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] as const };
  const photoCard = (photo: Photo, preview = false) => (
    <motion.div key={photo.url} layoutId={reduceMotion ? undefined : photo.url} className="camera-image" transition={transition}>
      <CameraImage key={photo.url} photo={photo} preview={preview} />
    </motion.div>
  );

  return (
    <dialog ref={dialogRef} className="random-photo" aria-labelledby="random-photo-title" onClose={onClose}
      onKeyDown={event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        browse(event.key === 'ArrowLeft' ? -1 : 1);
      }}>
      <header className="camera-heading">
        <div><p>PHOTO ARCHIVE / DUBHE</p><h2 id="random-photo-title">随手翻一张</h2></div>
        <button type="button" className="camera-close" aria-label="关闭相机" onClick={() => dialogRef.current?.close()}>
          <X size={19} aria-hidden="true" />
        </button>
      </header>

      <LayoutGroup>
        <div className="camera-stage">
          {previous && <button type="button" className="camera-preview camera-preview-prev" aria-label="预览上一张" onClick={() => browse(-1)}>{photoCard(previous, true)}</button>}
          {next && <button type="button" className="camera-preview camera-preview-next" aria-label="预览下一张" onClick={() => browse(1)}>{photoCard(next, true)}</button>}
          <div className="camera-back">
            <div className="camera-display">
              <div className="camera-screen">
                {current ? photoCard(current) : <span className="camera-empty">相册里暂时没有照片</span>}
                <div className="camera-screen-label" aria-hidden="true">
                  <span>▶ PLAY</span><span>{String(current ? index + 1 : 0).padStart(3, '0')} / {String(order.length).padStart(3, '0')}</span>
                </div>
                {flashing && <div key={flash} className="camera-flash" aria-hidden="true" />}
              </div>
              <span className="camera-wordmark">DUBHE <small>PHOTO ARCHIVE</small></span>
            </div>
            <div className="camera-controls">
              <div className="camera-dial">
                <button type="button" className="camera-arrow" aria-label="上一张" disabled={!canBrowse} onClick={() => browse(-1)}><ChevronLeft size={18} /></button>
                <button type="button" className="camera-ok" aria-label="OK，按快门" disabled={!current} onClick={shoot}>OK</button>
                <button type="button" className="camera-arrow" aria-label="下一张" disabled={!canBrowse} onClick={() => browse(1)}><ChevronRight size={18} /></button>
              </div>
              <button type="button" className="camera-skip" aria-label="把当前照片移到队尾" title="移到队尾" disabled={!canBrowse} onClick={moveToEnd}><Trash2 size={16} /></button>
            </div>
          </div>
        </div>
      </LayoutGroup>

      {current && <footer className="camera-caption" aria-live="polite">
        <strong>{current.project.title}</strong>
        {note && /[^\s.。…]/.test(note) && <span>{note}</span>}
      </footer>}
    </dialog>
  );
}
