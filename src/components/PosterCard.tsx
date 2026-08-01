import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PosterData } from '../types';

interface PosterCardProps {
  poster: PosterData;
  isActive: boolean;
  index: number;
  total: number;
  onOpenLocation?: () => void;
  onOpenRsvp?: () => void;
  onOpenPreview?: () => void;
}

export const PosterCard: React.FC<PosterCardProps> = ({
  poster,
  isActive,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(poster.image);

  useEffect(() => {
    setImgSrc(poster.image);
  }, [poster.image]);

  return (
    <div className="relative w-full aspect-[3/4] select-none">
      {/* Outer Floating Container */}
      <motion.div
        animate={{
          y: isActive ? [0, -6, 0] : 0,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full relative rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl flex items-center justify-center bg-transparent"
      >
        {/* Layer 1: Clean Uncropped Poster Image */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[24px] sm:rounded-[28px]">
          <img
            src={imgSrc}
            alt={poster.title}
            referrerPolicy="no-referrer"
            onError={() => {
              setImgSrc(
                poster.id === 'invitation-principale'
                  ? 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
                  : 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80'
              );
            }}
            className="w-full h-full object-contain filter brightness-[0.99] contrast-[1.02] drop-shadow-xl rounded-[24px] sm:rounded-[28px]"
          />
        </div>

        {/* Layer 2: Glass Light Reflection Glare Sheen */}
        <div className="absolute inset-0 pointer-events-none opacity-15 glass-sheen animate-light-sweep rounded-[24px] sm:rounded-[28px]" />
      </motion.div>
    </div>
  );
};


