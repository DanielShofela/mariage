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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [swipeOffset, setSwipeOffset] = useState(0); // -1 to 1 for live parallax shift
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  return (
    <div className="relative w-full h-screen h-[100dvh] max-h-[100dvh] bg-white text-slate-800 flex flex-col justify-between overflow-hidden select-none font-sans-luxury touch-pan-x">
      {/* 1. Loading Screen Sequence (Plays only ONCE on initial site open) */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* 2. Layered Living Backgrounds */}
      <AnimatedBackground swipeProgress={swipeOffset} />
      <FloatingParticles count={24} swipeProgress={swipeOffset} />
      <FloatingLeaves swipeProgress={swipeOffset} />
      <LightRays />
      <TouchRipples />

      {/* 3. Top Header Bar */}
      <header className="relative z-30 pt-3 sm:pt-4 px-5 sm:px-8 flex items-center justify-between shrink-0 pointer-events-auto">
        {/* Monogram Branding */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-panel flex items-center justify-center border border-white/90 shadow-sm text-[#005BFF] font-serif-luxury font-bold text-xs sm:text-sm">
            S&L
          </div>
          <div className="flex flex-col">
            <span className="font-serif-luxury text-base sm:text-xl text-slate-900 font-semibold tracking-wide">
              {WEDDING_COUPLE.fullTitle}
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#005BFF] font-bold">
              Mariage • 29.08.2026
            </span>
          </div>
        </div>

        {/* Ambient Audio Toggle Button */}
        <AudioToggle />
      </header>

      {/* 4. Main Poster Carousel Area & Page Tracker */}
      <main className="relative z-20 flex-1 min-h-0 w-full flex flex-col justify-center items-center py-1 overflow-hidden">
        <PosterCarousel
          posters={POSTERS}
          currentIndex={currentPosterIndex}
          onIndexChange={(index) => setCurrentPosterIndex(index)}
          onSwipeOffset={(offset) => setSwipeOffset(offset)}
          onOpenLocation={() => setIsLocationOpen(true)}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />

        {/* Pagination Indicator Dots (Suivi de page - Always visible under card) */}
        <div className="mt-2 sm:mt-3 z-30 shrink-0">
          <Pagination
            total={POSTERS.length}
            current={currentPosterIndex}
            onChange={(idx) => setCurrentPosterIndex(idx)}
          />
        </div>
      </main>

      {/* 5. Bottom Floating Button (Confirmer ma présence) */}
      <footer className="relative z-40 pb-4 sm:pb-6 pt-1 flex items-center justify-center shrink-0 w-full pointer-events-auto">
        <GlassButtons
          onOpenLocation={() => setIsLocationOpen(true)}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />
      </footer>

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
