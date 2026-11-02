import React, { useState } from 'react';
import { MediaItem, Project } from '../types';

const GalleryImage: React.FC<{ item: MediaItem; index: number; title: string; onRatio: (index: number, ratio: number) => void }> = ({ item, index, title, onRatio }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className="gallery-error">这张图片暂时无法加载</div>;
  return <img
    src={item.url}
    alt={`${title} · 图片 ${index + 1}`}
    className="project-gallery-image"
    loading={index < 3 ? 'eager' : 'lazy'}
    decoding="async"
    onLoad={event => {
      const image = event.currentTarget;
      if (image.naturalHeight) onRatio(index, image.naturalWidth / image.naturalHeight);
    }}
    onError={() => setFailed(true)}
  />;
};

const ProjectGallery: React.FC<{ project: Project; media: MediaItem[] }> = ({ project, media }) => {
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const saveRatio = (index: number, ratio: number) => setRatios(previous => previous[index] === ratio ? previous : { ...previous, [index]: ratio });
  const rows: number[][] = [];
  for (let index = 0; index < media.length; index++) {
    const next = index + 1;
    // Lead with a full-width cover. Pair adjacent portrait/square images in source order.
    if (index > 0 && media[index].type === 'image' && media[next]?.type === 'image' && (ratios[index] ?? 1) <= 1.2 && (ratios[next] ?? 1) <= 1.2) {
      rows.push([index, next]);
      index++;
    } else rows.push([index]);
  }

  return <section className="project-gallery custom-scrollbar" aria-label={`${project.title}作品集`}>
    <header className="project-gallery-info">
      <img src={project.thumbnail} alt="" className="project-gallery-cover" />
      <div className="project-gallery-summary">
        <div className="project-gallery-heading"><h1>{project.title}</h1><span>{project.category}</span></div>
        {project.description && <p>{project.description}</p>}
      </div>
    </header>
    <div className="project-gallery-content">
      {rows.map(row => <div key={row.join('-')} className={`project-gallery-row ${row.length === 2 ? 'project-gallery-pair' : ''}`}>
        {row.map(index => <div key={`${index}-${media[index].url}`} className="project-gallery-media" style={{ flexGrow: row.length === 1 ? 1 : (ratios[index] ?? 1) * 100 }}>
          {media[index].type === 'video'
            ? <video src={media[index].url} controls playsInline preload="metadata" className="project-gallery-video" aria-label={`${project.title} · 视频 ${index + 1}`} />
            : <GalleryImage item={media[index]} index={index} title={project.title} onRatio={saveRatio} />}
        </div>)}
      </div>)}
    </div>
  </section>;
};

export default ProjectGallery;
