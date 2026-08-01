import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PosterData } from '../types';
import { PosterCard } from './PosterCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PosterCarouselProps {
  posters: PosterData[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onSwipeOffset?: (offset: number) => void; // Parallax offset -1 to 1
  onOpenLocation: () => void;
  onOpenRsvp: () => void;
}

export const PosterCarousel: React.FC<PosterCarouselProps> = ({
  posters,
  currentIndex,
  onIndexChange,
  onSwipeOffset,
  onOpenLocation,
  onOpenRsvp,
}) => {
  const [direction, setDirection] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleNext = useCallback(() => {
    if (currentIndex < posters.length - 1) {
      setDirection(1);
      onIndexChange(currentIndex + 1);
    } else {
      // Loop or bounce back
      setDirection(1);
      onIndexChange(0);
    }
  }, [currentIndex, posters.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      onIndexChange(currentIndex - 1);
    } else {
      setDirection(-1);
      onIndexChange(posters.length - 1);
    }
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

  // Carousel 700ms variants
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
    <div className="relative w-full h-full flex items-center justify-center px-4 py-8 select-none overflow-visible">
      {/* Desktop Chevron Controls */}
      <button
        onClick={handlePrev}
        aria-label="Affiche précédente"
        className="hidden md:flex absolute left-4 lg:left-12 z-30 w-12 h-12 rounded-full glass-button items-center justify-center text-slate-700 hover:text-[#005BFF] transition-all hover:scale-110 active:scale-95 shadow-md"
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Affiche suivante"
        className="hidden md:flex absolute right-4 lg:right-12 z-30 w-12 h-12 rounded-full glass-button items-center justify-center text-slate-700 hover:text-[#005BFF] transition-all hover:scale-110 active:scale-95 shadow-md"
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Swipeable Animated Poster Card Frame */}
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
              duration: 0.7, // 700 ms exactly as specified
              ease: [0.16, 1, 0.3, 1], // Custom luxury spring curve
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

              const swipeThreshold = 50;
              if (offset.x < -swipeThreshold || velocity.x < -400) {
                handleNext();
              } else if (offset.x > swipeThreshold || velocity.x > 400) {
                handlePrev();
              }
            }}
            className={`cursor-grab active:cursor-grabbing ${isDragging ? 'pointer-events-none' : ''}`}
          >
            <PosterCard
              poster={posters[currentIndex]}
              isActive={true}
              index={currentIndex}
              total={posters.length}
              onOpenLocation={onOpenLocation}
              onOpenRsvp={onOpenRsvp}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
