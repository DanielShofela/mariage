import React from 'react';
import { motion } from 'motion/react';

interface PaginationProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ total, current, onChange }) => {
  return (
    <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-md">
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = idx === current;
        return (
          <button
            key={idx}
            onClick={() => onChange(idx)}
            aria-label={`Aller à l'image ${idx + 1}`}
            className="group relative focus:outline-none p-1"
          >
            <motion.div
              animate={{
                width: isActive ? 30 : 10,
                backgroundColor: isActive ? '#005BFF' : '#CBD5E1',
              }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-2.5 rounded-full shadow-inner group-hover:bg-[#005BFF]/70"
            />
          </button>
        );
      })}
    </div>
  );
};
