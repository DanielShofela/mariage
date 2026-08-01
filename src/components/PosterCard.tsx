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
      {/* Outer Floating 3D Container */}
      <motion.div
        animate={{
          y: isActive ? [0, -6, 0] : 0,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-900 border border-white/90 shadow-2xl"
      >
        {/* Layer 1: Clean High-Fashion Poster Image without text overlay */}
        <div className="absolute inset-0 overflow-hidden bg-slate-900">
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
            className="w-full h-full object-cover scale-105 animate-ken-burns filter brightness-[0.98] contrast-[1.03]"
          />
        </div>

        {/* Layer 2: Glass Light Reflection Glare Sheen */}
        <div className="absolute inset-0 pointer-events-none opacity-20 glass-sheen animate-light-sweep" />
      </motion.div>
    </div>
  );
};


