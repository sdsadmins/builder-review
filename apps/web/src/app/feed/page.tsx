'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageSquare, Share2, Bookmark } from 'lucide-react';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';

const feedTabs = [
  { id: 'all', label: '🌟 All' },
  { id: 'reviews', label: '📝 Reviews' },
  { id: 'tips', label: '💡 Tips' },
  { id: 'questions', label: '❓ Questions' },
];

const posts = [
  {
    id: 1,
    type: 'review',
    user: 'Priya S.',
    city: 'Pune',
    time: '2 hours ago',
    builder: 'Kolte Patil Developers',
    rating: 4.5,
    content: 'Just got possession of my flat at Kolte Patil Life Republic! The construction quality exceeded expectations. Marble flooring, quality fittings, and the amenities are top-notch. The delay was only 3 months which is quite rare in Pune real estate. Highly recommend! 🏠✨',
    likes: 47,
    comments: 12,
    tags: ['#Pune', '#Possession', '#KoltePatil'],
  },
  {
    id: 2,
    type: 'tip',
    user: 'Amit K.',
    city: 'Mumbai',
    time: '5 hours ago',
    builder: null,
    rating: null,
    content: '💡 TIP: Always verify RERA registration before signing any agreement. I made the mistake of not checking and lost ₹5 lakhs to a builder who vanished. Check maharera.mahaonline.gov.in or your state RERA portal. Stay safe, homebuyers! 🙏',
    likes: 234,
    comments: 45,
    tags: ['#RERAAlert', '#HomeBuyerTip', '#Safety'],
  },
  {
    id: 3,
    type: 'question',
    user: 'Neha R.',
    city: 'Bangalore',
    time: '8 hours ago',
    builder: null,
    rating: null,
    content: '❓ Has anyone dealt with Sobha Dream Acres? I am planning to book a unit there. My main concerns are: possession timeline, hidden charges, and after-sales support. Please share your honest experience. Budget is 65L for a 2BHK. 🙏',
    likes: 18,
    comments: 32,
    tags: ['#Sobha', '#Bangalore', '#Help'],
  },
  {
    id: 4,
    type: 'review',
    user: 'Vikram T.',
    city: 'Hyderabad',
    time: '1 day ago',
    builder: 'My Home Constructions',
    rating: 4.0,
    content: 'Sharing my 2-year experience with My Home Avatar: Pros: Good location, decent amenities, timely maintenance. Cons: Hidden charges of ₹80k at registration, parking allotment issues. Overall 4/5 — would recommend with caution. 🏗️',
    likes: 89,
    comments: 23,
    tags: ['#Hyderabad', '#MyHome', '#HonestReview'],
  },
  {
    id: 5,
    type: 'tip',
    user: 'Sunita M.',
    city: 'Chennai',
    time: '2 days ago',
    builder: null,
    rating: null,
    content: '📋 CHECKLIST before taking possession: 1️⃣ Verify all measurements 2️⃣ Check electrical fittings 3️⃣ Test plumbing 4️⃣ Inspect flooring 5️⃣ Get OC (Occupancy Certificate) 6️⃣ Check common areas 7️⃣ Document everything with photos. Save this! 💾',
    likes: 512,
    comments: 67,
    tags: ['#Checklist', '#Possession', '#HomeBuyerGuide'],
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const typeColors: Record<string, string> = {
  review: 'rgba(245,158,11,0.15)',
  tip: 'rgba(34,197,94,0.15)',
  question: 'rgba(139,92,246,0.15)',
};
const typeBorders: Record<string, string> = {
  review: 'rgba(245,158,11,0.3)',
  tip: 'rgba(34,197,94,0.3)',
  question: 'rgba(139,92,246,0.3)',
};
const typeLabels: Record<string, string> = {
  review: '📝 Review',
  tip: '💡 Tip',
  question: '❓ Question',
};

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = posts.filter((p) => activeTab === 'all' || p.type === activeTab.slice(0, -1));

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-black mb-2">
          <span style={{
            background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            🌟 Community Feed
          </span>
        </h1>
        <p className="text-white/50">Real experiences from real homebuyers across India</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {feedTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap"
            style={{
              background: activeTab === tab.id ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
              border: activeTab === tab.id ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.08)',
              color: activeTab === tab.id ? '#F59E0B' : '#F8F8FF80',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      <motion.div
        className="space-y-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((post) => (
          <motion.div key={post.id} variants={fadeUp}>
            <GlassCard className="p-6 hover:border-amber-500/10 transition-all">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-lg">
                    {post.user[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{post.user}</p>
                    <p className="text-white/40 text-xs">📍 {post.city} • {post.time}</p>
                  </div>
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{
                    background: typeColors[post.type],
                    border: `1px solid ${typeBorders[post.type]}`,
                    color: post.type === 'review' ? '#F59E0B' : post.type === 'tip' ? '#22C55E' : '#8B5CF6',
                  }}
                >
                  {typeLabels[post.type]}
                </span>
              </div>

              {/* Builder & Rating */}
              {post.builder && (
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-white/40">About:</span>
                  <span className="text-sm font-semibold text-amber-400">{post.builder}</span>
                  {post.rating && <StarRating value={post.rating} size="sm" showValue />}
                </div>
              )}

              {/* Content */}
              <p className="text-white/70 text-sm leading-relaxed mb-4">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-amber-400/60 hover:text-amber-400 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-2 text-sm transition-all"
                  style={{ color: liked.has(post.id) ? '#F59E0B' : '#F8F8FF50' }}
                >
                  <ThumbsUp size={15} className={liked.has(post.id) ? 'fill-amber-500' : ''} />
                  {post.likes + (liked.has(post.id) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors">
                  <MessageSquare size={15} />
                  {post.comments}
                </button>
                <button className="flex items-center gap-2 text-sm text-white/40 hover:text-amber-400 transition-colors ml-auto">
                  <Bookmark size={15} />
                  Save
                </button>
                <button className="flex items-center gap-2 text-sm text-white/40 hover:text-amber-400 transition-colors">
                  <Share2 size={15} />
                  Share
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Load More */}
      <div className="text-center mt-10">
        <button
          className="px-8 py-3 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:border-amber-500/30 hover:text-amber-400 transition-all"
        >
          Load more posts 👇
        </button>
      </div>
    </div>
  );
}
