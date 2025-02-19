"use client";

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface SnackbarProps {
  message: string;
  isVisible: boolean;
  onHide: () => void;
}

export default function Snackbar({ message, isVisible, onHide }: SnackbarProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 left-0 right-0 px-4 z-50"
        >
          <div className="bg-black text-white mx-auto max-w-[393px] px-4 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 backdrop-blur-sm">
            <CheckCircle2 size={20} className="text-[#FFE000]" />
            <span className="font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 