'use client';

import { motion } from 'framer-motion';
import StarRating from '@/components/shared/StarRating';
import { Store, Eye, Star, MessageSquare, Activity } from 'lucide-react';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const stats = [
  { icon: Eye, label: 'Profile Views', value: '2,847', valueClass: 'text-stone-900' },
  { icon: Star, label: 'Rating', value: '4.3', valueClass: 'text-amber-700' },
  { icon: MessageSquare, label: 'Reviews', value: '127', valueClass: 'text-stone-900' },
  { icon: Activity, label: 'Response Rate', value: '94%', valueClass: 'text-stone-900' },
];

const reviews = [
  { user: 'Sunita M.', rating: 5.0, project: 'Home renovation, Chennai', date: 'Jan 16, 2026', text: 'Absolutely stunning interiors! Best decision to hire them.' },
  { user: 'Arjun K.', rating: 4.5, project: '3BHK interior, Bangalore', date: 'Jan 10, 2026', text: 'Very professional team. Delivered within budget.' },
];

export default function VendorDashboardPage() {
  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={stagger}>

          {/* Header */}
          <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
            <Store size={22} className="text-amber-700" />
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Vendor Dashboard</h1>
              <p className="text-stone-500 text-sm mt-0.5">The Design Studio — Interior Designer, Mumbai</p>
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

          {/* Recent Reviews */}
          <motion.div variants={fadeUp}>
            <h3 className="text-stone-900 font-semibold mb-4">Recent Reviews</h3>
            <div className="space-y-3">
              {reviews.map((r, i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                        {r.user[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 text-sm">{r.user}</p>
                        <p className="text-xs text-stone-400">{r.project} — {r.date}</p>
                      </div>
                    </div>
                    <StarRating value={r.rating} size="sm" showValue />
                  </div>
                  <p className="text-sm text-stone-600">&ldquo;{r.text}&rdquo;</p>
                </div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
