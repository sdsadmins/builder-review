'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Building2, Shield, Star, MessageSquare, BarChart3, Briefcase } from 'lucide-react';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import Link from 'next/link';

const tabs = [
  { id: 'overview', label: '📋 Overview', icon: Briefcase },
  { id: 'reviews', label: '📝 Reviews', icon: MessageSquare },
  { id: 'projects', label: '🏗️ Projects', icon: Building2 },
  { id: 'analytics', label: '📊 Analytics', icon: BarChart3 },
];

const reviews = [
  { user: 'Priya S.', date: 'Jan 2026', rating: 4.5, text: 'Overall great experience. Construction quality was excellent and delivery was mostly on time.', verified: true },
  { user: 'Rahul M.', date: 'Dec 2025', rating: 4.0, text: 'Good builder but communication could be better. Had to follow up multiple times for documents.', verified: true },
  { user: 'Kavitha N.', date: 'Nov 2025', rating: 5.0, text: 'Absolutely loved the experience. Our dream home was delivered ahead of schedule!', verified: true },
];

const projects = [
  { name: 'Prestige Lakeside Habitat', type: 'Residential', units: 1200, status: '✅ Delivered', year: 2024 },
  { name: 'Prestige Towers', type: 'Commercial', units: 450, status: '🔄 Ongoing', year: 2025 },
  { name: 'Prestige Fairfields', type: 'Residential', units: 800, status: '✅ Delivered', year: 2023 },
  { name: 'Prestige Smart City', type: 'Township', units: 3500, status: '🔄 Ongoing', year: 2026 },
];

const ratingBreakdown = [
  { label: 'Construction Quality ⚒️', value: 4.7 },
  { label: 'Communication 📞', value: 4.2 },
  { label: 'Financial Compliance 💰', value: 4.5 },
  { label: 'After Sales ⚙️', value: 4.3 },
  { label: 'Amenities 🏊', value: 4.6 },
];

export default function BuilderProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  // In production, fetch from API using params.slug
  const builder = {
    name: 'Prestige Group',
    city: 'Bangalore',
    rating: 4.6,
    reviews: 1234,
    rera: 'PRM/KA/RERA/1251/309/AG/171012/000001',
    established: 1986,
    projects: 247,
    specialty: 'Luxury Residential',
  };

  return (
    <div style={{ backgroundColor: '#0A0A0F' }}>
      {/* Hero Banner */}
      <div
        className="relative h-64 md:h-80"
        style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.08) 50%, #0A0A0F 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="absolute inset-0 flex items-end pb-0">
          <div className="max-w-7xl mx-auto px-6 w-full">
            {/* floating particles visual */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-amber-500/30"
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl shadow-2xl"
              style={{
                background: '#12121A',
                border: '3px solid rgba(245,158,11,0.3)',
                boxShadow: '0 0 40px rgba(245,158,11,0.15)',
              }}
            >
              🏗️
            </motion.div>

            <div className="flex-1">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-black text-white">{builder.name}</h1>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    ✅ RERA Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-amber-500" />
                    {builder.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 size={14} className="text-amber-500" />
                    Est. {builder.established}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} className="text-amber-500" />
                    {builder.projects} Projects
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <StarRating value={builder.rating} size="lg" showValue />
                  <span className="text-white/40 text-sm">({builder.reviews.toLocaleString()} reviews)</span>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <Link
              href="/review/new"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: '#0A0A0F',
                boxShadow: '0 0 20px rgba(245,158,11,0.3)',
              }}
            >
              ✍️ Write a Review
            </Link>
          </div>
        </div>

        {/* RERA Info */}
        <GlassCard className="p-4 mb-8 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-amber-500" />
            <span className="text-sm text-white/60">RERA Number:</span>
            <span className="text-sm text-amber-400 font-mono">{builder.rera}</span>
          </div>
          <div className="text-sm text-white/40">|</div>
          <span className="text-sm text-white/60">Specialty: <span className="text-white/80">{builder.specialty}</span></span>
        </GlassCard>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
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
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="pb-16"
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Rating Breakdown */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-bold text-white mb-6">📊 Rating Breakdown</h3>
                <div className="space-y-4">
                  {ratingBreakdown.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white/70">{item.label}</span>
                        <span className="text-amber-400 font-semibold">{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #F59E0B, #FCD34D)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.value / 5) * 100}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: '📝', value: builder.reviews.toLocaleString(), label: 'Total Reviews' },
                  { emoji: '⭐', value: builder.rating.toFixed(1), label: 'Avg Rating' },
                  { emoji: '🏗️', value: builder.projects, label: 'Projects' },
                  { emoji: '✅', value: '96%', label: 'RERA Compliance' },
                ].map((stat) => (
                  <GlassCard key={stat.label} className="p-5 text-center">
                    <div className="text-3xl mb-2">{stat.emoji}</div>
                    <div className="text-2xl font-black text-amber-400 mb-1">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((r, i) => (
                <GlassCard key={i} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
                        {r.user[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{r.user}</p>
                        <p className="text-white/40 text-xs">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating value={r.rating} size="sm" />
                      {r.verified && (
                        <span className="text-xs text-green-400">✅ Verified</span>
                      )}
                    </div>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{r.text}</p>
                </GlassCard>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <GlassCard key={p.name} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-white">{p.name}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">{p.status}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-white/50">
                    <span>🏗️ {p.type}</span>
                    <span>🏠 {p.units} units</span>
                    <span>📅 {p.year}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-white/50">Analytics dashboard coming soon</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Sticky CTA */}
      <div
        className="fixed bottom-6 right-6 z-50"
      >
        <Link
          href="/review/new"
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-2xl transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
            color: '#0A0A0F',
            boxShadow: '0 0 30px rgba(245,158,11,0.4)',
          }}
        >
          ✍️ Write a Review
        </Link>
      </div>
    </div>
  );
}
