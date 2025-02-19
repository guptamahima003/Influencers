"use client";

import { useEffect, useRef, useState } from 'react';
import { X, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Story, StoryItem } from '../types';

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
}

export default function StoryViewer({ stories, initialStoryIndex, onClose }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentStory = stories[currentStoryIndex];
  const currentItem = currentStory?.stories[currentItemIndex];

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!currentItem) return;

    // Reset progress when story changes
    setProgress(0);
    setIsPaused(false);

    const duration = currentItem.type === 'video' && videoRef.current 
      ? videoRef.current.duration 
      : currentItem.duration;

    progressInterval.current = setInterval(() => {
      if (!isPaused) {
        setProgress(prev => {
          const newProgress = prev + (100 / (duration * 1000));
          if (newProgress >= 100) {
            goToNextItem();
            return 0;
          }
          return newProgress;
        });
      }
    }, 10);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentStoryIndex, currentItemIndex, isPaused]);

  const goToNextItem = () => {
    if (currentItemIndex < currentStory.stories.length - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setCurrentItemIndex(0);
    } else {
      onClose();
    }
  };

  const goToPreviousItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(prev => prev - 1);
    } else if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setCurrentItemIndex(stories[currentStoryIndex - 1].stories.length - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;

    // Check if horizontal swipe is more prominent than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Swipe left - next story
          if (currentStoryIndex < stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setCurrentItemIndex(0);
          } else {
            onClose();
          }
        } else {
          // Swipe right - previous story
          if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prev => prev - 1);
            setCurrentItemIndex(0);
          }
        }
      }
    } else {
      // Vertical swipe handling
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          // Swipe up - next item
          goToNextItem();
        } else {
          // Swipe down - previous item
          goToPreviousItem();
        }
      }
    }
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={currentStory.image}
                alt={currentStory.username}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-white font-medium">{currentStory.username}</span>
          </div>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>

        {/* Progress bars */}
        <div className="flex gap-1 mt-4">
          {currentStory.stories.map((story, index) => (
            <div 
              key={story.id} 
              className="flex-1 h-0.5 bg-white/30 overflow-hidden"
            >
              <div 
                className="h-full bg-white transition-all duration-10"
                style={{ 
                  width: `${index === currentItemIndex ? progress : index < currentItemIndex ? 100 : 0}%`
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Story Content */}
      <div 
        className="absolute inset-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={togglePause}
      >
        {currentItem.type === 'image' ? (
          <Image
            src={currentItem.url}
            alt=""
            fill
            className="object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            src={currentItem.url}
            className="w-full h-full object-contain"
            autoPlay
            playsInline
            muted
          />
        )}
      </div>

      {/* Navigation buttons */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
        onClick={goToPreviousItem}
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
        onClick={goToNextItem}
      >
        <ChevronRight size={32} />
      </button>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/40 rounded-full p-4">
            <Play size={48} className="text-white/80" />
          </div>
        </div>
      )}
    </div>
  );
} 