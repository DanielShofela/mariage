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
      className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-50 flex items-center justify-center px-4 max-w-xs sm:max-w-sm mx-auto pointer-events-auto"
    >
      {/* 💬 Confirmer ma présence */}
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#005BFF] via-[#004CD6] to-[#003BBA] hover:from-[#004CD6] hover:to-[#002D96] transition-all hover:scale-[1.03] active:scale-95 shadow-xl border border-white/40 ring-4 ring-[#005BFF]/20"
      >
        <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
          <MessageCircleHeart className="w-4 h-4 fill-white text-white" />
        </span>
        <span className="truncate tracking-wide font-bold text-white drop-shadow-sm">
          Confirmer ma présence
        </span>
      </button>
    </motion.div>
  );
};


