import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const userMutedRef = useRef<boolean>(false);

  // Initialize or get the master AudioContext & GainNode
  const getAudioContext = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(userMutedRef.current ? 0 : 0.8, ctx.currentTime);
      masterGain.connect(ctx.destination);
      
      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;
    }
    return { ctx: audioCtxRef.current, masterGain: masterGainRef.current };
  };

  const startSoundLoop = () => {
    // Clear any existing timer to prevent concurrent loops
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    let step = 0;

    const playNextNote = () => {
      if (userMutedRef.current) return;
      
      const { ctx, masterGain } = getAudioContext();
      if (!ctx || !masterGain || ctx.state === 'closed') return;

      if (ctx.state === 'running') {
        const now = ctx.currentTime;
        const noteFreq = freqs[step % freqs.length];

        try {
          // Primary Chime
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(noteFreq, now);

          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(now);
          osc.stop(now + 2.6);

          // Sub Octave Warmth
          const subOsc = ctx.createOscillator();
          const subGain = ctx.createGain();

          subOsc.type = 'triangle';
          subOsc.frequency.setValueAtTime(noteFreq / 2, now);

          subGain.gain.setValueAtTime(0, now);
          subGain.gain.linearRampToValueAtTime(0.08, now + 0.2);
          subGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

          subOsc.connect(subGain);
          subGain.connect(masterGain);

          subOsc.start(now);
          subOsc.stop(now + 3.1);

          step++;
        } catch {
          // Ignore audio node creation errors
        }
      }

      timerRef.current = window.setTimeout(playNextNote, 1600);
    };

    playNextNote();
  };

  const enableAudio = async () => {
    if (userMutedRef.current) return;
    const { ctx, masterGain } = getAudioContext();
    if (!ctx || !masterGain) return;

    if (masterGain) {
      masterGain.gain.setValueAtTime(0.8, ctx.currentTime);
    }

    if (ctx.state === 'suspended') {
      try {
        await ctx.resume();
      } catch {
        // Autoplay policy might suspend until user gesture
      }
    }

    if (ctx.state === 'running') {
      setIsPlaying(true);
    }

    startSoundLoop();
  };

  const disableAudio = () => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    }
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isPlaying) {
      userMutedRef.current = true;
      disableAudio();
    } else {
      userMutedRef.current = false;
      enableAudio();
    }
  };

  useEffect(() => {
    // Attempt auto-start sound on mount
    enableAudio();

    // Global gesture listener to unlock WebAudio on initial user click/touch anywhere
    const handleGlobalUnlock = () => {
      if (userMutedRef.current) return;
      const { ctx } = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().then(() => {
          setIsPlaying(true);
          startSoundLoop();
        }).catch(() => {});
      } else if (ctx && ctx.state === 'running') {
        setIsPlaying(true);
      }
    };

    window.addEventListener('pointerdown', handleGlobalUnlock, { passive: true });
    window.addEventListener('touchstart', handleGlobalUnlock, { passive: true });
    window.addEventListener('click', handleGlobalUnlock, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleGlobalUnlock);
      window.removeEventListener('touchstart', handleGlobalUnlock);
      window.removeEventListener('click', handleGlobalUnlock);
      disableAudio();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Couper la musique d’ambiance' : 'Activer la musique d’ambiance'}
      title={isPlaying ? 'Couper la musique d’ambiance' : 'Activer la musique d’ambiance'}
      className="fixed top-5 right-5 z-40 w-11 h-11 rounded-full glass-button flex items-center justify-center text-[#005BFF] hover:scale-105 active:scale-95 transition-all shadow-lg border border-white/80 cursor-pointer"
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 animate-pulse text-[#005BFF]" />
      ) : (
        <VolumeX className="w-5 h-5 text-slate-400" />
      )}
    </button>
  );
};
