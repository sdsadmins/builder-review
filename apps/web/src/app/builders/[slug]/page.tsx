'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, Building2, Shield, MessageSquare, BarChart3, Briefcase, CheckCircle, PenLine, Calendar, Home } from 'lucide-react'
import StarRating from '@/components/shared/StarRating'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

const tabs = [
  { id: 'overview', label: 'Overview', icon: Briefcase },
  { id: 'reviews', label: 'Reviews', icon: MessageSquare },
  { id: 'projects', label: 'Projects', icon: Building2 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

const reviews = [
  { user: 'Priya S.', date: 'Jan 2026', rating: 4.5, text: 'Overall great experience. Construction quality was excellent and delivery was mostly on time.', verified: true },
  { user: 'Rahul M.', date: 'Dec 2025', rating: 4.0, text: 'Good builder but communication could be better. Had to follow up multiple times for documents.', verified: true },
  { user: 'Kavitha N.', date: 'Nov 2025', rating: 5.0, text: 'Absolutely loved the experience. Our dream home was delivered ahead of schedule!', verified: true },
]

const projects = [
  { name: 'Prestige Lakeside Habitat', type: 'Residential', units: 1200, status: 'Delivered', year: 2024 },
  { name: 'Prestige Towers', type: 'Commercial', units: 450, status: 'Ongoing', year: 2025 },
  { name: 'Prestige Fairfields', type: 'Residential', units: 800, status: 'Delivered', year: 2023 },
  { name: 'Prestige Smart City', type: 'Township', units: 3500, status: 'Ongoing', year: 2026 },
]

const ratingBreakdown = [
  { label: 'Construction Quality', value: 4.7 },
  { label: 'Communication', value: 4.2 },
  { label: 'Financial Compliance', value: 4.5 },
  { label: 'After Sales', value: 4.3 },
  { label: 'Amenities', value: 4.6 },
]

export default function BuilderProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const builder = {
    name: 'Prestige Group',
    city: 'Bangalore',
    rating: 4.6,
    reviews: 1234,
    rera: 'PRM/KA/RERA/1251/309/AG/171012/000001',
    established: 1986,
    projects: 247,
    specialty: 'Luxury Residential',
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-24 h-24 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0 border border-amber-200"
            >
              <Building2 size={40} className="text-amber-700" />
            </motion.div>

            <div className="flex-1">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-black text-stone-900">{builder.name}</h1>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium">
                    <CheckCircle size={13} className="text-amber-700" /> RERA Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-stone-500 text-sm mb-3">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-stone-400" />{builder.city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-stone-400" /> Est. {builder.established}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} className="text-stone-400" />{builder.projects} Projects
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating value={builder.rating} size="lg" showValue />
                  <span className="text-stone-400 text-sm">({builder.reviews.toLocaleString()} reviews)</span>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <Link
              href="/review/new"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-amber-700 hover:bg-amber-800 text-white transition-colors shadow-sm"
            >
              <PenLine size={16} className="text-white" /> Write a Review
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* RERA Info */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-amber-700" />
            <span className="text-sm text-stone-500">RERA Number:</span>
            <span className="text-sm text-amber-700 font-mono">{builder.rera}</span>
          </div>
          <div className="h-4 w-px bg-stone-200 hidden md:block" />
          <span className="text-sm text-stone-500">Specialty: <span className="text-stone-700 font-medium">{builder.specialty}</span></span>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-stone-200">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                activeTab === id
                  ? 'border-amber-700 text-amber-700'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              <Icon size={15} className={activeTab === id ? 'text-amber-700' : 'text-stone-400'} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-20"
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Rating Breakdown */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-stone-900 mb-6 flex items-center gap-2">
                  <BarChart3 size={18} className="text-amber-700" /> Rating Breakdown
                </h3>
                <div className="space-y-4">
                  {ratingBreakdown.map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-stone-600">{item.label}</span>
                        <span className="text-amber-700 font-semibold">{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-stone-200 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-amber-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.value / 5) * 100}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MessageSquare, value: builder.reviews.toLocaleString(), label: 'Total Reviews' },
                  { icon: StarRating, value: builder.rating.toFixed(1), label: 'Avg Rating' },
                  { icon: Building2, value: builder.projects, label: 'Projects' },
                  { icon: CheckCircle, value: '96%', label: 'RERA Compliance' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="bg-white border border-stone-200 rounded-2xl p-5 text-center shadow-sm">
                    {label === 'Avg Rating' ? (
                      <div className="flex justify-center mb-2">
                        <StarRating value={Number(value)} size="sm" />
                      </div>
                    ) : (
                      <div className="flex justify-center mb-2">
                        <Icon size={20} className="text-amber-700" />
                      </div>
                    )}
                    <div className="text-2xl font-black text-amber-700 mb-1">{value}</div>
                    <div className="text-xs text-stone-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <div key={i} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                        {r.user[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 text-sm">{r.user}</p>
                        <p className="text-stone-400 text-xs">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating value={r.rating} size="sm" />
                      {r.verified && (
                        <span className="flex items-center gap-1 text-xs text-green-700 font-medium">
                          <CheckCircle size={11} className="text-green-600" /> Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(p => (
                <div key={p.name} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-stone-900">{p.name}</h4>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                      p.status === 'Delivered'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                      {p.status === 'Delivered' ? (
                        <span className="flex items-center gap-1"><CheckCircle size={10} /> {p.status}</span>
                      ) : (
                        p.status
                      )}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-stone-500">
                    <span className="flex items-center gap-1.5"><Building2 size={12} className="text-stone-400" />{p.type}</span>
                    <span className="flex items-center gap-1.5"><Home size={12} className="text-stone-400" />{p.units} units</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-stone-400" />{p.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <BarChart3 size={28} className="text-amber-700" />
              </div>
              <p className="text-stone-500 font-medium">Analytics dashboard coming soon</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Sticky Write Review CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/review/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-amber-700 hover:bg-amber-800 text-white shadow-lg shadow-amber-700/30 transition-all hover:-translate-y-0.5"
        >
          <PenLine size={16} className="text-white" /> Write a Review
        </Link>
      </div>
    </div>
  )
}
