
export interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: string; // e.g., "Various artists", "Music Video"
  description: string;
  thumbnail: string;
  previewImage: string;
  videoUrl?: string;
  gallery?: MediaItem[]; // Support for multiple media items
  position: { top: string; left: string }; // Percentage based position
  mobileOrder?: number;
}

export interface DockItem {
  label: string;
  iconType: 'ae' | 'ps' | 'ai' | 'warning' | 'notes' | 'photos' | 'insta' | 'netease' | 'mail' | 'trash' | 'terminal';
}
