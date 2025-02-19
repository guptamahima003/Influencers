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
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  pickupDate: string;
  options: ProductOption[];
} 