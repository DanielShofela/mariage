import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PosterData } from '../types';

interface PosterPreviewModalProps {
  posters: PosterData[];
  initialIndex: number | null;
  onClose: () => void;
}

export const PosterPreviewModal: React.FC<PosterPreviewModalProps> = ({
  posters,
  initialIndex,
  onClose,
}) => {
  const [index, setIndex] = useState<number>(initialIndex ?? 0);

  useEffect(() => {
    if (initialIndex !== null) {
      setIndex(initialIndex);
    }
  }, [initialIndex]);

  if (initialIndex === null) return null;

  const currentPoster = posters[index];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % posters.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev === 0 ? posters.length - 1 : prev - 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 select-none"
      >
        {/* Header bar */}
        <div className="w-full max-w-4xl flex items-center justify-between text-white z-20">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wide border border-white/20">
              {index + 1} / {posters.length}
            </span>
            <span className="text-xs sm:text-sm font-medium text-slate-300 hidden sm:inline">
              {currentPoster.title}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer l'aperçu"
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Container */}
        <div
          className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Affiche précédente"
            className="absolute left-2 sm:left-4 z-30 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-[#005BFF] text-white flex items-center justify-center shadow-xl border border-white/30 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Uncropped Full Image */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset }) => {
              if (offset.x < -40) handleNext();
              if (offset.x > 40) handlePrev();
            }}
            className="w-full h-full max-h-[82vh] flex items-center justify-center cursor-grab active:cursor-grabbing p-2"
          >
            <img
              src={currentPoster.image}
              alt={currentPoster.title}
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </motion.div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            aria-label="Affiche suivante"
            className="absolute right-2 sm:right-4 z-30 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-[#005BFF] text-white flex items-center justify-center shadow-xl border border-white/30 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Footer info & Swipe tip */}
        <div className="w-full max-w-4xl flex flex-col items-center gap-1.5 text-center text-white z-20">
          <p className="font-serif-luxury text-base sm:text-lg text-white font-medium drop-shadow-sm">
            {currentPoster.subtitle}
          </p>
          <span className="text-[11px] text-slate-400 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#57B9FF]" />
            Faites glisser pour faire défiler les affiches
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
