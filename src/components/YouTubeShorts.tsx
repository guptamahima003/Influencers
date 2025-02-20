"use client";

import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, X } from 'lucide-react';
import Image from 'next/image';

interface YouTubeShort {
  username: string;
  profileImage: string;
  videoUrl: string;
  // These will only be shown in fullscreen
  followers?: number;
  description?: string;
  thumbnailUrl?: string;
}

const shorts: YouTubeShort[] = [
  {
    username: "Best Buy",
    profileImage: "https://randomuser.me/api/portraits/men/21.jpg",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: "Check out the latest tech at Best Buy! #bestbuy #tech",
    followers: 1200000
  },
  {
    username: "Tech Deals",
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: "Best Buy Gaming Laptop Deals 2024 #gaming #laptops",
    followers: 850000
  },
  {
    username: "Gadget Guide",
    profileImage: "https://randomuser.me/api/portraits/men/23.jpg",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    description: "Top 5 Smartphones at Best Buy #phones #tech",
    followers: 950000
  },
  {
    username: "Tech Today",
    profileImage: "https://randomuser.me/api/portraits/men/24.jpg",
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: "Best Buy Home Theater Setup Guide #hometheater",
    followers: 750000
  }
];

export default function YouTubeShorts() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Add ref for grid videos after shorts declaration
  const videoRefs = shorts.map(() => useRef<HTMLVideoElement>(null));

  const handleTap = (index: number) => {
    setCurrentShortIndex(index);
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = '';
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play().catch(error => {
        console.error("Play failed:", error);
      });
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Add intersection observer to handle grid video previews
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(() => {
            // Handle any autoplay errors silently
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, options);

    // Observe all grid videos
    videoRefs.forEach((videoRef) => {
      if (videoRef.current) {
        observer.observe(videoRef.current);
      }
    });

    return () => {
      videoRefs.forEach((videoRef) => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      });
    };
  }, []);

  return (
    <div className="py-6">
      {/* Reduced heading font size */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-[#030303] flex items-center gap-2">
            <span className="text-[#FFE000]">#BestBuy</span>
            <span className="text-[#030303]">
              Premium Tech
            </span>
          </h2>
          <button className="text-[#FFE000] text-xs font-medium hover:text-[#030303] transition-colors">
            View All
          </button>
        </div>
        <p className="text-[#030303]/60 text-xs">Discover the latest tech reviews and unboxings</p>
      </div>

      {/* Premium Grid Layout */}
      <div className="grid grid-cols-2 gap-3 px-3">
        {shorts.map((short, index) => (
          <div 
            key={index}
            className="relative aspect-[5/7] rounded-2xl overflow-hidden group cursor-pointer transform transition-transform hover:scale-[1.02]"
            onClick={() => handleTap(index)}
          >
            {/* Video Preview with Premium Overlay */}
            <div className="absolute inset-0 w-full h-full bg-black">
              <video
                ref={videoRefs[index]}
                className="w-full h-full object-cover"
                playsInline
                loop
                muted
                controls={false}
              >
                <source src={short.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
              <div className="absolute inset-0 bg-[#0046BE]/20" />
            </div>

            {/* Premium Username Bar with Blur */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md p-2 rounded-full">
                <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#FFE000] ring-offset-1 ring-offset-black/50">
                  <Image
                    src={short.profileImage}
                    alt={short.username}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white text-sm font-medium">{short.username}</span>
              </div>
            </div>

            {/* Premium Play Button with Hover Effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-[#FFE000] rounded-full p-4 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                <Play size={24} className="text-[#0046BE]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50">
          <button 
            onClick={closeFullscreen}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-20 bg-black/20 backdrop-blur-md rounded-full"
          >
            <X size={24} />
          </button>

          <div className="relative h-full">
            <video
              ref={videoRef}
              src={shorts[currentShortIndex].videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              loop
              muted={isMuted}
            />

            {/* Premium Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/60 to-transparent">
              <div className="flex justify-between items-center max-w-md mx-auto">
                <button 
                  onClick={togglePlayPause}
                  className="bg-[#FFE000] text-[#0046BE] rounded-full p-4 hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="bg-white/10 backdrop-blur-md text-white rounded-full p-4 hover:scale-110 transition-transform"
                >
                  <Volume2 size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 