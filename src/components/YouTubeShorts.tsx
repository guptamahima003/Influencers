"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, X } from "lucide-react";
import Image from "next/image";

interface YouTubeShort {
  username: string;
  profileImage: string;
  videoId: string;
  description?: string;
  followers?: number;
}

const shorts: YouTubeShort[] = [
  {
    username: "Best Buy",
    profileImage: "https://randomuser.me/api/portraits/men/21.jpg",
    videoId: "b4IF6wfLi8M",
    description: "Check out the latest tech at Best Buy! #bestbuy #tech",
    followers: 1200000,
  },
  {
    username: "Tech Deals",
    profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
    videoId: "pNvC9a3ABo0",
    description: "Best Buy Gaming Laptop Deals 2024 #gaming #laptops",
    followers: 850000,
  },
  {
    username: "Gadget Guide",
    profileImage: "https://randomuser.me/api/portraits/men/23.jpg",
    videoId: "FHBo5RgFnSk",
    description: "Top 5 Smartphones at Best Buy #phones #tech",
    followers: 950000,
  },
  {
    username: "Tech Today",
    profileImage: "https://randomuser.me/api/portraits/men/24.jpg",
    videoId: "wci_Yscw0B4",
    description: "Best Buy Home Theater Setup Guide #hometheater",
    followers: 750000,
  },
];

export default function YouTubeShorts() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);

  const handleTap = (index: number) => {
    setCurrentShortIndex(index);
    setIsFullscreen(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = "";
  };

  return (
    <div className="py-6">
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-bold text-[#030303] flex items-center gap-2">
            <span className="text-[#FFE000]">#BestBuy</span>
            <span className="text-[#030303]">Premium Tech</span>
          </h2>
          <button className="text-[#FFE000] text-xs font-medium hover:text-[#030303] transition-colors">
            View All
          </button>
        </div>
        <p className="text-[#030303]/60 text-xs">
          Discover the latest tech reviews and unboxings
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-3">
        {shorts.map((short, index) => (
          <div
            key={index}
            className="relative aspect-[5/7] rounded-2xl overflow-hidden group cursor-pointer transform transition-transform hover:scale-[1.02]"
            onClick={() => handleTap(index)}
          >
            <div className="absolute inset-0 w-full h-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${short.videoId}`}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
              <div className="absolute inset-0 bg-[#0046BE]/20 pointer-events-none" />
            </div>

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
                <span className="text-white text-sm font-medium">
                  {short.username}
                </span>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-[#FFE000] rounded-full p-4 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                <Play size={24} className="text-[#0046BE]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50">
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-20 bg-black/20 backdrop-blur-md rounded-full"
          >
            <X size={24} />
          </button>

          <div className="relative h-full">
            <iframe
              src={`https://www.youtube.com/embed/${shorts[currentShortIndex].videoId}?autoplay=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
