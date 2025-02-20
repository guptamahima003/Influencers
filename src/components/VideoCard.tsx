"use client";

import { useEffect, useRef, useState, TouchEvent } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Heart,
  Volume2,
  Eye,
  Play,
  Pause,
  X,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import ProductBottomSheet from "./ProductBottomSheet";
import { ProductDetails } from "../types";
import { useInteractions } from "../context/InteractionsContext";
import CommentSheet from "./CommentSheet";

interface VideoCardProps {
  username: string;
  followers: number;
  description: string;
  profileImage: string;
  videoId: string;
  onNext?: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  isFullscreen?: boolean;
  onFullscreenChange?: (isOpen: boolean) => void;
  product: ProductDetails;
  id: string;
}

export default function VideoCard({
  username,
  followers,
  description,
  profileImage,
  videoId,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  isFullscreen = false,
  onFullscreenChange,
  product,
  id,
}: VideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const minSwipeDistance = 50;
  const [slideDirection, setSlideDirection] = useState<"up" | "down">("up");
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);
  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);
  const { isLiked, isSaved, toggleLike, toggleSave, getComments } =
    useInteractions();
  const comments = getComments(id);

  const getYouTubeEmbedUrl = (
    videoId: string,
    options: { autoplay?: boolean; muted?: boolean } = {}
  ) => {
    const baseUrl = "https://www.youtube.com/embed/";
    const params = new URLSearchParams({
      enablejsapi: "1",
      controls: "0",
      mute: options.muted ? "1" : "0",
      autoplay: options.autoplay ? "1" : "0",
      playsinline: "1",
      loop: "1",
      modestbranding: "1",
      rel: "0",
      playlist: videoId,
      origin: typeof window !== "undefined" ? window.location.origin : "",
    });
    return `${baseUrl}${videoId}?${params.toString()}`;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = entry.target.querySelector("iframe");
          if (!iframe) return;

          if (entry.intersectionRatio >= 0.7) {
            iframe.src = getYouTubeEmbedUrl(videoId, {
              autoplay: true,
              muted: isMuted,
            });
            setIsPlaying(true);
          } else {
            iframe.src = getYouTubeEmbedUrl(videoId, {
              autoplay: false,
              muted: isMuted,
            });
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: [0.7],
      }
    );

    observer.observe(container);
    return () => observer.unobserve(container);
  }, [videoId, isMuted]);

  const handleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFullscreenChange?.(true);
    document.body.style.overflow = "hidden";
  };

  const closeFullscreen = () => {
    onFullscreenChange?.(false);
    document.body.style.overflow = "";
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);

    const iframe = containerRef.current?.querySelector("iframe");
    if (iframe) {
      iframe.src = getYouTubeEmbedUrl(videoId, {
        autoplay: newIsPlaying,
        muted: isMuted,
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIsMuted = !isMuted;
    setIsMuted(newIsMuted);

    const iframe = containerRef.current?.querySelector("iframe");
    if (iframe) {
      iframe.src = getYouTubeEmbedUrl(videoId, {
        autoplay: isPlaying,
        muted: newIsMuted,
      });
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    const swipeDistance = touchStartY.current - touchEndY.current;
    const absDistance = Math.abs(swipeDistance);

    if (absDistance > minSwipeDistance) {
      if (swipeDistance > 0 && !isLast) {
        setSlideDirection("up");
        onNext?.();
      } else if (swipeDistance < 0 && !isFirst) {
        setSlideDirection("down");
        onPrevious?.();
      }
    }
  };

  return (
    <>
      <div
        className="relative w-full aspect-[5/7] snap-start mx-auto overflow-hidden rounded-xl"
        onClick={handleTap}
        ref={containerRef}
      >
        {/* Video Container */}
        <div className="absolute inset-0 w-full h-full bg-black">
          <iframe
            src={getYouTubeEmbedUrl(videoId, { autoplay: false, muted: true })}
            className="w-full h-full object-cover"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Play size={48} className="text-white/80" />
            </div>
          )}
        </div>

        {/* Content Overlay - Removed gradient and profile info */}
        <div className="relative h-full flex flex-col justify-end p-6 z-10">
          {/* Bottom Section */}
          <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
            {/* Shop CTA */}
            <button
              className="flex items-center gap-2 bg-[#FFD700] backdrop-blur-md px-5 py-2.5 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsProductSheetOpen(true);
              }}
            >
              <ShoppingBag size={20} className="text-[#0077B6]" />
              <span className="text-[#0077B6] font-bold">Shop</span>
            </button>

            {/* Description */}
            <p className="text-white text-sm">{description}</p>

            {/* Controls */}
            <div className="flex justify-between items-center pb-4">
              <div className="flex gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(id);
                  }}
                  className="text-white hover:scale-110 transition-transform"
                >
                  <ThumbsUp
                    size={24}
                    fill={isLiked(id) ? "white" : "none"}
                    className={isLiked(id) ? "text-white" : "text-white/80"}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCommentSheetOpen(true);
                  }}
                  className="text-white hover:scale-110 transition-transform"
                >
                  <MessageCircle size={24} className="text-white/80" />
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(id);
                  }}
                  className="text-white hover:scale-110 transition-transform"
                >
                  <Heart
                    size={24}
                    fill={isSaved(id) ? "white" : "none"}
                    className={isSaved(id) ? "text-white" : "text-white/80"}
                  />
                </button>
                <button
                  className="text-white hover:scale-110 transition-transform"
                  onClick={toggleMute}
                >
                  <Volume2 size={24} className="text-white/80" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed bg-black z-50"
          style={{
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
          }}
        >
          {/* Close button and navigation hints container - static */}
          <div className="absolute inset-0 z-50 pointer-events-none">
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 pointer-events-auto"
            >
              <X size={24} />
            </button>

            {!isFirst && (
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                Swipe down for previous
              </div>
            )}
            {!isLast && (
              <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                Swipe up for next
              </div>
            )}
          </div>

          {/* Animated video container */}
          <div
            className="touch-none"
            style={{
              margin: 0,
              padding: 0,
              width: "100vw",
              height: "100vh",
              animation: `${
                slideDirection === "up" ? "slideUp" : "slideDown"
              } 0.3s ease-out`,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <style jsx>{`
              @keyframes slideUp {
                from {
                  transform: translateY(100%);
                }
                to {
                  transform: translateY(0);
                }
              }
              @keyframes slideDown {
                from {
                  transform: translateY(-100%);
                }
                to {
                  transform: translateY(0);
                }
              }
            `}</style>

            <div className="absolute inset-0">
              <iframe
                src={getYouTubeEmbedUrl(videoId, {
                  autoplay: true,
                  muted: isMuted,
                })}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex justify-between items-center">
                  <button
                    onClick={togglePlayPause}
                    className="text-white hover:scale-110 transition-transform"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="text-white hover:scale-110 transition-transform"
                  >
                    <Volume2 size={28} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProductBottomSheet
        isOpen={isProductSheetOpen}
        onClose={() => setIsProductSheetOpen(false)}
        product={product}
      />

      <CommentSheet
        isOpen={isCommentSheetOpen}
        onClose={() => setIsCommentSheetOpen(false)}
        videoId={id}
      />
    </>
  );
}
