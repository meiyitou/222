
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

// 2. Desktop Projects (Icons scattered on desktop)
export const PROJECTS: Project[] = [
  {
    id: 'stage-visuals',
    title: '壮壮',
    category: 'Various artists',
    description: "mc阿壮.神一样的男人.",
    thumbnail: 'https://picsum.photos/id/20/200/200',
    previewImage: 'https://picsum.photos/id/20/800/500',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/d4678b038f84fc49d10eb6ee84ab1e55.jpg' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/5fb9c6c46332bc39ada289ca9f0077d9.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/3cddd28ce8be807f8cea0a4552bfe77d.mp4' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/lv_0_20250308154654.gif' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/c013036b24feb24e4a405c38a9d5a5ca.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/dcd7cc7e3d286299e3c7872bdca43f80.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/lv_0_20241210132530-middle-original-1.gif' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/8b7bf2e982b75d70219d0cdfab548cbd.mp4' }
    ],
    position: { top: '10%', left: '5%' },
  },
  {
    id: '壮壮与虎啸',
    title: '壮壮与虎啸',
    category: 'Print Design',
    description: 'Visual identity and vinyl packaging design for the Hotel Mafija project.',
    thumbnail: 'https://picsum.photos/id/30/200/200',
    previewImage: 'https://picsum.photos/id/30/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/75ead455d274fde1033e4e95d1545f73.jpg' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/cdacbdce188c02e0d28c3cff69671711.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/4e580a7b269d03346d8f3d6e81d61cb6.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/9081091fb97d21d75878834a62af64f3.mp4' },
    ],
    position: { top: '5%', left: '40%' },
  },
  {
    id: 'efemmera',
    title: '晨阳',
    category: '依旧跑车',
    description: '只能说非常之没意头.',
    thumbnail: 'https://picsum.photos/id/40/200/200',
    previewImage: 'https://picsum.photos/id/40/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/屏幕截图-2025-11-26-192645.png' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/屏幕截图-2025-11-26-192712.png' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/64a09a19acc2ac2418caf837dd62d8d8.mp4' },
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
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/2cb6b10f9232a20e994670d2671dfad4.jpg',
    previewImage: 'https://www.meiyitou.top/wp-content/uploads/2025/11/2cb6b10f9232a20e994670d2671dfad4.jpg',
    gallery: [
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/8e45db5905def0779e676134f95d5967-1.mp4' },
    ],
    position: { top: '15%', left: '75%' },
  },
  {
    id: 'dubhe',
    title: 'DUBHE',
    category: '干就完了',
    description: '东隅已逝，桑榆非晚。.',
    thumbnail: 'https://picsum.photos/id/60/200/200',
    previewImage: 'https://picsum.photos/id/60/800/600',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/619941e1ea4a2760cd267dee639ed0d6.jpg' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/ad59534ecdb996ca9895e90d3774e01e.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/a8b21fd3136a2cf6e8be0a765ef3dc9f.mp4' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_jp4bmkjp4bmkjp4b_2025-11-25_01-04-00.png' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/68f40e24c24cdafmiwsxrf3810-1.webp' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/f9165144c6cac18c47f7f36987a30639.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/425d4f874c964b742abc467cc77e85b7.mp4' },
    ],
    position: { top: '30%', left: '58%' },
  },
  {
    id: '香烟',
    title: 'cigarette',
    category: 'Campaign',
    description: 'Marketing campaign visuals for a major polish fashion drop.',
    thumbnail: 'https://picsum.photos/id/70/200/200',
    previewImage: 'https://picsum.photos/id/70/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/5aca5d58b6d90f815243a67ee788f2b6.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/8b2aad9b5ae3aae8f9a9af3d822ca990.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/1752377101365-740.jpg' },
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
    title: '风景',
    category: 'Motion Design',
    description: 'A series of experimental collage animations.',
    thumbnail: 'https://picsum.photos/id/90/200/200',
    previewImage: 'https://picsum.photos/id/90/800/600',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/54a1497897407076edcbf48bde3aea6c.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2024/09/微信图片_20240912234726.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/65bacaefe40d096a89c7a414db5d72ea.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/626ed882d0952dd7cff00510e94d7210.jpg' },
    ],
    position: { top: '45%', left: '56%' },
  },
  {
    id: 'interludium',
    title: 'NET',
    category: 'Album Art',
    description: '数字.',
    thumbnail: 'https://picsum.photos/id/100/200/200',
    previewImage: 'https://picsum.photos/id/100/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/b9dc475c31900d56cfa79a35bd83ff5d.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/b344529530e2fbec142daa199ef154e8.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/f443c10b5530085ba1fad1eb0cf08c8a.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/55fafbb8ee15567ef06090c52d7d0d8d.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/c73cbf4dbf4ff85e666c6171f7c1a3ff.jpg' },
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
    title: '电影',
    category: 'Branding',
    description: 'Collaborative branding project.',
    thumbnail: 'https://picsum.photos/id/120/200/200',
    previewImage: 'https://picsum.photos/id/120/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Dlh3ZFvFj4gcN3E41r2fHIv2R1M.avif' },
      { type: 'video', url: 'https://meiyitou.top/wp-content/uploads/2025/01/1月1日_21.mp4' },
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
    title: '世龙',
    category: 'Media',
    description: '点评不了.',
    thumbnail: 'https://picsum.photos/id/150/200/200',
    previewImage: 'https://picsum.photos/id/150/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/unnamed.jpg' },
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
  { label: 'Solar System', iconType: 'solar' },
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
  solar: {
    id: 'solar',
    title: 'Solar System',
    category: 'Science',
    description: 'Real-time 3D orbital simulation of the Solar System.',
    thumbnail: 'https://images.unsplash.com/photo-1614730341194-75c60740a5d3?auto=format&fit=crop&w=200&q=80',
    previewImage: '',
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
       { type: 'image', url: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?auto=format&fit=crop&w=1200&q=80' }, 
       { type: 'image', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80' }, 
       { type: 'image', url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=1200&q=80' }, 
    ],
    position: { top: '0', left: '0' }
  },
  insta: {
    id: 'insta',
    title: 'Instagram',
    category: 'Social Media',
    description: 'Latest posts from @bychudy.\n\n"Creating digital experiences that matter."\n\nFollow for more design updates and behind the scenes work.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/f71815bc0583f350f5cc3abbeed3627e.jpg',
    previewImage: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1200&q=80',
    gallery: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&w=800&q=80' },
        { type: 'video', url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80' },
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
