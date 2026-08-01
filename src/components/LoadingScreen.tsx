import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1); // 1: White, 2: Halo, 3: Monogram & Details, 4: Complete

  useEffect(() => {
    // Step 1: Pure White -> Step 2: Blue Halo
    const timer1 = setTimeout(() => setStep(2), 500);
    // Step 2: Halo -> Step 3: Monogram Reveal
    const timer2 = setTimeout(() => setStep(3), 1300);
    // Step 3: Complete -> Triggers parent main view opening
    const timer3 = setTimeout(() => {
      setStep(4);
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {step < 4 && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden select-none"
        >
          {/* Step 2: Blue Halo Apparition */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ scale: 0.2, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.8 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[450px] h-[450px] rounded-full blur-[90px]"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 91, 255, 0.25) 0%, rgba(87, 185, 255, 0.15) 50%, rgba(255, 255, 255, 0) 75%)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Step 3: Luxury Monogram & Title Reveal */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 mb-4 rounded-full glass-panel flex items-center justify-center shadow-lg border border-white/80">
                    <Sparkles className="w-7 h-7 text-[#005BFF]" />
                  </div>

                  <span className="text-xs uppercase tracking-[0.35em] text-[#005BFF] font-semibold mb-2">
                    Invitation Exclusive
                  </span>

                  <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-slate-900 tracking-wide mb-3">
                    Stéphane <span className="font-serif-luxury italic text-[#005BFF] font-normal">&</span> Laura
                  </h1>

                  <div className="flex items-center gap-3 my-1">
                    <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#005BFF]/40" />
                    <span className="text-xs tracking-[0.25em] text-slate-500 font-sans-luxury">
                      20.06.2027
                    </span>
                    <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#005BFF]/40" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle Progress Bar */}
            <div className="w-36 h-[2px] bg-slate-100 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: step === 2 ? '40%' : step === 3 ? '100%' : '0%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#57B9FF] to-[#005BFF]"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
