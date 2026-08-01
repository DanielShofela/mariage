import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PosterData } from '../types';
import { PosterCard } from './PosterCard';

interface PosterCarouselProps {
  posters: PosterData[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onSwipeOffset?: (offset: number) => void; // Parallax offset -1 to 1
  onOpenLocation: () => void;
  onOpenRsvp: () => void;
  onOpenPreview?: (index: number) => void;
}

export const PosterCarousel: React.FC<PosterCarouselProps> = ({
  posters,
  currentIndex,
  onIndexChange,
  onSwipeOffset,
  onOpenLocation,
  onOpenRsvp,
  onOpenPreview,
}) => {
  const [direction, setDirection] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    onIndexChange((currentIndex + 1) % posters.length);
  }, [currentIndex, posters.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    onIndexChange(currentIndex === 0 ? posters.length - 1 : currentIndex - 1);
  }, [currentIndex, posters.length, onIndexChange]);

  // Keyboard Navigation (Arrow Left / Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Carousel animated transition variants (0.7s transition)
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 320 : -320,
      opacity: 0,
      scale: 0.88,
      rotateY: dir > 0 ? 15 : -15,
      filter: 'blur(8px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 320 : -320,
      opacity: 0,
      scale: 0.88,
      rotateY: dir < 0 ? 15 : -15,
      filter: 'blur(8px)',
    }),
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center px-2 sm:px-4 py-2 select-none overflow-visible">
      {/* Side Arrow - Left */}
      <button
        onClick={handlePrev}
        aria-label="Affiche précédente"
        className="absolute left-2 sm:left-6 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-lg border border-slate-200/80 transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#005BFF]" />
      </button>

      {/* Swipeable & Tappable Animated Poster Card Frame */}
      <div className="w-full flex items-center justify-center perspective-[1200px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragStart={() => setIsDragging(true)}
            onDrag={(e, info) => {
              if (onSwipeOffset) {
                onSwipeOffset(info.offset.x / 300);
              }
            }}
            onDragEnd={(e, { offset, velocity }) => {
              setIsDragging(false);
              if (onSwipeOffset) onSwipeOffset(0);

              const swipeThreshold = 40;
              if (offset.x < -swipeThreshold || velocity.x < -300) {
                handleNext();
              } else if (offset.x > swipeThreshold || velocity.x > 300) {
                handlePrev();
              }
            }}
            onTap={() => {
              if (!isDragging && onOpenPreview) {
                onOpenPreview(currentIndex);
              }
            }}
            className="w-[82vw] xs:w-full max-w-[300px] xs:max-w-[340px] sm:max-w-[390px] md:max-w-[420px] max-h-[50vh] xs:max-h-[54vh] sm:max-h-[60vh] mx-auto cursor-pointer active:cursor-grabbing flex items-center justify-center"
          >
            <PosterCard
              poster={posters[currentIndex]}
              isActive={true}
              index={currentIndex}
              total={posters.length}
              onOpenLocation={onOpenLocation}
              onOpenRsvp={onOpenRsvp}
              onOpenPreview={() => onOpenPreview && onOpenPreview(currentIndex)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Side Arrow - Right */}
      <button
        onClick={handleNext}
        aria-label="Affiche suivante"
        className="absolute right-2 sm:right-6 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-lg border border-slate-200/80 transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#005BFF]" />
      </button>
    </div>
  );
};
