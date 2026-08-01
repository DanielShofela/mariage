import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PosterData } from '../types';
import { Calendar, MapPin, Clock, Sparkles, Check, Share2, Compass } from 'lucide-react';

interface PosterCardProps {
  poster: PosterData;
  isActive: boolean;
  index: number;
  total: number;
  onOpenLocation: () => void;
  onOpenRsvp: () => void;
}

export const PosterCard: React.FC<PosterCardProps> = ({
  poster,
  isActive,
}) => {
  return (
    <div className="relative w-full max-w-[370px] xs:max-w-[400px] sm:max-w-[440px] md:max-w-[480px] h-[580px] xs:h-[620px] sm:h-[660px] mx-auto select-none">
      {/* Outer Floating 3D Container */}
      <motion.div
        animate={{
          y: isActive ? [0, -10, 0] : 0,
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full relative rounded-[40px] overflow-hidden bg-white poster-shadow border border-white/90"
      >
        {/* Layer 1: Clean High-Fashion Poster Image with Ken Burns Zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={poster.image}
            alt={poster.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 animate-ken-burns filter brightness-[0.98] contrast-[1.02]"
          />
          {/* Subtle Corner Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/20 pointer-events-none" />
        </div>

        {/* Layer 2: Glass Light Reflection Glare Sheen */}
        <div className="absolute inset-0 pointer-events-none opacity-40 glass-sheen animate-light-sweep" />
      </motion.div>
    </div>
  );
};
