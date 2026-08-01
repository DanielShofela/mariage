import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PosterData } from '../types';
import { PosterCard } from './PosterCard';

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

  // Automatic 5-second slideshow rotation
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext, isDragging]);

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
    <div className="relative w-full h-full flex items-center justify-center px-4 py-4 select-none overflow-visible">
      {/* Swipeable & Tappable Animated Poster Card Frame (No navigation buttons) */}
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
              if (!isDragging) {
                handleNext();
              }
            }}
            className="cursor-pointer active:cursor-grabbing"
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
