'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const trendData = [
  { month: 'Aug', views: 120, reviews: 8 },
  { month: 'Sep', views: 180, reviews: 12 },
  { month: 'Oct', views: 234, reviews: 18 },
  { month: 'Nov', views: 198, reviews: 15 },
  { month: 'Dec', views: 267, reviews: 22 },
  { month: 'Jan', views: 312, reviews: 28 },
];

const reviews = [
  { user: 'Sunita M.', rating: 5.0, project: 'Home renovation, Chennai', date: 'Jan 16, 2026', text: 'Absolutely stunning interiors! Best decision to hire them.' },
  { user: 'Arjun K.', rating: 4.5, project: '3BHK interior, Bangalore', date: 'Jan 10, 2026', text: 'Very professional team. Delivered within budget.' },
];

export default function VendorDashboardPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">📊 Vendor Dashboard</h1>
          <p className="text-white/50">The Design Studio — Interior Designer 🪴 • Mumbai</p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { emoji: '👁️', value: '312', label: 'Profile Views', color: '#06B6D4' },
            { emoji: '⭐', value: '4.7', label: 'Average Rating', color: '#F59E0B' },
            { emoji: '📝', value: '234', label: 'Total Reviews', color: '#22C55E' },
            { emoji: '💬', value: '89%', label: 'Response Rate', color: '#8B5CF6' },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-5 text-center">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Profile Completion */}
        <motion.div variants={fadeUp} className="mb-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold">📋 Profile Completion</h3>
              <span className="text-amber-400 font-bold">78%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #F59E0B, #FCD34D)' }}
                initial={{ width: 0 }}
                animate={{ width: '78%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-white/40">Add portfolio photos and service areas to reach 100% 📸</p>
          </GlassCard>
        </motion.div>

        {/* Charts */}
        <motion.div variants={fadeUp} className="mb-6">
          <GlassCard className="p-6">
            <h3 className="text-white font-bold mb-4">📈 Profile Views & Reviews</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#12121A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#F8F8FF' }}
                />
                <Line type="monotone" dataKey="views" stroke="#06B6D4" strokeWidth={2} dot={{ fill: '#06B6D4', r: 4 }} name="Views 👁️" />
                <Line type="monotone" dataKey="reviews" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 4 }} name="Reviews 📝" />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div variants={fadeUp}>
          <h3 className="text-white font-bold mb-4">📝 Recent Reviews</h3>
          <div className="space-y-3">
            {reviews.map((r, i) => (
              <GlassCard key={i} className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">
                      {r.user[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{r.user}</p>
                      <p className="text-xs text-white/40">{r.project} • {r.date}</p>
                    </div>
                  </div>
                  <StarRating value={r.rating} size="sm" showValue />
                </div>
                <p className="text-sm text-white/60">&ldquo;{r.text}&rdquo;</p>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
