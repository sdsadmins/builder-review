'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import StarRating from '@/components/shared/StarRating';
import { Shield, Building2, Clock, Eye } from 'lucide-react';

const tabs = [
  { id: 'pending', label: 'Pending', count: 134 },
  { id: 'on_hold', label: 'On Hold', count: 12 },
  { id: 'approved', label: 'Approved', count: 1204 },
  { id: 'rejected', label: 'Rejected', count: 87 },
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
    status: 'on_hold',
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
    verified: true,
  },
];

const statusBadge: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  on_hold: 'bg-stone-100 text-stone-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const statusLabel: Record<string, string> = {
  pending: 'Pending',
  on_hold: 'On Hold',
  approved: 'Approved',
  rejected: 'Rejected',
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const fadeUp = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } };

export default function ModerationPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const filtered = reviews.filter((r) => r.status === activeTab);

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center gap-3">
          <Shield size={22} className="text-amber-700" />
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Moderation Queue</h1>
            <p className="text-stone-500 text-sm mt-0.5">Review and moderate submitted reviews</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-stone-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all whitespace-nowrap -mb-px ${
                activeTab === tab.id
                  ? 'border-b-2 border-amber-700 text-amber-700'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${activeTab === tab.id ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-500'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Queue Items */}
        <motion.div className="space-y-3" variants={stagger} initial="hidden" animate="visible">
          {filtered.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-400 text-sm">
              No items in this queue.
            </div>
          ) : filtered.map((review) => (
            <motion.div key={review.id} variants={fadeUp}>
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:border-stone-300 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold flex-shrink-0 text-sm">
                    {review.reviewer[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-stone-900 font-semibold text-sm">{review.reviewer}</span>
                          {review.verified && (
                            <span className="text-xs text-green-600 font-medium">Verified</span>
                          )}
                        </div>
                        <p className="text-xs text-stone-400 flex items-center gap-1.5">
                          <Building2 size={11} className="text-stone-400" />
                          <span className="text-amber-700 font-medium">{review.builder}</span>
                          <span>—</span>
                          <span>{review.project}</span>
                          <Clock size={11} className="text-stone-400 ml-1" />
                          <span>{review.date}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge[review.status]}`}>
                          {statusLabel[review.status]}
                        </span>
                        <StarRating value={review.rating} size="sm" showValue />
                      </div>
                    </div>
                    <p className="text-sm text-stone-500 mb-3 line-clamp-2">{review.excerpt}</p>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/moderation/${review.id}`}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold bg-amber-700 text-white hover:bg-amber-800 transition-colors"
                      >
                        <Eye size={12} />
                        Claim &amp; Review
                      </Link>
                      <span className="text-xs text-stone-400">ID: #{review.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
