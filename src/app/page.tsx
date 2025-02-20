"use client";

import VideoCard from '../components/VideoCard';
import Story from '../components/Story';
import StoryViewer from '../components/StoryViewer';
import { useState, useEffect } from 'react';
import { Story as StoryType } from '../types';
import { fetchInstagramHashtagMedia } from '../services/mockInstagram';
import YouTubeShorts from '../components/YouTubeShorts';
import { mockProduct } from '../data/mockProducts';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CategorySection from '../components/CategorySection';

const stories: StoryType[] = [
  {
    id: '1',
    username: "BestBuy_Tech",
    image: "https://randomuser.me/api/portraits/men/91.jpg",
    viewed: false,
    stories: [
      {
        id: '1-1',
        type: 'image',
        url: "https://picsum.photos/id/1/1080/1920", // Tech store image
        duration: 5,
        createdAt: new Date().toISOString()
      },
      {
        id: '1-2',
        type: 'image',
        url: "https://picsum.photos/id/2/1080/1920", // Latest gadgets
        duration: 5,
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '2',
    username: "apple_zone",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    isLive: true,
    viewed: false,
    stories: [
      {
        id: '2-1',
        type: 'image',
        url: "https://picsum.photos/id/3/1080/1920", // Apple products
        duration: 5,
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '3',
    username: "gaming_hub",
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    viewed: false,
    stories: [
      {
        id: '3-1',
        type: 'image',
        url: "https://picsum.photos/id/4/1080/1920", // Gaming setup
        duration: 5,
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '4',
    username: "samsung_deals",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    isLive: true,
    viewed: false,
    stories: [
      {
        id: '4-1',
        type: 'image',
        url: "https://picsum.photos/id/5/1080/1920", // Samsung products
        duration: 5,
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '5',
    username: "laptop_expert",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    viewed: false,
    stories: [
      {
        id: '5-1',
        type: 'image',
        url: "https://picsum.photos/id/6/1080/1920", // Laptop showcase
        duration: 5,
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '6',
    username: "smart_home",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    viewed: false,
    stories: [
      {
        id: '6-1',
        type: 'image',
        url: "https://picsum.photos/id/7/1080/1920", // Smart home devices
        duration: 5,
        createdAt: new Date().toISOString()
      }
    ]
  }
];

interface InstagramVideo {
  username: string;
  followers: number; // Note: Instagram API doesn't provide follower count
  description: string;
  profileImage: string;
  videoUrl: string;
}

// Add this component for the premium header
function PremiumHeader() {
  const { cartCount } = useCart();

  return (
    <div className="sticky top-0 z-20 w-full">
      {/* Gradient Background with Blur - Updated colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#36B9DA] via-[#0046BE] to-[#36B9DA] opacity-90 backdrop-blur-lg" />
      
      {/* Content */}
      <div className="relative w-full">
        {/* Top Bar */}
        <div className="px-6 py-3 flex items-center justify-between border-b border-white/10">
          <div>
            <h1 className="text-base font-bold flex items-center gap-1">
              <span className="text-[#FFD700]">Best Buy</span>
              <span className="text-white">
                Influencer Corner
              </span>
            </h1>
            <p className="text-white/80 text-xs font-medium tracking-wide">
              Where Tech Meets Style
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button className="text-white/80 hover:text-[#FFD700] transition-colors relative group">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD700] rounded-full hidden group-hover:block" />
            </button>

            <div className="relative">
              <button className="text-white/80 hover:text-[#FFD700] transition-colors p-1">
                <ShoppingCart size={20} />
              </button>
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#FFD700] to-[#FFC000] text-[#0077B6] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {cartCount}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Highlight Bar */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50" />
      </div>
    </div>
  );
}

export default function Home() {
  const [videos, setVideos] = useState<InstagramVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastOpenedIndex, setLastOpenedIndex] = useState<number | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const { cartCount } = useCart();

  useEffect(() => {
    async function loadInstagramContent() {
      try {
        const instagramMedia = await fetchInstagramHashtagMedia();
        
        // Filter for videos only and transform to our format
        const videoContent = instagramMedia
          .filter(media => media.media_type === 'VIDEO')
          .map(media => ({
            username: media.username,
            followers: Math.floor(Math.random() * 50000) + 10000, // Random follower count for demo
            description: media.caption || '',
            profileImage: media.profileImage, // Use the profile image from mock data
            videoUrl: media.media_url
          }));

        setVideos(videoContent);
      } catch (error) {
        console.error('Error loading Instagram content:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInstagramContent();
  }, []);

  const handleNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
      setLastOpenedIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
      setLastOpenedIndex(currentVideoIndex - 1);
    }
  };

  const handleFullscreenChange = (isOpen: boolean, index: number) => {
    setIsFullscreen(isOpen);
    if (isOpen) {
      setLastOpenedIndex(index);
      setCurrentVideoIndex(index);
    } else {
      setLastOpenedIndex(null);
    }
  };

  const handleStoryClick = (index: number) => {
    setActiveStoryIndex(index);
  };

  const handleCloseStory = () => {
    setActiveStoryIndex(null);
  };

  return (
    <main className="bg-gradient-to-b from-[#F8FDFF] to-[#E3F8FF] min-h-screen w-full">
      <div className="w-full mx-auto h-screen overflow-y-auto scrollbar-hide">
        <PremiumHeader />

        {/* Stories Section */}
        <div>
          <h2 className="text-[#030303] font-bold text-lg px-4 py-3">
            Guide to influencers' go-to gadgets
          </h2>
          <div className="py-2 backdrop-blur-sm border-b border-[#90E0EF]/20">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 px-4 items-center">
                {stories.map((story, index) => (
                  <Story
                    key={story.id}
                    story={story}
                    onClick={handleStoryClick}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Section */}
        <CategorySection />

        {/* Feed Section */}
        <div className="px-4">
          <div className="space-y-4 py-4">
            {loading ? (
              <div className="flex justify-center items-center py-6">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#00B4D8] border-t-transparent"></div>
              </div>
            ) : videos.length > 0 ? (
              <>
                <h2 className="text-[#030303] font-bold text-lg mb-4">Featured Videos</h2>
                {videos.slice(0, 2).map((video, index) => (
                  <VideoCard
                    key={index}
                    {...video}
                    id={video.videoUrl}
                    product={mockProduct}
                    onNext={handleNextVideo}
                    onPrevious={handlePreviousVideo}
                    isFirst={index === 0}
                    isLast={index === videos.length - 1}
                    isFullscreen={isFullscreen && index === lastOpenedIndex}
                    onFullscreenChange={(isOpen) => handleFullscreenChange(isOpen, index)}
                  />
                ))}

                {/* YouTube Shorts Section */}
                <div className="space-y-4">
                  <h2 className="text-[#030303] font-bold text-lg">Trending Shorts</h2>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-[#0077B6] rounded-2xl blur opacity-10"></div>
                    <YouTubeShorts />
                  </div>
                </div>

                <h2 className="text-[#030303] font-bold text-lg mt-6 mb-4">More Videos</h2>
                {videos.slice(2).map((video, index) => (
                  <VideoCard
                    key={index + 2}
                    {...video}
                    id={video.videoUrl}
                    product={mockProduct}
                    onNext={handleNextVideo}
                    onPrevious={handlePreviousVideo}
                    isFirst={false}
                    isLast={index + 2 === videos.length - 1}
                    isFullscreen={isFullscreen && index + 2 === lastOpenedIndex}
                    onFullscreenChange={(isOpen) => handleFullscreenChange(isOpen, index + 2)}
                  />
                ))}
              </>
            ) : (
              <div className="text-center py-6 text-[#030303]/60 text-sm">
                No videos found with #bestbuy
              </div>
            )}
          </div>
        </div>

        {/* Story Viewer */}
        {activeStoryIndex !== null && (
          <StoryViewer
            stories={stories}
            initialStoryIndex={activeStoryIndex}
            onClose={handleCloseStory}
          />
        )}
      </div>
    </main>
  );
} 