"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FullscreenVideoWrapperProps {
  children: React.ReactNode;
  isVisible: boolean;
  direction: 'up' | 'down';
}

export default function FullscreenVideoWrapper({
  children,
  isVisible,
  direction
}: FullscreenVideoWrapperProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: direction === 'up' ? '100%' : '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: direction === 'up' ? '-100%' : '100%' }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 bg-black"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 