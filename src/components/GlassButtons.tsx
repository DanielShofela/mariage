import React from 'react';
import { motion } from 'motion/react';
import { MessageCircleHeart } from 'lucide-react';

interface GlassButtonsProps {
  onOpenLocation?: () => void;
  onOpenRsvp?: () => void;
}

export const GlassButtons: React.FC<GlassButtonsProps> = ({
  onOpenRsvp,
}) => {
  const handleClick = () => {
    if (onOpenRsvp) onOpenRsvp();
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-xs sm:max-w-sm pointer-events-auto mb-[env(safe-area-inset-bottom)]"
    >
      {/* 💬 Confirmer ma présence */}
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#005BFF] via-[#004CD6] to-[#003BBA] hover:from-[#004CD6] hover:to-[#002D96] transition-all hover:scale-[1.03] active:scale-95 shadow-2xl border border-white/50 ring-4 ring-[#005BFF]/30 backdrop-blur-md"
      >
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shadow-inner shrink-0">
          <MessageCircleHeart className="w-4 h-4 fill-white text-white" />
        </span>
        <span className="truncate tracking-wide font-bold text-white drop-shadow-sm">
          Confirmer ma présence
        </span>
      </button>
    </motion.div>
  );
};


