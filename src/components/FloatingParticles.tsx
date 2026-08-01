import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  size: number;
  startX: number;
  startY: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

interface FloatingParticlesProps {
  count?: number;
  swipeProgress?: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ 
  count = 24,
  swipeProgress = 0 
}) => {
  const particles: Particle[] = useMemo(() => {
    const colors = [
      'rgba(255, 255, 255, 0.95)',
      'rgba(220, 239, 255, 0.85)',
      'rgba(87, 185, 255, 0.65)',
      'rgba(0, 91, 255, 0.35)',
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 2, // 2px to 7px
      startX: Math.random() * 100, // %
      startY: Math.random() * 100, // %
      duration: Math.random() * 12 + 10, // 10s to 22s
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            backgroundColor: p.color,
          }}
          animate={{
            y: [0, -120, -250],
            x: [0, p.id % 2 === 0 ? 30 : -30, p.id % 3 === 0 ? -40 : 40].map((v) => v + swipeProgress * -150),
            opacity: [0, p.opacity, p.opacity, 0],
            scale: [0.8, 1.2, 0.9, 0.5],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
