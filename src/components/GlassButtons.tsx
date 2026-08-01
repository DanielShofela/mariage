import React from 'react';
import { motion } from 'motion/react';
import { MapPin, MessageCircleHeart } from 'lucide-react';

interface GlassButtonsProps {
  onOpenLocation: () => void;
  onOpenRsvp: () => void;
}

export const GlassButtons: React.FC<GlassButtonsProps> = ({
  onOpenLocation,
  onOpenRsvp,
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 sm:bottom-6 left-0 right-0 z-40 flex items-center justify-center gap-3 px-4 max-w-lg mx-auto pointer-events-auto"
    >
      {/* Button 1: 📍 Voir le lieu */}
      <button
        onClick={onOpenLocation}
        className="flex-1 glass-button group flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#005BFF] transition-all hover:scale-[1.03] active:scale-95 shadow-lg border border-white/90"
      >
        <span className="w-7 h-7 rounded-full bg-[#005BFF]/10 text-[#005BFF] flex items-center justify-center group-hover:bg-[#005BFF] group-hover:text-white transition-colors">
          <MapPin className="w-4 h-4" />
        </span>
        <span className="truncate">Voir le lieu</span>
      </button>

      {/* Button 2: 💬 Confirmer ma présence */}
      <button
        onClick={onOpenRsvp}
        className="flex-1 glass-button group flex items-center justify-center gap-2 py-3.5 px-4 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#005BFF] to-[#57B9FF] hover:from-[#004CD6] hover:to-[#41A5FA] transition-all hover:scale-[1.03] active:scale-95 shadow-xl border border-white/40"
      >
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <MessageCircleHeart className="w-4 h-4 fill-white" />
        </span>
        <span className="truncate">Confirmer ma présence</span>
      </button>
    </motion.div>
  );
};
