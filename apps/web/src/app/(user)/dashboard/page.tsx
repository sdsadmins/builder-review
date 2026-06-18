'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import { ArrowRight, Flame, TrendingUp } from 'lucide-react';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const stats = [
  { emoji: '📝', value: '2', label: 'Reviews Written', color: '#F59E0B' },
  { emoji: '🎁', value: '₹500', label: 'Rewards Earned', color: '#22C55E' },
  { emoji: '⭐', value: '4.8', label: 'Impact Score', color: '#8B5CF6' },
  { emoji: '🔥', value: '3', label: 'Day Streak', color: '#EF4444' },
];

const recentReviews = [
  {
    id: 1,
    builder: 'Prestige Group',
    project: 'Prestige Lakeside Habitat',
    rating: 4.5,
    date: 'Jan 15, 2026',
    status: '✅ Approved',
    reward: '₹250',
  },
  {
    id: 2,
    builder: 'Sobha Limited',
    project: 'Sobha Dream Gardens',
    rating: 4.0,
    date: 'Dec 28, 2025',
    status: '✅ Approved',
    reward: '₹250',
  },
];

const timeline = [
  { emoji: '🎁', text: 'Reward of ₹250 credited to your account', time: '2 hours ago', color: '#22C55E' },
  { emoji: '✅', text: 'Your review for Prestige Group was approved', time: '1 day ago', color: '#F59E0B' },
  { emoji: '📝', text: 'You submitted a review for Sobha Limited', time: '3 days ago', color: '#8B5CF6' },
  { emoji: '🔥', text: '3-day review streak! Keep it up!', time: '3 days ago', color: '#EF4444' },
  { emoji: '🎉', text: 'Welcome to BuilderReview! Account created.', time: '1 week ago', color: '#F59E0B' },
];

export default function UserDashboardPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">
            👋 Welcome back, <span className="text-amber-400">Rahul!</span>
          </h1>
          <p className="text-white/50">Your impact is helping thousands of homebuyers 🏠</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <GlassCard key={stat.label} className="p-5 text-center hover:border-amber-500/20 transition-all">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </GlassCard>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Reviews */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">📝 Recent Reviews</h2>
              <Link href="/reviews" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentReviews.map((review) => (
                <GlassCard key={review.id} className="p-5 hover:border-amber-500/15 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{review.builder}</h3>
                      <p className="text-xs text-white/40">{review.project}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-400 mb-1">{review.status}</div>
                      <div className="text-xs font-bold text-amber-400">{review.reward} earned</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <StarRating value={review.rating} size="sm" showValue />
                    <span className="text-xs text-white/40">{review.date}</span>
                  </div>
                </GlassCard>
              ))}

              {/* Write new review CTA */}
              <Link href="/review/new">
                <GlassCard className="p-5 border-dashed border-amber-500/20 hover:border-amber-500/40 transition-all cursor-pointer flex items-center justify-center gap-3">
                  <span className="text-2xl">✍️</span>
                  <div>
                    <p className="text-sm font-semibold text-amber-400">Write a New Review</p>
                    <p className="text-xs text-white/40">Earn up to ₹500 per review</p>
                  </div>
                </GlassCard>
              </Link>
            </div>
          </motion.div>

          {/* Rewards & Activity */}
          <motion.div variants={fadeUp} className="space-y-4">
            {/* Pending Reward */}
            <GlassCard className="p-5">
              <h3 className="text-sm font-bold text-white mb-4">🎁 Pending Rewards</h3>
              <div
                className="rounded-xl p-5 text-center cursor-pointer hover:scale-105 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.1))',
                  border: '1px solid rgba(245,158,11,0.3)',
                }}
              >
                <div className="text-4xl mb-2">🎰</div>
                <p className="text-amber-400 font-bold text-sm">Scratch to Reveal!</p>
                <p className="text-white/40 text-xs mt-1">Win up to ₹500</p>
              </div>
            </GlassCard>

            {/* Streak */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <Flame size={20} className="text-red-400" />
                <h3 className="text-sm font-bold text-white">🔥 Review Streak</h3>
              </div>
              <div className="text-4xl font-black text-red-400 mb-1">3</div>
              <p className="text-xs text-white/50">days in a row! 🎉</p>
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-2 rounded-full"
                    style={{ background: i < 3 ? '#EF4444' : 'rgba(255,255,255,0.1)' }}
                  />
                ))}
              </div>
              <p className="text-xs text-white/30 mt-1">Week progress</p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Activity Timeline */}
        <motion.div variants={fadeUp}>
          <h2 className="text-lg font-bold text-white mb-4">⏱️ Activity Timeline</h2>
          <GlassCard className="p-6">
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                  >
                    {item.emoji}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm text-white/70">{item.text}</p>
                    <p className="text-xs text-white/30 mt-1">{item.time}</p>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="absolute w-px h-full bg-white/5" />
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
