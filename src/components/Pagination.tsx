import React from 'react';
import { motion } from 'motion/react';

interface PaginationProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ total, current, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-2.5 z-30 py-2">
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === current;
        return (
          <button
            key={idx}
            onClick={() => onChange(idx)}
            aria-label={`Aller à l'affiche ${idx + 1}`}
            className="group relative p-1 focus:outline-none"
          >
            <motion.div
              animate={{
                width: isActive ? 28 : 10,
                backgroundColor: isActive ? '#005BFF' : 'rgba(0, 91, 255, 0.25)',
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-2.5 rounded-full border border-white/60 shadow-sm backdrop-blur-sm group-hover:bg-[#005BFF]/60"
            />
          </button>
        );
      })}
    </div>
  );
};
