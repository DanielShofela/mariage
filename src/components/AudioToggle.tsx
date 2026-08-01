import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const startRomanticAmbiance = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Soft Pentatonic Harp & Crystalline Pad Notes (C Major / A Minor Ambient Wedding Frequencies)
      const freqs = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99];
      let step = 0;

      const playNextNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Soft Sine wave for harp chime
        osc.type = 'sine';
        const noteFreq = freqs[step % freqs.length];
        osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

        // Soft envelope
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 3.3);

        step++;
        // Schedule next soft chime
        timerRef.current = window.setTimeout(playNextNote, 1800);
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
      audioCtxRef.current.close();
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
    return () => {
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
