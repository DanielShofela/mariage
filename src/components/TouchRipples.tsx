import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TouchPoint } from '../types';

interface TouchRipplesProps {
  onTap?: () => void;
}

export const TouchRipples: React.FC<TouchRipplesProps> = ({ onTap }) => {
  const [ripples, setRipples] = useState<TouchPoint[]>([]);

  const handleInteraction = useCallback((e: MouseEvent | TouchEvent) => {
    let clientX = 0;
    let clientY = 0;

    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    if (!clientX && !clientY) return;

    const newRipple: TouchPoint = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
    };

    setRipples((prev) => [...prev.slice(-6), newRipple]);
    if (onTap) onTap();
  }, [onTap]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => handleInteraction(e);
    const handleTouchStart = (e: TouchEvent) => handleInteraction(e);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleInteraction]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <React.Fragment key={ripple.id}>
            {/* Primary Luminous Light Aura Wave */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                left: ripple.x - 60,
                top: ripple.y - 60,
              }}
              className="absolute w-30 h-30 rounded-full border border-white/90 bg-gradient-to-r from-[#57B9FF]/20 via-[#005BFF]/15 to-white/40 shadow-[0_0_30px_rgba(87,185,255,0.4)] backdrop-blur-[2px]"
            />
            {/* Secondary Concentric Blue Ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
              style={{
                left: ripple.x - 40,
                top: ripple.y - 40,
              }}
              className="absolute w-20 h-20 rounded-full border border-[#005BFF]/30 bg-transparent"
            />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};
