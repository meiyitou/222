
import { Project, DockItem } from './types';

// ==========================================
// CONFIGURATION GUIDE (使用说明)
// ==========================================
// 1. 编辑图片/视频 (Edit Media):
//    - 网络图片: 使用 https://... 链接
//    - 本地图片: 将图片放入 public 文件夹 (例如 public/image/1.jpg)，
//      在这里使用的路径应该是 '/image/1.jpg' (不要带 public 前缀)
//
// 2. 编辑图库 (Edit Gallery):
//    在 gallery: [] 数组中添加或删除项目。
// ==========================================

// 1. Desktop Wallpapers
export const WALLPAPERS = [
  { 
    id: 'local-custom', 
    // Assuming your file is at: public/image/1.jpg
    url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/68f40e24c24cdafmiwsxrf3810-1.webp', 
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

// 2. Desktop Projects (Icons scattered on desktop)
export const PROJECTS: Project[] = [
  {
    id: 'stage-visuals',
    title: 'Stage visuals',
    category: 'Various artists',
    description: "My animations made it beyond the computer screen and became part of live shows for artists like Kacperczyk, Fukaj, and Szaran. Stuff I was grinding out on my laptop ended up on big stages — during concert tours, Open'er, SBM FFestival, Hip-Hop Festival, Rap Stacja, Sun Festival, and even Męskie Granie. I love that something I create in full focus, just me and the screen, can later come to life — surrounded by lights, smoke, and a crowd of people.",
    thumbnail: 'https://picsum.photos/id/20/200/200',
    previewImage: 'https://picsum.photos/id/20/800/500',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/c013036b24feb24e4a405c38a9d5a5ca.jpg' }
      { type: 'image', url: 'https://picsum.photos/id/22/800/500' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/3cddd28ce8be807f8cea0a4552bfe77d.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/24/800/500' },
      { type: 'image', url: 'https://picsum.photos/id/25/800/500' },
      { type: 'image', url: 'https://picsum.photos/id/26/600/800' },
      { type: 'image', url: 'https://picsum.photos/id/27/600/800' },
      { type: 'image', url: 'https://picsum.photos/id/28/600/800' }
    ],
    position: { top: '10%', left: '5%' },
  },
  {
    id: 'hotel-mafija',
    title: 'HOTEL MAFIJA VINYL',
    category: 'Print Design',
    description: 'Visual identity and vinyl packaging design for the Hotel Mafija project.',
    thumbnail: 'https://picsum.photos/id/30/200/200',
    previewImage: 'https://picsum.photos/id/30/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/30/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/31/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/32/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/33/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/34/800/600' },
    ],
    position: { top: '5%', left: '40%' },
  },
  {
    id: 'efemmera',
    title: 'EFEMMERA',
    category: 'Visual Identity',
    description: 'Exploration of ephemeral visual concepts through digital media.',
    thumbnail: 'https://picsum.photos/id/40/200/200',
    previewImage: 'https://picsum.photos/id/40/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/40/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/41/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/42/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/43/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/44/800/600' },
    ],
    position: { top: '12%', left: '50%' },
  },
  {
    id: 'kajecik',
    title: 'KAJECIK',
    category: 'App Design',
    description: 'A notebook application concept designed for creative professionals.',
    thumbnail: 'https://picsum.photos/id/50/200/200',
    previewImage: 'https://picsum.photos/id/50/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/50/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/51/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/52/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/53/800/600' },
    ],
    position: { top: '15%', left: '75%' },
  },
  {
    id: 'wtf',
    title: 'WTF',
    category: 'Music Video',
    description: 'Direction and editing for the WTF music video.',
    thumbnail: 'https://picsum.photos/id/60/200/200',
    previewImage: 'https://picsum.photos/id/60/800/600',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/619941e1ea4a2760cd267dee639ed0d6.jpg' },
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/61/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/62/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/63/800/600' },
    ],
    position: { top: '30%', left: '58%' },
  },
  {
    id: 'pierwszy-swag',
    title: 'PIERWSZY SWAG\nW POLSCE',
    category: 'Campaign',
    description: 'Marketing campaign visuals for a major polish fashion drop.',
    thumbnail: 'https://picsum.photos/id/70/200/200',
    previewImage: 'https://picsum.photos/id/70/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/70/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/71/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/72/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/73/800/600' },
    ],
    position: { top: '35%', left: '42%' },
  },
  {
    id: 'trasa-konca',
    title: 'TRASA KOŃCA\nŚWIATA',
    category: 'Concert Visuals',
    description: 'Tour visuals for the End of the World Tour.',
    thumbnail: 'https://picsum.photos/id/80/200/200',
    previewImage: 'https://picsum.photos/id/80/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/80/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/81/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/82/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/83/800/600' },
    ],
    position: { top: '40%', left: '52%' },
  },
  {
    id: 'collage-animations',
    title: 'COLLAGE ANIMATIONS',
    category: 'Motion Design',
    description: 'A series of experimental collage animations.',
    thumbnail: 'https://picsum.photos/id/90/200/200',
    previewImage: 'https://picsum.photos/id/90/800/600',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/90/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/91/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/92/800/600' },
    ],
    position: { top: '45%', left: '56%' },
  },
  {
    id: 'interludium',
    title: 'INTERLUDIUM',
    category: 'Album Art',
    description: 'Cover art and promotional materials.',
    thumbnail: 'https://picsum.photos/id/100/200/200',
    previewImage: 'https://picsum.photos/id/100/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/100/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/101/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/102/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/103/800/600' },
    ],
    position: { top: '32%', left: '77%' },
  },
  {
    id: 'trasa-po-koncu',
    title: 'TRASA\nPO KOŃCU ŚWIATA',
    category: 'Event Design',
    description: 'Post-apocalyptic event theming and visual direction.',
    thumbnail: 'https://picsum.photos/id/110/200/200',
    previewImage: 'https://picsum.photos/id/110/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/110/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/111/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/112/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/113/800/600' },
    ],
    position: { top: '38%', left: '80%' },
  },
  {
    id: 'solar-bialas',
    title: 'SOLAR X BIAŁAS',
    category: 'Branding',
    description: 'Collaborative branding project.',
    thumbnail: 'https://picsum.photos/id/120/200/200',
    previewImage: 'https://picsum.photos/id/120/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/120/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/121/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/122/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/123/800/600' },
    ],
    position: { top: '50%', left: '70%' },
  },
  {
    id: 'chanel',
    title: 'CHANEL',
    category: 'Commercial',
    description: 'Unofficial commercial concept for Chanel fragrance.',
    thumbnail: 'https://picsum.photos/id/130/200/200',
    previewImage: 'https://picsum.photos/id/130/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/130/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/131/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/132/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/133/800/600' },
    ],
    position: { top: '55%', left: '79%' },
  },
  {
    id: 'sbm-ff24',
    title: 'SBM FF24',
    category: 'Festival',
    description: 'Main stage visuals for SBM FF24.',
    thumbnail: 'https://picsum.photos/id/140/200/200',
    previewImage: 'https://picsum.photos/id/140/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/140/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/141/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/142/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/143/800/600' },
    ],
    position: { top: '45%', left: '88%' },
  },
  {
    id: 'newonce',
    title: 'NEWONCE',
    category: 'Media',
    description: 'Graphics package for Newonce radio.',
    thumbnail: 'https://picsum.photos/id/150/200/200',
    previewImage: 'https://picsum.photos/id/150/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/150/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/151/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/152/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/153/800/600' },
    ],
    position: { top: '65%', left: '62%' },
  },
  {
    id: 'merch',
    title: 'MERCH',
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
    position: { top: '64%', left: '52%' },
  },
  {
    id: 'fantasmagorie',
    title: 'FANTASMAGORIE',
    category: 'Art',
    description: 'Surrealist digital art series.',
    thumbnail: 'https://picsum.photos/id/170/200/200',
    previewImage: 'https://picsum.photos/id/170/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/170/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/171/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/172/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/173/800/600' },
    ],
    position: { top: '70%', left: '45%' },
  },
  {
    id: 'ryk-x-sexed',
    title: 'RYK X SEXED',
    category: 'Campaign',
    description: 'Social awareness campaign graphics.',
    thumbnail: 'https://picsum.photos/id/180/200/200',
    previewImage: 'https://picsum.photos/id/180/800/600',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { type: 'image', url: 'https://picsum.photos/id/180/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/181/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/182/800/600' },
      { type: 'image', url: 'https://picsum.photos/id/183/800/600' },
    ],
    position: { top: '78%', left: '72%' },
  },
];

// 3. Dock Items (The bar at the bottom)
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

// 4. Dock App Contents (What happens when you click a Dock Icon)
export const DOCK_APPS_CONTENT: Record<string, Project> = {
  ae: {
    id: 'ae',
    title: 'Adobe After Effects',
    category: 'Application',
    description: 'Create cinematic movie titles, intros, and transitions. Remove an object from a clip. Start a fire or make it rain. Navigate and design in a 3D space. With After Effects, the industry-standard motion graphics and visual effects software, you can take any idea and make it move.',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b79931fd29a?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1626785774573-4b79931fd29a?auto=format&fit=crop&w=1200&q=80' }
    ],
    position: { top: '0', left: '0' }
  },
  ps: {
    id: 'ps',
    title: 'Adobe Photoshop',
    category: 'Application',
    description: 'From photo editing and compositing to digital painting, animation, and graphic design — you can do it all in Photoshop. Bring ideas to life across desktop and iPad. Magically transform images with the power of AI.',
    thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&w=1200&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1572044162444-ad6021105507?auto=format&fit=crop&w=1200&q=80' }
    ],
    position: { top: '0', left: '0' }
  },
  ai: {
    id: 'ai',
    title: 'Adobe Illustrator',
    category: 'Application',
    description: 'The industry-standard vector graphics software lets you create everything from web and mobile graphics to logos, icons, book illustrations, product packaging, and billboards.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=100&q=80',
    previewImage: 'https://images.unsplash.com/photo-1572044162444-ad6021105507?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1572044162444-ad6021105507?auto=format&fit=crop&w=1200&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1626785774573-4b79931fd29a?auto=format&fit=crop&w=1200&q=80' }
    ],
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
    gallery: [
        { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80' },
    ],
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
      { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
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
    gallery: [
        { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1200&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&w=1200&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80' },
    ],
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
