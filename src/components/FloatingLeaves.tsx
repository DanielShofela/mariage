import React from 'react';
import { motion } from 'motion/react';

interface FloatingLeavesProps {
  swipeProgress?: number;
}

export const FloatingLeaves: React.FC<FloatingLeavesProps> = ({ swipeProgress = 0 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {/* Top Left Pearlescent Palm Frond */}
      <motion.div
        className="absolute -top-12 -left-16 w-64 md:w-96 opacity-30 mix-blend-multiply origin-top-left"
        animate={{
          rotate: [0, 4, -2, 0],
          y: [0, 10, -5, 0],
          x: [0, 5, -8, 0].map((v) => v + swipeProgress * -40),
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="leafGradTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#57B9FF" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#DCEFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#005BFF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M 20,20 C 60,30 140,80 180,180 C 140,140 80,110 20,20 Z"
            fill="url(#leafGradTopLeft)"
          />
          {/* Palm Frond Ribs */}
          <path d="M 20,20 Q 90,75 180,180" stroke="#005BFF" strokeWidth="0.75" strokeOpacity="0.25" />
          <path d="M 50,45 Q 90,40 130,50" stroke="#57B9FF" strokeWidth="0.5" strokeOpacity="0.3" />
          <path d="M 75,65 Q 120,65 155,80" stroke="#57B9FF" strokeWidth="0.5" strokeOpacity="0.3" />
          <path d="M 100,90 Q 140,100 170,125" stroke="#57B9FF" strokeWidth="0.5" strokeOpacity="0.3" />
        </svg>
      </motion.div>

      {/* Top Right Delicate White Botanic Leaf */}
      <motion.div
        className="absolute -top-10 -right-12 w-56 md:w-80 opacity-25 origin-top-right"
        animate={{
          rotate: [0, -5, 3, 0],
          y: [0, 12, -8, 0],
          x: [0, -8, 6, 0].map((v) => v + swipeProgress * -50),
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="leafGradTopRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#005BFF" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#57B9FF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M 180,20 C 130,50 60,110 20,180 C 60,140 120,90 180,20 Z"
            fill="url(#leafGradTopRight)"
          />
        </svg>
      </motion.div>

      {/* Bottom Right Floating Palm Leaf */}
      <motion.div
        className="absolute -bottom-16 -right-16 w-64 md:w-96 opacity-25 origin-bottom-right"
        animate={{
          rotate: [0, 6, -4, 0],
          y: [0, -15, 10, 0],
          x: [0, -10, 8, 0].map((v) => v + swipeProgress * -60),
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="leafGradBottomRight" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#005BFF" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#57B9FF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#DCEFFF" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M 180,180 C 140,140 70,80 20,20 C 60,60 110,120 180,180 Z"
            fill="url(#leafGradBottomRight)"
          />
        </svg>
      </motion.div>

      {/* Floating White Petals */}
      <motion.div
        className="absolute top-1/4 left-[8%] w-8 h-12 opacity-40"
        animate={{
          y: [0, 80, 160],
          x: [0, 25, -15].map((v) => v + swipeProgress * -80),
          rotate: [0, 180, 360],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <svg viewBox="0 0 30 50" fill="none" className="w-full h-full drop-shadow-sm">
          <path
            d="M 15 0 C 30 15 30 35 15 50 C 0 35 0 15 15 0 Z"
            fill="rgba(255, 255, 255, 0.85)"
            stroke="rgba(87, 185, 255, 0.4)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-[10%] w-6 h-10 opacity-35"
        animate={{
          y: [0, 100, 200],
          x: [0, -30, 20].map((v) => v + swipeProgress * -90),
          rotate: [0, -180, -360],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      >
        <svg viewBox="0 0 30 50" fill="none" className="w-full h-full drop-shadow-sm">
          <path
            d="M 15 0 C 30 15 30 35 15 50 C 0 35 0 15 15 0 Z"
            fill="rgba(220, 239, 255, 0.9)"
            stroke="rgba(0, 91, 255, 0.3)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>
    </div>
  );
};
