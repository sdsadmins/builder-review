'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/shared/GlassCard';
import Link from 'next/link';
import StarRating from '@/components/shared/StarRating';
import { Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

const tabs = [
  { id: 'pending', label: '⏳ Pending', count: 234 },
  { id: 'on_hold', label: '⏸️ On Hold', count: 12 },
  { id: 'approved', label: '✅ Approved', count: 1204 },
  { id: 'rejected', label: '❌ Rejected', count: 87 },
];

const reviews = [
  {
    id: '4521',
    reviewer: 'Rahul Mehta',
    builder: 'Prestige Group',
    project: 'Prestige Lakeside Habitat',
    date: 'Jan 18, 2026',
    rating: 4.5,
    excerpt: 'The construction quality exceeded my expectations. Marble flooring and premium fittings throughout...',
    status: 'pending',
    flags: 0,
    verified: true,
  },
  {
    id: '4520',
    reviewer: 'Priya Sharma',
    builder: 'DLF Limited',
    project: 'DLF The Crest',
    date: 'Jan 17, 2026',
    rating: 2.0,
    excerpt: 'Terrible experience. Multiple delays, hidden charges, and no response from customer care...',
    status: 'pending',
    flags: 2,
    verified: true,
  },
  {
    id: '4519',
    reviewer: 'Vikram T.',
    builder: 'Omaxe Ltd',
    project: 'Omaxe City',
    date: 'Jan 16, 2026',
    rating: 3.5,
    excerpt: 'Mixed experience. Good location but delivery was delayed by 18 months. Documentation was...',
    status: 'pending',
    flags: 0,
    verified: false,
  },
  {
    id: '4518',
    reviewer: 'Kavitha Nair',
    builder: 'Sobha Limited',
    project: 'Sobha Dream Gardens',
    date: 'Jan 15, 2026',
    rating: 5.0,
    excerpt: 'Absolutely love my new home! Dream builder, delivered everything on time with excellent quality...',
    status: 'pending',
    flags: 1,
    verified: true,
  },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

export default function ModerationPage() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">⚖️ Moderation Queue</h1>
        <p className="text-white/50">Review and moderate submitted reviews</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
            style={{
              background: activeTab === tab.id ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
              border: activeTab === tab.id ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.08)',
              color: activeTab === tab.id ? '#F59E0B' : '#F8F8FF80',
            }}
          >
            {tab.label}
            <span
              className="px-1.5 py-0.5 rounded text-xs font-bold"
              style={{
                background: activeTab === tab.id ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.1)',
                color: activeTab === tab.id ? '#F59E0B' : '#ffffff50',
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <motion.div className="space-y-3" variants={stagger} initial="hidden" animate="visible">
        {reviews.map((review) => (
          <motion.div key={review.id} variants={fadeUp}>
            <GlassCard className="p-5 hover:border-amber-500/15 transition-all">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold flex-shrink-0">
                  {review.reviewer[0]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white font-semibold text-sm">{review.reviewer}</span>
                        {review.verified && <span className="text-xs text-green-400">✅ Verified</span>}
                        {review.flags > 0 && (
                          <span className="text-xs text-red-400">🚨 {review.flags} flag{review.flags !== 1 ? 's' : ''}</span>
                        )}
                      </div>
                      <p className="text-xs text-white/40">
                        Reviewed: <span className="text-amber-400">{review.builder}</span> — {review.project} • {review.date}
                      </p>
                    </div>
                    <StarRating value={review.rating} size="sm" showValue />
                  </div>
                  <p className="text-sm text-white/60 mb-3 line-clamp-2">{review.excerpt}</p>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/moderation/${review.id}`}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        background: 'rgba(245,158,11,0.15)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        color: '#F59E0B',
                      }}
                    >
                      <Eye size={12} />
                      Claim & Review 👁️
                    </Link>
                    <span className="text-xs text-white/30">ID: #{review.id}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
