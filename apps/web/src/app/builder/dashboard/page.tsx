'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const radarData = [
  { subject: 'Construction', A: 4.7 },
  { subject: 'Communication', A: 4.2 },
  { subject: 'Financial', A: 4.5 },
  { subject: 'After Sales', A: 4.3 },
  { subject: 'Amenities', A: 4.6 },
];

const trendData = [
  { month: 'Aug', reviews: 45, rating: 4.2 },
  { month: 'Sep', reviews: 67, rating: 4.3 },
  { month: 'Oct', reviews: 89, rating: 4.4 },
  { month: 'Nov', reviews: 78, rating: 4.5 },
  { month: 'Dec', reviews: 102, rating: 4.5 },
  { month: 'Jan', reviews: 134, rating: 4.6 },
];

const recentReviews = [
  { user: 'Priya S.', rating: 5.0, text: 'Excellent construction quality and on-time delivery!', date: 'Jan 17, 2026', responded: false },
  { user: 'Rahul M.', rating: 4.0, text: 'Good builder but communication needs improvement.', date: 'Jan 15, 2026', responded: true },
  { user: 'Vikram T.', rating: 4.5, text: 'Great amenities and beautiful interiors. Happy homebuyer!', date: 'Jan 12, 2026', responded: false },
];

export default function BuilderDashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">
            📊 Builder Dashboard
          </h1>
          <p className="text-white/50">Prestige Group — Bangalore 🏙️</p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { emoji: '⭐', value: '4.6', label: 'Average Rating', color: '#F59E0B' },
            { emoji: '📝', value: '1,234', label: 'Total Reviews', color: '#22C55E' },
            { emoji: '📊', value: '134', label: 'This Month', color: '#8B5CF6' },
            { emoji: '🔔', value: '23', label: 'Pending Responses', color: '#EF4444' },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-5 text-center">
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </GlassCard>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Radar Chart */}
          <motion.div variants={fadeUp}>
            <GlassCard className="p-6">
              <h3 className="text-white font-bold mb-4">🎯 Rating Breakdown</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                  <Radar name="Rating" dataKey="A" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Line Chart */}
          <motion.div variants={fadeUp}>
            <GlassCard className="p-6">
              <h3 className="text-white font-bold mb-4">📈 Review Trend</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: '#12121A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#F8F8FF' }}
                  />
                  <Line type="monotone" dataKey="reviews" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>
        </div>

        {/* Recent Reviews */}
        <motion.div variants={fadeUp}>
          <h3 className="text-white font-bold mb-4">📝 Recent Reviews</h3>
          <div className="space-y-3">
            {recentReviews.map((r, i) => (
              <GlassCard key={i} className="p-5 hover:border-amber-500/15 transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
                      {r.user[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{r.user}</p>
                      <p className="text-xs text-white/40">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating value={r.rating} size="sm" showValue />
                    {r.responded && <span className="text-xs text-green-400">✅ Responded</span>}
                  </div>
                </div>
                <p className="text-sm text-white/60 mb-3">&ldquo;{r.text}&rdquo;</p>
                {!r.responded && (
                  <button
                    className="text-xs px-3 py-1.5 rounded-lg font-medium transition-all"
                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#F59E0B' }}
                  >
                    💬 Respond to Review
                  </button>
                )}
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
