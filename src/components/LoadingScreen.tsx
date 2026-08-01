import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1); // 1: White, 2: Halo, 3: Monogram & Details, 4: Complete
  const [readyToEnter, setReadyToEnter] = useState<boolean>(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Step 1: Pure White -> Step 2: Blue Halo
    const timer1 = setTimeout(() => setStep(2), 400);
    // Step 2: Halo -> Step 3: Monogram Reveal & Progress
    const timer2 = setTimeout(() => setStep(3), 1000);
    // Step 3: Progress complete -> Enable user touch prompt (NO auto-dismiss)
    const timer3 = setTimeout(() => setReadyToEnter(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleOpen = () => {
    setStep(4);
    setTimeout(() => {
      onCompleteRef.current();
    }, 100);
  };

  return (
    <AnimatePresence>
      {step < 4 && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleOpen}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden select-none cursor-pointer"
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
                  <div className="w-16 h-16 mb-4 rounded-full glass-panel flex items-center justify-center shadow-lg border border-white/80 text-[#005BFF] font-serif-luxury font-bold text-xl">
                    S&L
                  </div>

                  <span className="text-xs uppercase tracking-[0.35em] text-[#005BFF] font-semibold mb-2">
                    Invitation Exclusive
                  </span>

                  <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-slate-900 tracking-wide mb-3">
                    Stéphane <span className="font-serif-luxury italic text-[#005BFF] font-normal">&</span> Laura
                  </h1>

                  <div className="flex items-center gap-3 my-1">
                    <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#005BFF]/40" />
                    <span className="text-xs tracking-[0.25em] text-slate-500 font-sans-luxury font-semibold">
                      29.08.2026
                    </span>
                    <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#005BFF]/40" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle Progress Bar */}
            <div className="w-36 h-[2px] bg-slate-100 rounded-full mt-6 overflow-hidden relative">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: step === 2 ? '40%' : step === 3 ? '100%' : '0%' }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#57B9FF] to-[#005BFF]"
              />
            </div>

            {/* Touch to Open Prompt (Appears when ready or during step 3) */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-8 flex flex-col items-center gap-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#005BFF] to-[#004CD6] text-white font-semibold text-xs sm:text-sm shadow-xl border border-white/50 flex items-center gap-2.5"
                  >
                    <Sparkles className="w-4 h-4 fill-white text-white" />
                    <span className="tracking-wide">Toucher l'écran pour ouvrir</span>
                  </motion.div>
                  <span className="text-[11px] text-slate-400 tracking-wider">
                    (Cliquez n'importe où pour accéder à l'invitation)
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


