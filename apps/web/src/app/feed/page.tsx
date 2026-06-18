'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp, MessageCircle, Share2, Bookmark, Rss, MapPin } from 'lucide-react'
import StarRating from '@/components/shared/StarRating'
import Navbar from '@/components/layout/Navbar'

const feedTabs = [
  { id: 'all', label: 'All' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'tips', label: 'Tips' },
  { id: 'questions', label: 'Questions' },
]

const posts = [
  {
    id: 1,
    type: 'review',
    user: 'Priya S.',
    city: 'Pune',
    time: '2 hours ago',
    builder: 'Kolte Patil Developers',
    rating: 4.5,
    content: 'Just got possession of my flat at Kolte Patil Life Republic! The construction quality exceeded expectations. Marble flooring, quality fittings, and the amenities are top-notch. The delay was only 3 months which is quite rare in Pune real estate. Highly recommend!',
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
    content: 'TIP: Always verify RERA registration before signing any agreement. I made the mistake of not checking and lost ₹5 lakhs to a builder who vanished. Check maharera.mahaonline.gov.in or your state RERA portal. Stay safe, homebuyers!',
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
    content: 'Has anyone dealt with Sobha Dream Acres? I am planning to book a unit there. My main concerns are: possession timeline, hidden charges, and after-sales support. Please share your honest experience. Budget is 65L for a 2BHK.',
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
    content: 'Sharing my 2-year experience with My Home Avatar: Pros: Good location, decent amenities, timely maintenance. Cons: Hidden charges of ₹80k at registration, parking allotment issues. Overall 4/5 — would recommend with caution.',
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
    content: 'CHECKLIST before taking possession: 1. Verify all measurements 2. Check electrical fittings 3. Test plumbing 4. Inspect flooring 5. Get OC (Occupancy Certificate) 6. Check common areas 7. Document everything with photos. Save this!',
    likes: 512,
    comments: 67,
    tags: ['#Checklist', '#Possession', '#HomeBuyerGuide'],
  },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const typeBadge: Record<string, { bg: string; text: string; label: string }> = {
  review: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Review' },
  tip: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Tip' },
  question: { bg: 'bg-stone-100', text: 'text-stone-700', label: 'Question' },
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [liked, setLiked] = useState<Set<number>>(new Set())

  const filtered = posts.filter(p => {
    if (activeTab === 'all') return true
    if (activeTab === 'reviews') return p.type === 'review'
    if (activeTab === 'tips') return p.type === 'tip'
    if (activeTab === 'questions') return p.type === 'question'
    return true
  })

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Rss size={24} className="text-amber-700" />
            <h1 className="text-4xl font-black text-stone-900">Community Feed</h1>
          </div>
          <p className="text-stone-500">Real experiences from real homebuyers across India</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-stone-200">
          {feedTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-amber-700 text-amber-700'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts */}
        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="visible">
          {filtered.map(post => {
            const badge = typeBadge[post.type]
            return (
              <motion.div key={post.id} variants={fadeUp}>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                        {post.user[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 text-sm">{post.user}</p>
                        <p className="text-stone-400 text-xs flex items-center gap-1">
                          <MapPin size={10} className="text-stone-400" />{post.city} · {post.time}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Builder & Rating */}
                  {post.builder && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-stone-400">About:</span>
                      <span className="text-sm font-semibold text-amber-700">{post.builder}</span>
                      {post.rating && <StarRating value={post.rating} size="sm" showValue />}
                    </div>
                  )}

                  {/* Content */}
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{post.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs text-amber-700 hover:text-amber-800 cursor-pointer transition-colors font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-3 border-t border-stone-100">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        liked.has(post.id) ? 'text-amber-700' : 'text-stone-400 hover:text-amber-700'
                      }`}
                    >
                      <ThumbsUp size={15} className={liked.has(post.id) ? 'fill-amber-700' : ''} />
                      {post.likes + (liked.has(post.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-700 transition-colors">
                      <MessageCircle size={15} />
                      {post.comments}
                    </button>
                    <div className="ml-auto flex items-center gap-3">
                      <button className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-700 transition-colors">
                        <Bookmark size={15} />
                        Save
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-700 transition-colors">
                        <Share2 size={15} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Load More */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 rounded-xl text-sm font-medium border border-stone-200 text-stone-500 hover:border-amber-700 hover:text-amber-700 bg-white transition-all">
            Load more posts
          </button>
        </div>
      </div>
    </div>
  )
}
