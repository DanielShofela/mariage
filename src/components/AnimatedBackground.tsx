import React from 'react';
import { motion } from 'motion/react';

interface AnimatedBackgroundProps {
  swipeProgress?: number; // -1 to 1 parallax shift offset
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ swipeProgress = 0 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-white">
      {/* Base Satin White Canvas Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white via-[#FAFAFD] via-90% to-[#F0F5FF]"
      />

      {/* Layer 2: Subtle Ambient Radial Light Blue Gradients */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0].map((v) => v + swipeProgress * -100),
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[20%] -left-[15%] w-[70vw] h-[70vw] rounded-full opacity-40 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 91, 255, 0.18) 0%, rgba(87, 185, 255, 0.12) 50%, rgba(220, 239, 255, 0) 75%)',
        }}
      />

      <motion.div
        animate={{
          x: [0, -60, 50, 0].map((v) => v + swipeProgress * -120),
          y: [0, 60, -40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[35%] -right-[20%] w-[75vw] h-[75vw] rounded-full opacity-35 blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(87, 185, 255, 0.22) 0%, rgba(0, 91, 255, 0.1) 45%, rgba(255, 255, 255, 0) 75%)',
        }}
      />

      <motion.div
        animate={{
          x: [0, 30, -40, 0].map((v) => v + swipeProgress * -80),
          y: [0, -30, 50, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[25%] left-[10%] w-[80vw] h-[80vw] rounded-full opacity-30 blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(220, 239, 255, 0.6) 0%, rgba(87, 185, 255, 0.15) 50%, rgba(255, 255, 255, 0) 80%)',
        }}
      />

      {/* Layer 3: Central Soft Luminous Halo */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-40 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(87, 185, 255, 0.15) 40%, rgba(0, 91, 255, 0.05) 80%)',
        }}
      />

      {/* Subtle organic light grid pattern texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(#005BFF 0.75px, transparent 0.75px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};
