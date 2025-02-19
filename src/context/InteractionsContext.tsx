"use client";

import { createContext, useContext, useState } from 'react';

interface Interactions {
  likes: Set<string>;
  saves: Set<string>;
  comments: {
    [videoId: string]: Comment[];
  };
}

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
}

interface InteractionsContextType {
  likes: Set<string>;
  saves: Set<string>;
  comments: {
    [videoId: string]: Comment[];
  };
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  addComment: (videoId: string, text: string) => void;
  isLiked: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  getComments: (videoId: string) => Comment[];
}

const InteractionsContext = createContext<InteractionsContextType | undefined>(undefined);

export function InteractionsProvider({ children }: { children: React.ReactNode }) {
  const [interactions, setInteractions] = useState<Interactions>({
    likes: new Set(),
    saves: new Set(),
    comments: {}
  });

  const toggleLike = (id: string) => {
    setInteractions(prev => {
      const newLikes = new Set(prev.likes);
      if (newLikes.has(id)) {
        newLikes.delete(id);
      } else {
        newLikes.add(id);
      }
      return { ...prev, likes: newLikes };
    });
  };

  const toggleSave = (id: string) => {
    setInteractions(prev => {
      const newSaves = new Set(prev.saves);
      if (newSaves.has(id)) {
        newSaves.delete(id);
      } else {
        newSaves.add(id);
      }
      return { ...prev, saves: newSaves };
    });
  };

  const addComment = (videoId: string, text: string) => {
    setInteractions(prev => {
      const newComment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        username: "Current User", // In a real app, get from auth
        text,
        timestamp: new Date()
      };
      
      return {
        ...prev,
        comments: {
          ...prev.comments,
          [videoId]: [...(prev.comments[videoId] || []), newComment]
        }
      };
    });
  };

  return (
    <InteractionsContext.Provider value={{
      ...interactions,
      toggleLike,
      toggleSave,
      addComment,
      isLiked: (id: string) => interactions.likes.has(id),
      isSaved: (id: string) => interactions.saves.has(id),
      getComments: (videoId: string) => interactions.comments[videoId] || []
    }}>
      {children}
    </InteractionsContext.Provider>
  );
}

export function useInteractions() {
  const context = useContext(InteractionsContext);
  if (context === undefined) {
    throw new Error('useInteractions must be used within an InteractionsProvider');
  }
  return context;
} 