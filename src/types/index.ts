export interface Story {
  id: string;
  username: string;
  image: string;
  isLive?: boolean;
  stories: StoryItem[];
  viewed: boolean;
}

export interface StoryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  duration: number; // in seconds
  createdAt: string;
}

export interface ProductOption {
  type: 'color' | 'storage';
  name: string;
  values: {
    id: string;
    label: string;
    available: boolean;
    image?: string;
  }[];
}

export interface ProductDetails {
  id: string;
  title: string;
  price: number;
  images: string[];
  image?: string;
  quantity: number;
  rating?: number;
  reviewCount?: number;
  pickupDate?: string;
  options?: ProductOption[];
} 