'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScratchCardProps {
  amount: number;
  status: 'pending' | 'revealed' | 'claimed';
  onReveal?: () => void;
}

export default function ScratchCard({ amount, status, onReveal }: ScratchCardProps) {
  const [revealed, setRevealed] = useState(status !== 'pending');
  const [bursting, setBursting] = useState(false);

  const handleReveal = () => {
    if (revealed) return;
    setBursting(true);
    setTimeout(() => {
      setRevealed(true);
      setBursting(false);
      onReveal?.();
    }, 600);
  };

  if (status === 'claimed') {
    return (
      <div
        className="rounded-2xl p-6 text-center opacity-50"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="text-3xl mb-2">✅</div>
        <p className="text-sm text-white/40">₹{amount}</p>
        <p className="text-xs text-white/30 mt-1">Claimed</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {bursting && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{ background: '#F59E0B' }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i / 12) * Math.PI * 2) * 60,
                  y: Math.sin((i / 12) * Math.PI * 2) * 60,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="rounded-2xl overflow-hidden cursor-pointer"
        whileHover={!revealed ? { scale: 1.02 } : {}}
        whileTap={!revealed ? { scale: 0.98 } : {}}
        onClick={handleReveal}
        style={{
          background: revealed
            ? 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.08))'
            : 'linear-gradient(135deg, #1E1E2E, #12121A)',
          border: revealed ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.1)',
          boxShadow: revealed ? '0 0 30px rgba(245,158,11,0.15)' : 'none',
        }}
      >
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="scratch"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="p-6 text-center"
            >
              <motion.div
                className="text-4xl mb-3"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎁
              </motion.div>
              <p className="text-amber-400 font-bold text-sm">Scratch to Reveal!</p>
              <p className="text-white/30 text-xs mt-1">Tap to scratch</p>
              <div className="mt-4 flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-amber-500/40"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="p-6 text-center"
            >
              <div className="text-4xl mb-2">💰</div>
              <p className="text-3xl font-black text-amber-400">₹{amount}</p>
              <p className="text-white/50 text-xs mt-1">Reward Unlocked! 🎉</p>
              <motion.button
                className="mt-4 px-5 py-2 rounded-xl text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                  color: '#0A0A0F',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💸 Claim via UPI
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
