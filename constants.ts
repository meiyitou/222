
import { Project, DockItem } from './types';

// 1. Desktop Wallpapers
export const WALLPAPERS = [
  { 
    id: 'local-custom', 
    url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_v5u4v7v5u4v7v5u4_2025-11-26_19-38-17-scaled.png', 
    label: 'My Custom Wallpaper' 
  },
  { 
    id: 'starlight', 
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80', 
    label: 'Starlight Blessing' 
  },
  { id: 'monterey', url: 'https://images.unsplash.com/photo-1621293954908-35155b013d07?auto=format&fit=crop&w=2560&q=80', label: 'Monterey' },
  { id: 'ventura', url: 'https://images.unsplash.com/photo-1664021975758-78d838d82243?auto=format&fit=crop&w=2560&q=80', label: 'Ventura' },
  { id: 'sonoma', url: 'https://images.unsplash.com/photo-1688555529002-48324e59232e?auto=format&fit=crop&w=2560&q=80', label: 'Sonoma' },
  { id: 'aurora', url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=2560&q=80', label: 'Aurora' },
  { id: 'gradient', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=2560&q=80', label: 'Deep Space' },
  { id: 'studio', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2560&q=80', label: 'Studio' },
];

export const DEFAULT_WALLPAPER = WALLPAPERS[0].url;

// 2. Desktop Projects
// Layout Strategy: "Compact Center-Radial Burst"
export const PROJECTS: Project[] = [
  
  // === TOP LEFT QUADRANT ===
  {
    id: 'stage-visuals',
    title: '壮壮',
    category: 'Various artists',
    description: "mc阿壮.神一样的男人.",
    thumbnail: 'https://picsum.photos/id/20/200/200',
    previewImage: 'https://picsum.photos/id/20/800/500',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/d4678b038f84fc49d10eb6ee84ab1e55.jpg' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/5fb9c6c46332bc39ada289ca9f0077d9.mp4' },
    ],
    position: { top: '25%', left: '40%' }, 
  },
  {
    id: 'efemmera',
    title: '晨阳',
    category: '依旧跑车',
    description: '只能说非常之没意头.',
    thumbnail: 'https://picsum.photos/id/40/200/200',
    previewImage: 'https://picsum.photos/id/40/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_ve23ocve23ocve23.png' },
    ],
    position: { top: '18%', left: '34%' }, 
  },
  {
    id: '壮壮与虎啸',
    title: '壮壮与虎啸',
    category: 'Print Design',
    description: 'Visual identity.',
    thumbnail: 'https://picsum.photos/id/30/200/200',
    previewImage: 'https://picsum.photos/id/30/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/75ead455d274fde1033e4e95d1545f73.jpg' },
    ],
    position: { top: '32%', left: '28%' }, 
  },
  {
    id: 'kajecik',
    title: 'KAJECIK',
    category: 'App Design',
    description: 'A notebook application.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/2cb6b10f9232a20e994670d2671dfad4.jpg',
    previewImage: 'https://www.meiyitou.top/wp-content/uploads/2025/11/2cb6b10f9232a20e994670d2671dfad4.jpg',
    position: { top: '12%', left: '24%' }, 
  },

  // === TOP RIGHT QUADRANT ===
  {
    id: 'dubhe',
    title: 'DUBHE',
    category: '干就完了',
    description: '东隅已逝.',
    thumbnail: 'https://picsum.photos/id/60/200/200',
    previewImage: 'https://picsum.photos/id/60/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/619941e1ea4a2760cd267dee639ed0d6.jpg' },
    ],
    position: { top: '25%', left: 'auto', right: '40%' }, 
  },
  {
    id: 'sbm-ff24',
    title: '虎啸',
    category: '',
    description: 'pubh里的天生少年.',
    thumbnail: 'https://picsum.photos/id/140/200/200',
    previewImage: 'https://picsum.photos/id/140/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_6f64kc6f64kc6f64_2025-11-28_00-32-15.png' },
    ],
    position: { top: '18%', left: 'auto', right: '34%' }, 
  },
  {
    id: 'newonce',
    title: '世龙',
    category: 'Media',
    description: '依旧厕所抽一根.',
    thumbnail: 'https://picsum.photos/id/150/200/200',
    previewImage: 'https://picsum.photos/id/150/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/屏幕截图-2025-11-28-004301.png' },
    ],
    position: { top: '32%', left: 'auto', right: '28%' }, 
  },
  {
    id: '香烟',
    title: 'cigarette',
    category: 'Campaign',
    description: 'no smoking.',
    thumbnail: 'https://picsum.photos/id/70/200/200',
    previewImage: 'https://picsum.photos/id/70/800/600',
    position: { top: '12%', left: 'auto', right: '24%' }, 
  },

  // === BOTTOM LEFT QUADRANT ===
  {
    id: 'interludium',
    title: 'NET',
    category: 'Album Art',
    description: '数字.',
    thumbnail: 'https://picsum.photos/id/100/200/200',
    previewImage: 'https://picsum.photos/id/100/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/b9dc475c31900d56cfa79a35bd83ff5d.jpg' },
    ],
    position: { top: '50%', left: '40%' }, 
  },
  {
    id: 'trasa-po-koncu',
    title: '电脑',
    category: '',
    description: '.',
    thumbnail: 'https://picsum.photos/id/110/200/200',
    previewImage: 'https://picsum.photos/id/110/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/IMG_20250602_173559-scaled.jpg' },
    ],
    position: { top: '58%', left: '32%' }, 
  },
  {
    id: 'solar-bialas',
    title: '电影',
    category: 'Branding',
    description: 'Collaborative branding project.',
    thumbnail: 'https://picsum.photos/id/120/200/200',
    previewImage: 'https://picsum.photos/id/120/800/600',
    position: { top: '72%', left: '24%' }, 
  },
  {
    id: 'chanel',
    title: 'CHANEL',
    category: 'Commercial',
    description: 'Unofficial commercial concept.',
    thumbnail: 'https://picsum.photos/id/130/200/200',
    previewImage: 'https://picsum.photos/id/130/800/600',
    position: { top: '72%', left: '38%' }, 
  },

  // === BOTTOM RIGHT QUADRANT ===
  {
    id: 'ryk-x-sexed',
    title: 'RYK X SEXED',
    category: 'Campaign',
    description: 'Social awareness campaign.',
    thumbnail: 'https://picsum.photos/id/180/200/200',
    previewImage: 'https://picsum.photos/id/180/800/600',
    position: { top: '50%', left: 'auto', right: '40%' }, 
  },
  {
    id: 'merch',
    title: '梦杰',
    category: 'Fashion',
    description: 'Merchandise design collection.',
    thumbnail: 'https://picsum.photos/id/160/200/200',
    previewImage: 'https://picsum.photos/id/160/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/160/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/161/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/162/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/163/800/600' },
    ],
    position: { top: '58%', left: 'auto', right: '32%' }, 
  },
  {
    id: 'fantasmagorie',
    title: 'FANTASMAGORIE',
    category: 'Art',
    description: 'Surrealist digital art series.',
    thumbnail: 'https://picsum.photos/id/170/200/200',
    previewImage: 'https://picsum.photos/id/170/800/600',
    position: { top: '72%', left: 'auto', right: '24%' }, 
  },
  {
    id: 'trasa-konca',
    title: '北张庄',
    category: 'Concert Visuals',
    description: '中国哪有黑社会.',
    thumbnail: 'https://picsum.photos/id/80/200/200',
    previewImage: 'https://picsum.photos/id/80/800/600',
    position: { top: '45%', left: 'auto', right: '16%' }, 
  },
  {
    id: 'collage-animations',
    title: '风景',
    category: 'Motion Design',
    description: 'A series of experimental animations.',
    thumbnail: 'https://picsum.photos/id/90/200/200',
    previewImage: 'https://picsum.photos/id/90/800/600',
    position: { top: '36%', left: 'auto', right: '12%' }, 
  },
];

export const DOCK_ITEMS: DockItem[] = [
  { label: 'After Effects', iconType: 'ae' },
  { label: 'Photoshop', iconType: 'ps' },
  { label: 'Illustrator', iconType: 'ai' },
  { label: 'Terminal', iconType: 'terminal' },
  { label: 'Notes', iconType: 'notes' },
  { label: 'Photos', iconType: 'photos' },
  { label: 'Netease Music', iconType: 'netease' },
  { label: 'Instagram', iconType: 'insta' },
  { label: 'Contact', iconType: 'mail' },
  { label: 'Trash', iconType: 'trash' },
];

export const DOCK_APPS_CONTENT: Record<string, Project> = {
  ae: {
    id: 'ae',
    title: 'Adobe After Effects',
    category: 'Application',
    description: 'Create cinematic movie titles.',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b79931fd29a?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
    ],
    position: { top: '0', left: '0' }
  },
  ps: {
    id: 'ps',
    title: 'Adobe Photoshop',
    category: 'Application',
    description: 'Photo editing software.',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
    ],
    position: { top: '0', left: '0' }
  },
  ai: {
    id: 'ai',
    title: 'Adobe Illustrator',
    category: 'Application',
    description: 'Vector graphics software.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1572044162444-ad6021105507?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
    ],
    position: { top: '0', left: '0' }
  },
  warning: {
    id: 'warning',
    title: 'System Notifications',
    category: 'System',
    description: 'No new alerts.',
    thumbnail: 'https://images.unsplash.com/photo-1555421689-491a97ff4181?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1555421689-491a97ff4181?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  notes: {
    id: 'notes',
    title: 'Notes',
    category: 'Productivity',
    description: 'Personal notebook.',
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80',
    gallery: [
        { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/下载-11.mp4' },
    ],
    position: { top: '0', left: '0' }
  },
  photos: {
    id: 'photos',
    title: 'Photos Library',
    category: 'Gallery',
    description: 'Photo collection.',
    thumbnail: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  netease: {
    id: 'netease',
    title: 'Netease Cloud Music',
    category: 'Music',
    description: 'Music Player.',
    thumbnail: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  insta: {
    id: 'insta',
    title: 'Instagram',
    category: 'Social Media',
    description: 'Social Feed.',
    thumbnail: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1200&q=80',
    gallery: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80' },
        // RESTORED VIDEO
        { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
    ],
    position: { top: '0', left: '0' }
  },
  mail: {
    id: 'mail',
    title: 'Mail',
    category: 'Communication',
    description: 'Inbox.',
    thumbnail: 'https://images.unsplash.com/photo-1557200130-967055729456?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1557200130-967055729456?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  },
  trash: {
    id: 'trash',
    title: 'Trash',
    category: 'System',
    description: 'Empty.',
    thumbnail: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&w=1200&q=80',
    position: { top: '0', left: '0' }
  }
};
