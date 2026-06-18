'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, DollarSign, TrendingUp, Activity, ArrowRight, Gift, PenLine, CheckCircle, Clock, User } from 'lucide-react'
import StarRating from '@/components/shared/StarRating'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

const stats = [
  { icon: FileText, value: '2', label: 'Reviews Written', color: 'text-amber-700', bg: 'bg-amber-100' },
  { icon: DollarSign, value: '₹500', label: 'Rewards Earned', color: 'text-green-700', bg: 'bg-green-100' },
  { icon: TrendingUp, value: '4.8', label: 'Impact Score', color: 'text-purple-700', bg: 'bg-purple-100' },
  { icon: Activity, value: '3', label: 'Day Streak', color: 'text-red-600', bg: 'bg-red-100' },
]

const recentReviews = [
  {
    id: 1,
    builder: 'Prestige Group',
    project: 'Prestige Lakeside Habitat',
    rating: 4.5,
    date: 'Jan 15, 2026',
    status: 'approved',
    reward: '₹250',
  },
  {
    id: 2,
    builder: 'Sobha Limited',
    project: 'Sobha Dream Gardens',
    rating: 4.0,
    date: 'Dec 28, 2025',
    status: 'approved',
    reward: '₹250',
  },
]

const timeline = [
  { icon: Gift, text: 'Reward of ₹250 credited to your account', time: '2 hours ago', color: 'text-green-700', bg: 'bg-green-100' },
  { icon: CheckCircle, text: 'Your review for Prestige Group was approved', time: '1 day ago', color: 'text-amber-700', bg: 'bg-amber-100' },
  { icon: PenLine, text: 'You submitted a review for Sobha Limited', time: '3 days ago', color: 'text-purple-700', bg: 'bg-purple-100' },
  { icon: Activity, text: '3-day review streak — keep it up!', time: '3 days ago', color: 'text-red-600', bg: 'bg-red-100' },
]

export default function UserDashboardPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto bg-stone-50 min-h-screen">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <User size={20} className="text-amber-700" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-stone-900">
              Welcome back, <span className="text-amber-700">Alex!</span>
            </h1>
            <p className="text-stone-500 text-sm">Your impact is helping thousands of homebuyers</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(({ icon: Icon, value, label, color, bg }) => (
            <div key={label} className="bg-white border border-stone-200 rounded-2xl p-5 text-center shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <div className={`text-2xl font-black mb-1 ${color}`}>{value}</div>
              <div className="text-xs text-stone-500">{label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Reviews */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <FileText size={18} className="text-amber-700" /> Recent Reviews
              </h2>
              <Link href="/reviews" className="text-sm text-amber-700 hover:text-amber-800 flex items-center gap-1 font-medium">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentReviews.map(review => (
                <div key={review.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-stone-900 text-sm">{review.builder}</h3>
                      <p className="text-xs text-stone-400">{review.project}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-green-700 font-medium mb-1">
                        <CheckCircle size={11} className="text-green-600" /> Approved
                      </div>
                      <div className="text-xs font-bold text-amber-700">{review.reward} earned</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <StarRating value={review.rating} size="sm" showValue />
                    <span className="text-xs text-stone-400">{review.date}</span>
                  </div>
                </div>
              ))}

              {/* Write new review CTA */}
              <Link href="/review/new">
                <div className="bg-amber-50 border border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-5 transition-all cursor-pointer flex items-center justify-center gap-3 hover:bg-amber-100">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                    <PenLine size={16} className="text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-700">Write a New Review</p>
                    <p className="text-xs text-stone-500">Earn up to ₹500 per review</p>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Rewards & Streak */}
          <motion.div variants={fadeUp} className="space-y-4">
            {/* Pending Reward */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Gift size={16} className="text-amber-700" /> Pending Rewards
              </h3>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-center cursor-pointer hover:bg-amber-100 transition-colors">
                <Gift size={28} className="text-amber-700 mx-auto mb-2" />
                <p className="text-amber-700 font-bold text-sm">Reveal Reward</p>
                <p className="text-stone-400 text-xs mt-1">Win up to ₹500</p>
              </div>
            </div>

            {/* Streak */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Activity size={16} className="text-red-500" />
                <h3 className="text-sm font-bold text-stone-900">Review Streak</h3>
              </div>
              <div className="text-4xl font-black text-red-500 mb-1">3</div>
              <p className="text-xs text-stone-500 mb-3">days in a row</p>
              <div className="flex gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${i < 3 ? 'bg-red-400' : 'bg-stone-200'}`}
                  />
                ))}
              </div>
              <p className="text-xs text-stone-400 mt-1">Week progress</p>
            </div>
          </motion.div>
        </div>

        {/* Activity Timeline */}
        <motion.div variants={fadeUp}>
          <h2 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-amber-700" /> Activity Timeline
          </h2>
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              {timeline.map(({ icon: Icon, text, time, color, bg }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={14} className={color} />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm text-stone-700">{text}</p>
                    <p className="text-xs text-stone-400 mt-1">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
