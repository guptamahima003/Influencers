"use client";

import { X, Send } from 'lucide-react';
import { useState } from 'react';
import { useInteractions } from '../context/InteractionsContext';
import Image from 'next/image';

interface CommentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export default function CommentSheet({ isOpen, onClose, videoId }: CommentSheetProps) {
  const { getComments, addComment } = useInteractions();
  const [newComment, setNewComment] = useState('');
  const comments = getComments(videoId);

  const handleSubmit = () => {
    if (newComment.trim()) {
      addComment(videoId, newComment);
      setNewComment('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div 
        className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-gradient-to-b from-[#0046BE] to-[#001B47] rounded-t-3xl overflow-hidden"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        <style jsx>{`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
        `}</style>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0046BE]/95 backdrop-blur-sm">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <span className="text-white font-medium">Comments</span>
            <button onClick={onClose}>
              <X size={24} className="text-white/80 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="overflow-y-auto max-h-[calc(85vh-180px)] p-4 space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt={comment.username}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-white font-medium">{comment.username}</span>
                  <span className="text-white/60 text-xs">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white/80 mt-1">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="sticky bottom-0 bg-[#0046BE]/95 backdrop-blur-sm border-t border-white/10 p-4">
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-white/10 text-white px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-[#FFE000]/50"
            />
            <button
              onClick={handleSubmit}
              className="text-[#FFE000] hover:text-[#FFE000]/80 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 