import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PosterData } from '../types';
import { Calendar, MapPin, Clock, Sparkles, Check, Share2, Compass } from 'lucide-react';

interface PosterCardProps {
  poster: PosterData;
  isActive: boolean;
  index: number;
  total: number;
  onOpenLocation: () => void;
  onOpenRsvp: () => void;
}

export const PosterCard: React.FC<PosterCardProps> = ({
  poster,
  isActive,
  onOpenLocation,
  onOpenRsvp,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Mariage ${poster.title}`,
        text: `Invitation au mariage de ${poster.title} - ${poster.date}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Julien & Eleonore//Mariage//FR',
      'BEGIN:VEVENT',
      'SUMMARY:Mariage Julien & Éléonore',
      'DESCRIPTION:Célébration du mariage de Julien & Éléonore au Grand Hôtel du Cap-Ferrat.',
      'LOCATION:Grand Hôtel du Cap-Ferrat, Saint-Jean-Cap-Ferrat, France',
      'DTSTART:20270620T140000Z',
      'DTEND:20270621T020000Z',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Mariage_Julien_Eleonore.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full max-w-[370px] xs:max-w-[400px] sm:max-w-[440px] md:max-w-[480px] h-[580px] xs:h-[620px] sm:h-[660px] mx-auto select-none">
      {/* Outer Floating 3D Container */}
      <motion.div
        animate={{
          y: isActive ? [0, -10, 0] : 0,
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full relative rounded-[40px] overflow-hidden bg-white poster-shadow border border-white/90"
      >
        {/* Layer 1: Background Image with Ken Burns Permanent Subtle Zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={poster.image}
            alt={poster.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 animate-ken-burns filter brightness-[0.96] contrast-[1.03]"
          />
          {/* Subtle Luminous Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 via-55% to-white/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent h-40" />
        </div>

        {/* Layer 2: Glass Light Reflection Glare Sheen */}
        <div className="absolute inset-0 pointer-events-none opacity-40 glass-sheen animate-light-sweep" />

        {/* Layer 3: Poster Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 text-white">
          {/* Header Tagline & Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider text-[#005BFF] bg-white/95 backdrop-blur-md shadow-sm border border-white">
              <Sparkles className="w-3.5 h-3.5 fill-[#005BFF]" />
              {poster.badge}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCalendar}
                title="Ajouter au calendrier"
                className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center transition-transform active:scale-90 backdrop-blur-md shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#005BFF]" />
              </button>
              <button
                onClick={handleShare}
                title="Partager"
                className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center transition-transform active:scale-90 backdrop-blur-md shadow-md"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#005BFF]" />}
              </button>
            </div>
          </div>

          {/* Center Card Title & Quote */}
          <div className="my-auto py-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs uppercase tracking-[0.3em] font-medium text-blue-100/90 mb-1"
            >
              {poster.tagline}
            </motion.p>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight drop-shadow-md tracking-wide">
              {poster.title}
            </h2>

            <p className="font-sans-luxury text-sm text-slate-100/90 mt-2 font-light max-w-sm">
              {poster.subtitle}
            </p>

            {poster.quote && (
              <p className="font-serif-luxury italic text-sm text-blue-100/80 mt-3 pt-3 border-t border-white/20">
                {poster.quote}
              </p>
            )}
          </div>

          {/* Footer Details Box inside Poster */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 text-slate-900 border border-white/90 shadow-lg backdrop-blur-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#005BFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#005BFF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {poster.locationName}
                </p>
                <p className="text-[11px] text-slate-600 truncate">
                  {poster.locationCity}
                </p>
              </div>
            </div>

            {/* Schedule Highlights Grid */}
            <div className="grid grid-cols-1 gap-1.5 pt-2 border-t border-slate-200/60 text-xs">
              {poster.details.map((detail, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#57B9FF]" />
                    {detail.label}
                  </span>
                  <span className="text-slate-900 font-medium">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Micro action prompt inside card */}
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <button
                onClick={onOpenLocation}
                className="text-[11px] font-semibold text-[#005BFF] hover:underline flex items-center gap-1"
              >
                <Compass className="w-3.5 h-3.5" />
                Détails du lieu
              </button>
              <button
                onClick={onOpenRsvp}
                className="text-[11px] font-bold text-white bg-[#005BFF] hover:bg-[#004cd6] px-3 py-1.5 rounded-full transition-all shadow-sm active:scale-95"
              >
                Répondre
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
