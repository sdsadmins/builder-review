'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import ScratchCard from '@/components/rewards/ScratchCard';
import { ArrowDownToLine, Clock, CheckCircle, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';

const scratchCards = [
  { id: 1, amount: 250, status: 'pending' as const },
  { id: 2, amount: 100, status: 'pending' as const },
  { id: 3, amount: 50, status: 'revealed' as const },
  { id: 4, amount: 250, status: 'claimed' as const },
  { id: 5, amount: 100, status: 'claimed' as const },
  { id: 6, amount: 150, status: 'claimed' as const },
];

const history = [
  { date: 'Jan 15, 2026', type: '📝 Review Approved', amount: '+₹250', status: 'credited' },
  { date: 'Dec 28, 2025', type: '📝 Review Approved', amount: '+₹250', status: 'credited' },
  { date: 'Dec 28, 2025', type: '💸 UPI Payout', amount: '-₹500', status: 'paid' },
  { date: 'Dec 01, 2025', type: '🎁 Bonus Reward', amount: '+₹100', status: 'credited' },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function RewardsPage() {
  const [upiId, setUpiId] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const totalBalance = 400;

  const handleWithdraw = async () => {
    if (!upiId) { toast.error('Please enter your UPI ID'); return; }
    setWithdrawing(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success('💸 Withdrawal initiated! ₹400 will be credited within 24 hours.');
    setWithdrawing(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">🎁 Your Rewards</h1>
          <p className="text-white/50">Earn rewards for every verified review you submit</p>
        </motion.div>

        {/* Balance Widget */}
        <motion.div variants={fadeUp} className="mb-8">
          <div
            className="rounded-2xl p-8 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.08) 100%)',
              border: '1px solid rgba(245,158,11,0.25)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)',
              }}
            />
            <div className="relative z-10">
              <p className="text-white/50 text-sm mb-2">💰 Total Balance</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-5xl font-black text-amber-400">₹{totalBalance}</span>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-white/50 mb-6">
                <span className="flex items-center gap-1"><CheckCircle size={14} className="text-green-400" /> ₹150 Claimed</span>
                <span className="flex items-center gap-1"><Clock size={14} className="text-amber-500" /> ₹400 Available</span>
              </div>
              <div className="flex items-center gap-3 max-w-sm mx-auto">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#F8F8FF',
                  }}
                />
                <button
                  onClick={handleWithdraw}
                  disabled={withdrawing}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105 disabled:opacity-60 flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    color: '#0A0A0F',
                  }}
                >
                  {withdrawing ? '⏳' : <ArrowDownToLine size={16} />}
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scratch Cards */}
        <motion.div variants={fadeUp} className="mb-10">
          <h2 className="text-lg font-bold text-white mb-4">🎰 Scratch Cards</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {scratchCards.map((card) => (
              <ScratchCard
                key={card.id}
                amount={card.amount}
                status={card.status}
                onReveal={() => toast.success(`🎉 You won ₹${card.amount}!`)}
              />
            ))}
          </div>
        </motion.div>

        {/* History */}
        <motion.div variants={fadeUp}>
          <h2 className="text-lg font-bold text-white mb-4">📋 Reward History</h2>
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {['📅 Date', '📝 Activity', '💰 Amount', '🔄 Status'].map((h) => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      className="hover:bg-white/3 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-white/50">{row.date}</td>
                      <td className="px-6 py-4 text-sm text-white/80">{row.type}</td>
                      <td className="px-6 py-4 text-sm font-bold" style={{ color: row.amount.startsWith('+') ? '#22C55E' : '#EF4444' }}>
                        {row.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            background: row.status === 'credited' ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
                            color: row.status === 'credited' ? '#22C55E' : '#F59E0B',
                          }}
                        >
                          {row.status === 'credited' ? '✅ Credited' : '💸 Paid Out'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
