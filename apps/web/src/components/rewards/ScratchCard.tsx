'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, CheckCircle } from 'lucide-react';

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
      <div className="bg-white border border-stone-200 rounded-2xl p-6 text-center opacity-60">
        <CheckCircle size={28} className="text-green-600 mx-auto mb-2" />
        <p className="text-sm text-stone-500">₹{amount}</p>
        <p className="text-xs text-stone-400 mt-1">Claimed</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Burst particles */}
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
                className="absolute w-2 h-2 rounded-full bg-amber-400"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i / 12) * Math.PI * 2) * 55,
                  y: Math.sin((i / 12) * Math.PI * 2) * 55,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`rounded-2xl overflow-hidden cursor-pointer border-2 ${
          revealed
            ? 'bg-amber-50 border-amber-300'
            : 'bg-white border-amber-200'
        }`}
        whileHover={!revealed ? { scale: 1.02 } : {}}
        whileTap={!revealed ? { scale: 0.98 } : {}}
        onClick={handleReveal}
      >
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="scratch"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-8 text-center"
            >
              <Gift size={40} className="text-amber-700 mx-auto mt-4" />
              <p className="text-stone-800 font-semibold mt-3">Scratch to Reveal</p>
              <p className="text-stone-400 text-sm mt-1">Earned for your verified review</p>
              <button
                onClick={handleReveal}
                className="mt-5 px-6 py-2.5 rounded-xl text-sm font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors"
              >
                Reveal Reward
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="p-8 text-center"
            >
              <CheckCircle size={32} className="text-green-600 mx-auto" />
              <p className="text-amber-700 text-4xl font-black mt-3">₹{amount}</p>
              <p className="text-stone-700 mt-2 font-medium">Reward Earned!</p>
              <button
                className="mt-5 px-6 py-2.5 rounded-xl text-sm font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors"
              >
                Claim via UPI
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
