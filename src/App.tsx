import React, { useState } from 'react';
import { POSTERS, WEDDING_COUPLE } from './data/weddingData';
import { AnimatedBackground } from './components/AnimatedBackground';
import { FloatingParticles } from './components/FloatingParticles';
import { FloatingLeaves } from './components/FloatingLeaves';
import { LightRays } from './components/LightRays';
import { TouchRipples } from './components/TouchRipples';
import { LoadingScreen } from './components/LoadingScreen';
import { PosterCarousel } from './components/PosterCarousel';
import { Pagination } from './components/Pagination';
import { GlassButtons } from './components/GlassButtons';
import { LocationModal } from './components/LocationModal';
import { RsvpModal } from './components/RsvpModal';
import { AudioToggle } from './components/AudioToggle';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0); // -1 to 1 for live parallax shift
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  return (
    <div className="relative w-full h-full min-h-screen bg-white text-slate-800 flex flex-col justify-between overflow-hidden select-none font-sans-luxury touch-pan-x">
      {/* 1. Loading Screen Sequence */}
      <LoadingScreen onComplete={() => setLoading(false)} />

      {/* 2. Layered Living Backgrounds */}
      <AnimatedBackground swipeProgress={swipeOffset} />
      <FloatingParticles count={24} swipeProgress={swipeOffset} />
      <FloatingLeaves swipeProgress={swipeOffset} />
      <LightRays />
      <TouchRipples />

      {/* 3. Top Header Bar */}
      <header className="relative z-30 pt-4 px-6 sm:px-10 flex items-center justify-between pointer-events-auto">
        {/* Monogram Branding */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-panel flex items-center justify-center border border-white/90 shadow-sm text-[#005BFF]">
            <Sparkles className="w-4 h-4 fill-[#005BFF]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-lg sm:text-xl text-slate-900 font-semibold tracking-wide">
              {WEDDING_COUPLE.fullTitle}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#005BFF] font-bold">
              Mariage Haut de Gamme
            </span>
          </div>
        </div>

        {/* Ambient Audio Toggle Button */}
        <AudioToggle />
      </header>

      {/* 4. Main Poster Carousel Area */}
      <main className="relative z-20 my-auto w-full flex-1 flex flex-col justify-center items-center py-2">
        <PosterCarousel
          posters={POSTERS}
          currentIndex={currentPosterIndex}
          onIndexChange={(index) => setCurrentPosterIndex(index)}
          onSwipeOffset={(offset) => setSwipeOffset(offset)}
          onOpenLocation={() => setIsLocationOpen(true)}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />

        {/* Pagination Indicator Dots */}
        <div className="mt-1 sm:mt-3">
          <Pagination
            total={POSTERS.length}
            current={currentPosterIndex}
            onChange={(idx) => setCurrentPosterIndex(idx)}
          />
        </div>
      </main>

      {/* 5. Bottom Floating Glass Buttons */}
      <GlassButtons
        onOpenLocation={() => setIsLocationOpen(true)}
        onOpenRsvp={() => setIsRsvpOpen(true)}
      />

      {/* 6. Modals */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        onOpenRsvp={() => setIsRsvpOpen(true)}
      />

      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
      />
    </div>
  );
}
