'use client';

import { motion } from 'framer-motion';
import StarRating from '@/components/shared/StarRating';
import { Building2, Star, FileText, TrendingUp, MessageSquare } from 'lucide-react';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const stats = [
  { icon: Star, label: 'Avg Rating', value: '4.6', valueClass: 'text-amber-700' },
  { icon: FileText, label: 'Total Reviews', value: '1,234', valueClass: 'text-stone-900' },
  { icon: TrendingUp, label: 'This Month', value: '+28', valueClass: 'text-stone-900' },
  { icon: MessageSquare, label: 'Response Rate', value: '89%', valueClass: 'text-stone-900' },
];

const ratingCategories = [
  { label: 'Construction Quality', pct: 91 },
  { label: 'Delivery', pct: 78 },
  { label: 'Amenities', pct: 85 },
  { label: 'Legal Compliance', pct: 94 },
  { label: 'Customer Service', pct: 82 },
];

const recentReviews = [
  { user: 'Priya S.', rating: 5.0, text: 'Excellent construction quality and on-time delivery!', date: 'Jan 17, 2026', responded: false },
  { user: 'Rahul M.', rating: 4.0, text: 'Good builder but communication needs improvement.', date: 'Jan 15, 2026', responded: true },
  { user: 'Vikram T.', rating: 4.5, text: 'Great amenities and beautiful interiors. Happy homebuyer!', date: 'Jan 12, 2026', responded: false },
];

export default function BuilderDashboardPage() {
  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>

          {/* Header */}
          <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
            <Building2 size={22} className="text-amber-700" />
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Builder Dashboard</h1>
              <p className="text-stone-500 text-sm mt-0.5">Prestige Group — Bangalore</p>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                  <Icon size={18} className="text-amber-700" />
                  <div className={`text-3xl font-black mt-3 mb-1 ${stat.valueClass}`}>{stat.value}</div>
                  <div className="text-stone-500 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Rating Breakdown */}
            <motion.div variants={fadeUp}>
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-stone-900 font-semibold mb-5">Rating Breakdown</h3>
                <div className="space-y-4">
                  {ratingCategories.map((cat) => (
                    <div key={cat.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-stone-700">{cat.label}</span>
                        <span className="text-sm text-stone-500">{cat.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-600 rounded-full"
                          style={{ width: `${cat.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Placeholder for future chart */}
            <motion.div variants={fadeUp}>
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full">
                <h3 className="text-stone-900 font-semibold mb-2">Overall Score</h3>
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-black text-amber-700 mb-2">4.6</div>
                    <div className="text-stone-400 text-sm">out of 5.0</div>
                    <div className="mt-3 flex justify-center">
                      <StarRating value={4.6} size="md" showValue={false} />
                    </div>
                    <div className="mt-3 text-xs text-stone-400">Based on 1,234 verified reviews</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Recent Reviews */}
          <motion.div variants={fadeUp}>
            <h3 className="text-stone-900 font-semibold mb-4">Recent Reviews</h3>
            <div className="space-y-3">
              {recentReviews.map((r, i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                        {r.user[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 text-sm">{r.user}</p>
                        <p className="text-xs text-stone-400">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating value={r.rating} size="sm" showValue />
                      {r.responded && (
                        <span className="text-xs text-green-600 font-medium">Responded</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 mb-3">&ldquo;{r.text}&rdquo;</p>
                  {!r.responded && (
                    <button className="text-xs px-3 py-1.5 rounded-lg font-medium border border-amber-700 text-amber-700 hover:bg-amber-50 transition-colors">
                      Reply
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
