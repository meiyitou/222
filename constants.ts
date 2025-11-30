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
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/d4678b038f84fc49d10eb6ee84ab1e55.jpg',
    previewImage: 'https://picsum.photos/id/20/800/500',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/d4678b038f84fc49d10eb6ee84ab1e55.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/b0a34e377d31be7381f9424c02832605.jpg' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/3cddd28ce8be807f8cea0a4552bfe77d.mp4' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/lv_0_20250308154654.gif' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/c013036b24feb24e4a405c38a9d5a5ca.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/dcd7cc7e3d286299e3c7872bdca43f80.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/lv_0_20241210132530-middle-original-1.gif' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/8b7bf2e982b75d70219d0cdfab548cbd.mp4' }
    ],
    position: { top: '25%', left: '38%' }, 
  },
  {
    id: 'efemmera',
    title: '晨阳',
    category: '依旧跑车',
    description: '只能说非常之没意头.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_ve23ocve23ocve23.png',
    previewImage: 'https://picsum.photos/id/40/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_ve23ocve23ocve23.png' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/屏幕截图-2025-11-26-192712.png' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/64a09a19acc2ac2418caf837dd62d8d8.mp4' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/60bc32792bbc63b25128888a34750a2f.jpg' },
    ],
    position: { top: '15%', left: '30%' }, 
  },
  {
    id: '壮壮与虎啸',
    title: '壮壮与虎啸',
    category: '嘤嘤嘤',
    description: '.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/75ead455d274fde1033e4e95d1545f73.jpg',
    previewImage: 'https://picsum.photos/id/30/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/75ead455d274fde1033e4e95d1545f73.jpg' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/cdacbdce188c02e0d28c3cff69671711.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/4e580a7b269d03346d8f3d6e81d61cb6.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/9081091fb97d21d75878834a62af64f3.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/ac5160aec1c174dfd9d4e6daa2f92723.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/fe8bed53dc43ae7474a1c11b55e0be41.mp4' },
    ],
    position: { top: '32%', left: '25%' }, 
  },
  {
    id: 'kajecik',
    title: 'KAJECIK',
    category: '抽象',
    description: '.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/2cb6b10f9232a20e994670d2671dfad4.jpg',
    previewImage: 'https://www.meiyitou.top/wp-content/uploads/2025/11/2cb6b10f9232a20e994670d2671dfad4.jpg',
    gallery: [
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/8e45db5905def0779e676134f95d5967-1.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/a8b21fd3136a2cf6e8be0a765ef3dc9f.mp4' }
    ],
    position: { top: '12%', left: '20%' }, 
  },

  // === TOP RIGHT QUADRANT ===
  {
    id: 'dubhe',
    title: 'DUBHE',
    category: '干就完了',
    description: '东隅已逝，桑榆非晚。.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/619941e1ea4a2760cd267dee639ed0d6.jpg',
    previewImage: 'https://picsum.photos/id/60/800/600',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/619941e1ea4a2760cd267dee639ed0d6.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/unnamed-2_2025-11-28_01-14-16.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_jp4bmkjp4bmkjp4b_2025-11-25_01-04-00.png' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/68f40e24c24cdafmiwsxrf3810-1.webp' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/f9165144c6cac18c47f7f36987a30639.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/425d4f874c964b742abc467cc77e85b7.mp4' },
    ],
    position: { top: '25%', left: 'auto', right: '38%' }, 
  },
  {
    id: 'sbm-ff24',
    title: '虎啸',
    category: '',
    description: 'pubh里的天生少年.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_6f64kc6f64kc6f64_2025-11-28_00-32-15.png',
    previewImage: 'https://picsum.photos/id/140/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_6f64kc6f64kc6f64_2025-11-28_00-32-15.png' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/f322aa5fe6f7b7e1b30545c0fea94df7.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/dcc894a0725e8e3680cf5f36c99d41cd.jpg' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/c80e6a88c58addc1e649ea2d79705aaf.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/aa1d14bccda3a91a8172767a14e2bc5c.mp4' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/4f3f991018515389548bea029bb5735a.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/17699fd7ba25b4a349abd8c0fac39f2b.jpg' },
      
    ],
    position: { top: '15%', left: 'auto', right: '30%' }, 
  },
  {
    id: 'newonce',
    title: '世龙',
    category: 'Media',
    description: '依旧厕所抽一根，跳远点.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/屏幕截图-2025-11-28-004301.png',
    previewImage: 'https://picsum.photos/id/150/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/屏幕截图-2025-11-28-004301.png' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/b38450341dced623cdd70b24a0640e05.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/unnamed.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/屏幕截图-2025-11-28-004245.png' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/aac91662e13509fc8cc2de164b6cbd96.mp4' },
    ],
    position: { top: '32%', left: 'auto', right: '25%' }, 
  },
  {
    id: '香烟',
    title: 'cigarette',
    category: 'Campaign',
    description: 'no smoking.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/5aca5d58b6d90f815243a67ee788f2b6.jpg',
    previewImage: 'https://picsum.photos/id/70/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/5aca5d58b6d90f815243a67ee788f2b6.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/8b2aad9b5ae3aae8f9a9af3d822ca990.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/1752377101365-740.jpg' },
    ],
    position: { top: '12%', left: 'auto', right: '20%' }, 
  },

  // === BOTTOM LEFT QUADRANT ===
  {
    id: 'interludium',
    title: 'NET',
    category: 'Album Art',
    description: '数字.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/b9dc475c31900d56cfa79a35bd83ff5d.jpg',
    previewImage: 'https://www.meiyitou.top/wp-content/uploads/2025/11/b9dc475c31900d56cfa79a35bd83ff5d.jpg',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/b9dc475c31900d56cfa79a35bd83ff5d.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/b344529530e2fbec142daa199ef154e8.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/f443c10b5530085ba1fad1eb0cf08c8a.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/55fafbb8ee15567ef06090c52d7d0d8d.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/c73cbf4dbf4ff85e666c6171f7c1a3ff.jpg' },
    ],
    position: { top: '50%', left: '40%' }, 
  },
  {
    id: 'trasa-po-koncu',
    title: '电脑',
    category: '',
    description: '.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/IMG_20250602_173559-scaled.jpg',
    previewImage: 'https://www.meiyitou.top/wp-content/uploads/2025/11/IMG_20250602_173559-scaled.jpg',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/IMG_20250602_173559-scaled.jpg' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/02b1a591b9c77ea5f31f9489c06d35b5.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/883daa0a783de42a4e6e0e502afec08d-1.mp4' },
    ],
    position: { top: '60%', left: '32%' }, 
  },
  {
    id: 'solar-bialas',
    title: '电影',
    category: 'Branding',
    description: 'Collaborative branding project.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Dlh3ZFvFj4gcN3E41r2fHIv2R1M.avif',
    previewImage: 'https://picsum.photos/id/120/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Dlh3ZFvFj4gcN3E41r2fHIv2R1M.avif' },
      { type: 'video', url: 'https://meiyitou.top/wp-content/uploads/2025/01/1月1日_21.mp4' },
    ],
    position: { top: '72%', left: '24%' }, 
  },
  {
    id: 'chanel',
    title: '世奥',
    category: '',
    description: '.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_knuuqtknuuqtknuu_2025-11-29_02-08-43.png',
    previewImage: 'https://picsum.photos/id/130/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_knuuqtknuuqtknuu_2025-11-29_02-08-43.png' },
      { type: 'image', url: 'https://picsum.photos/id/130/800/600' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/ce2b4543eaee2cf8ce203b3c370a4c6c.mp4' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/ea110978498b879e48e7c489a11c6534.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/620ab918d9082c2fd3d630ab6d6563be.jpg' },
    ],
    position: { top: '72%', left: '38%' }, 
  },

  // === BOTTOM RIGHT QUADRANT ===
  {
    id: 'ryk-x-sexed',
    title: '臭的',
    category: '依然有事先下了',
    description: '.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_aosajaosajaosaja_2025-11-30_01-32-50.png',
    previewImage: 'https://picsum.photos/id/180/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_aosajaosajaosaja_2025-11-30_01-32-50.png' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/060da10db6ed9d405508af7d052f2313.mp4' },
    ],
    position: { top: '50%', left: 'auto', right: '40%' }, 
  },
  {
    id: 'merch',
    title: '梦杰',
    category: '',
    description: '.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/屏幕截图-2025-11-28-010041.png',
    previewImage: 'https://picsum.photos/id/160/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/屏幕截图-2025-11-28-010041.png' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/2165fabd72107934aa47bc53612d516b.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/mmexport1764349421350.gif' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/mmexport1764349798114.gif' },
    ],
    position: { top: '60%', left: 'auto', right: '32%' }, 
  },
  {
    id: 'fantasmagorie',
    title: '兴趣',
    category: '',
    description: '.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/68f40e24c24cdafmiwsxrf3810-1.webp',
    previewImage: 'https://picsum.photos/id/170/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/68f40e24c24cdafmiwsxrf3810-1.webp' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/d65db5e41045928d9cfaccb4cd57b510-2.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/a90930666014d1424f3eda1806f42d80-2.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/0e2c9e311c3fcffa875f4474e013c217-2.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/下载-17.mp4' },
    ],
    position: { top: '72%', left: 'auto', right: '24%' }, 
  },
  {
    id: 'trasa-konca',
    title: '北张庄',
    category: 'Concert Visuals',
    description: '中国哪有黑社会.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/f4613f0a371e297bb03ee54e4f3fd8ce.jpg',
    previewImage: 'https://picsum.photos/id/80/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/f4613f0a371e297bb03ee54e4f3fd8ce.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_6b8a316b8a316b8a_2025-11-30_01-28-28-scaled.png' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/fa9e4854e274c7ccad019a5d32efdd66-1.jpg' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/d31020282a51282465324959f67fb1fc.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/94a1ae6ea9cf3db9a38f0503bda7bc25-1.mp4' },
      { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/aac91662e13509fc8cc2de164b6cbd96.mp4' },
    ],
    position: { top: '45%', left: 'auto', right: '16%' }, 
  },
  {
    id: 'collage-animations',
    title: '风景',
    category: 'Motion Design',
    description: 'A series of experimental animations.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/54a1497897407076edcbf48bde3aea6c.jpg',
    previewImage: 'https://picsum.photos/id/90/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/54a1497897407076edcbf48bde3aea6c.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2024/09/微信图片_20240912234726.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/65bacaefe40d096a89c7a414db5d72ea.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/626ed882d0952dd7cff00510e94d7210.jpg' },
    ],
    position: { top: '36%', left: 'auto', right: '12%' }, 
  },
   {
    id: 'merch',
    title: '松酱',
    category: '',
    description: '.',
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/04e111279b6baf4a3b9a5f0be6b7fe11-scaled.jpg',
    previewImage: 'https://picsum.photos/id/160/800/600',
    gallery: [
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/04e111279b6baf4a3b9a5f0be6b7fe11-scaled.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/bd3c3768c6af1a37dfe966728698ebd6.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/4aea36f218a1978dd340f7ee9d40bac2-scaled.jpg' },
      { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/d4b16513838e156eab6b0b61e2577c45-scaled.jpg' },
    ],
    position: { top: '30%', left: 'auto', right: '32%' }, 
  },
];

export const DOCK_ITEMS: DockItem[] = [
  { label: 'After Effects', iconType: 'ae' },
  { label: 'Photoshop', iconType: 'ps' },
  { label: 'Illustrator', iconType: 'ai' },
  { label: 'Terminal', iconType: 'terminal' },
  // Removed Solar System
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
    gallery: [
        { type: 'video', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/8bd54bd3eed1ca605ff4b5858b416bbd-2.mp4' },
        { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/f07fbfbeba65d3941f9dac236cbb575f.jpg' },
        { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/07a5999c04b95e7800f596e5c64390d6.jpg' },
        { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/e6493c2b7e567f73bb201addb96197f9.jpg' },
        { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/11b764bec5ff1a421608ee2908828146.jpg' },
        { type: 'image', url: 'https://www.meiyitou.top/wp-content/uploads/2025/11/28945f224b672ae7b809cb0cc245e838.jpg' },
    ],
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
    thumbnail: 'https://www.meiyitou.top/wp-content/uploads/2025/11/Gemini_Generated_Image_jp4bmkjp4bmkjp4b_2025-11-25_01-04-00.png',
    previewImage: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?auto=format&fit=crop&w=1200&q=80',
    gallery: [
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