import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const startRomanticAmbiance = async () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;

      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Soft Pentatonic Harp & Crystalline Pad Notes (C Major / A Minor Ambient Wedding Frequencies)
      const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      let step = 0;

      const playNextNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const currentCtx = audioCtxRef.current;
        
        if (currentCtx.state === 'running') {
          const now = currentCtx.currentTime;
          const noteFreq = freqs[step % freqs.length];

          // Primary Sine Chime
          const osc = currentCtx.createOscillator();
          const gain = currentCtx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(noteFreq, now);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.25, now + 0.08);
          gain.gain.linearRampToValueAtTime(0.001, now + 2.8);

          osc.connect(gain);
          gain.connect(currentCtx.destination);

          osc.start(now);
          osc.stop(now + 2.9);

          // Sub Ambient Pad Octave
          const subOsc = currentCtx.createOscillator();
          const subGain = currentCtx.createGain();

          subOsc.type = 'triangle';
          subOsc.frequency.setValueAtTime(noteFreq / 2, now);

          subGain.gain.setValueAtTime(0, now);
          subGain.gain.linearRampToValueAtTime(0.06, now + 0.2);
          subGain.gain.linearRampToValueAtTime(0.001, now + 3.2);

          subOsc.connect(subGain);
          subGain.connect(currentCtx.destination);

          subOsc.start(now);
          subOsc.stop(now + 3.3);

          step++;
        }

        timerRef.current = window.setTimeout(playNextNote, 1500);
      };

      playNextNote();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopAmbiance = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAmbiance();
    } else {
      startRomanticAmbiance();
    }
  };

  useEffect(() => {
    // Auto-start sound by default on site initialization
    startRomanticAmbiance();

    // Listen to any touch or pointer interaction to resume AudioContext if browser suspended autoplay
    const handleGesture = () => {
      if (audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
        }
      } else {
        startRomanticAmbiance();
      }
    };

    window.addEventListener('pointerdown', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('click', handleGesture, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('click', handleGesture);
      stopAmbiance();
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Couper la musique d’ambiance' : 'Activer la musique d’ambiance'}
      title={isPlaying ? 'Couper la musique d’ambiance' : 'Activer la musique d’ambiance'}
      className="fixed top-5 right-5 z-40 w-10 h-10 rounded-full glass-button flex items-center justify-center text-[#005BFF] hover:scale-105 active:scale-95 transition-all shadow-md"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 animate-pulse text-[#005BFF]" />
      ) : (
        <VolumeX className="w-5 h-5 text-slate-400" />
      )}
    </button>
  );
};
