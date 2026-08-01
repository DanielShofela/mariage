import React from 'react';
import { motion } from 'motion/react';

export const LightRays: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-12 overflow-hidden">
      {/* Dynamic diagonal light sheen beam */}
      <motion.div
        className="absolute top-0 left-0 w-[200%] h-[200%] opacity-20"
        style={{
          background: 'linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.9) 48%, rgba(220, 239, 255, 0.7) 50%, rgba(255, 255, 255, 0.9) 52%, transparent 60%)',
        }}
        animate={{
          x: ['-50%', '50%'],
          y: ['-50%', '50%'],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 3,
        }}
      />

      {/* Second soft subtle counter-beam */}
      <motion.div
        className="absolute top-0 right-0 w-[180%] h-[180%] opacity-15"
        style={{
          background: 'linear-gradient(205deg, transparent 45%, rgba(87, 185, 255, 0.4) 50%, transparent 55%)',
        }}
        animate={{
          x: ['30%', '-40%'],
          y: ['-30%', '40%'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />
    </div>
  );
};
