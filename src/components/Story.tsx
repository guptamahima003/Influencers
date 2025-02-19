"use client";

import Image from 'next/image';
import { Story as StoryType } from '../types';

interface StoryProps {
  story: StoryType;
  onClick: (index: number) => void;
  index: number;
}

export default function Story({ story, onClick, index }: StoryProps) {
  return (
    <button 
      onClick={() => onClick(index)}
      className="flex flex-col items-center gap-1"
    >
      <div 
        className={`relative w-16 h-16 rounded-full p-[3px] cursor-pointer ${
          story.viewed 
            ? 'bg-gray-200' 
            : 'bg-gradient-to-tr from-[#00B4D8] to-[#FFD700]'
        }`}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
          <Image
            src={story.image}
            alt={story.username}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          {story.isLive && (
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#00B4D8] to-[#0077B6] px-2 py-0.5 text-[10px] text-white font-medium text-center">
              LIVE
            </div>
          )}
        </div>
      </div>
      <span className="text-[#0077B6] font-medium text-xs truncate w-16 text-center">
        {story.username}
      </span>
    </button>
  );
} 