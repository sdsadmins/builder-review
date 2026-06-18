'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';

const cities = ['All Cities', 'Mumbai', 'Delhi NCR', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad'];
const ratings = ['Any Rating', '4.5+', '4.0+', '3.5+', '3.0+'];

const builders = [
  { slug: 'prestige-group', name: 'Prestige Group', city: 'Bangalore', rating: 4.6, reviews: 1234, rera: true, specialty: 'Luxury Residential', projects: 42 },
  { slug: 'dlf-limited', name: 'DLF Limited', city: 'Delhi NCR', rating: 4.2, reviews: 2891, rera: true, specialty: 'Premium Housing', projects: 78 },
  { slug: 'godrej-properties', name: 'Godrej Properties', city: 'Mumbai', rating: 4.5, reviews: 1677, rera: true, specialty: 'Mid-Range & Luxury', projects: 56 },
  { slug: 'sobha-limited', name: 'Sobha Limited', city: 'Bangalore', rating: 4.4, reviews: 893, rera: true, specialty: 'Quality Construction', projects: 31 },
  { slug: 'brigade-enterprises', name: 'Brigade Enterprises', city: 'Bangalore', rating: 4.3, reviews: 756, rera: true, specialty: 'Integrated Townships', projects: 24 },
  { slug: 'puravankara', name: 'Puravankara', city: 'Bangalore', rating: 4.1, reviews: 612, rera: true, specialty: 'Affordable Luxury', projects: 29 },
  { slug: 'omaxe', name: 'Omaxe Ltd', city: 'Delhi NCR', rating: 3.8, reviews: 1103, rera: false, specialty: 'Affordable Housing', projects: 38 },
  { slug: 'lodha-group', name: 'Lodha Group', city: 'Mumbai', rating: 4.3, reviews: 2104, rera: true, specialty: 'Luxury Skyscrapers', projects: 63 },
  { slug: 'tata-housing', name: 'Tata Housing', city: 'Mumbai', rating: 4.7, reviews: 988, rera: true, specialty: 'Trust & Quality', projects: 19 },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function BuildersPage() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedRating, setSelectedRating] = useState('Any Rating');
  const [reraOnly, setReraOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = builders.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.city.toLowerCase().includes(search.toLowerCase());
    const matchCity = selectedCity === 'All Cities' || b.city === selectedCity;
    const minRating = selectedRating === 'Any Rating' ? 0 : parseFloat(selectedRating);
    const matchRating = b.rating >= minRating;
    const matchRera = !reraOnly || b.rera;
    return matchSearch && matchCity && matchRating && matchRera;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-black mb-3">
          <span style={{
            background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            🏢 Builder Directory
          </span>
        </h1>
        <p className="text-white/50">2,000+ verified builders across India</p>
      </motion.div>

      {/* Search + Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search builders by name or city..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F8F8FF',
            }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all"
          style={{
            background: showFilters ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.06)',
            border: showFilters ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.1)',
            color: showFilters ? '#F59E0B' : '#F8F8FF',
          }}
        >
          <Filter size={16} className={showFilters ? 'text-amber-500' : 'text-white/50'} />
          Filters
        </button>
      </motion.div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* City */}
              <div>
                <label className="block text-sm text-white/60 mb-3">📍 City</label>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: selectedCity === city ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)',
                        border: selectedCity === city ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        color: selectedCity === city ? '#F59E0B' : '#F8F8FF80',
                      }}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
              {/* Rating */}
              <div>
                <label className="block text-sm text-white/60 mb-3">⭐ Minimum Rating</label>
                <div className="flex flex-wrap gap-2">
                  {ratings.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRating(r)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                      style={{
                        background: selectedRating === r ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)',
                        border: selectedRating === r ? '1px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        color: selectedRating === r ? '#F59E0B' : '#F8F8FF80',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              {/* RERA */}
              <div>
                <label className="block text-sm text-white/60 mb-3">✅ RERA Status</label>
                <button
                  onClick={() => setReraOnly(!reraOnly)}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl transition-all"
                  style={{
                    background: reraOnly ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                    border: reraOnly ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center text-xs"
                    style={{ background: reraOnly ? '#22C55E' : 'transparent', border: reraOnly ? 'none' : '1px solid rgba(255,255,255,0.3)' }}
                  >
                    {reraOnly && '✓'}
                  </div>
                  <span className="text-sm text-white/80">RERA Verified Only</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Results count */}
      <div className="text-sm text-white/40 mb-6">
        Showing {filtered.length} builder{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((builder) => (
          <motion.div key={builder.slug} variants={fadeUp}>
            <GlassCard className="p-6 hover:border-amber-500/20 transition-all duration-300 group h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.08))',
                    border: '1px solid rgba(245,158,11,0.15)',
                  }}
                >
                  🏗️
                </div>
                {builder.rera ? (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                    ✅ RERA
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                    ⚠️ No RERA
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{builder.name}</h3>
              <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
                <MapPin size={12} className="text-amber-500" />
                {builder.city}
              </div>
              <p className="text-amber-400/60 text-xs mb-4">{builder.specialty}</p>

              <div className="flex-1" />

              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                <div>
                  <StarRating value={builder.rating} size="sm" showValue />
                  <p className="text-white/40 text-xs mt-1">
                    {builder.reviews.toLocaleString()} reviews • {builder.projects} projects
                  </p>
                </div>
                <Link
                  href={`/builders/${builder.slug}`}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-amber-400 hover:bg-amber-500/10 border border-amber-500/20 transition-all group-hover:border-amber-500/40"
                >
                  View →
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/40">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">No builders found matching your criteria</p>
          <button
            onClick={() => { setSearch(''); setSelectedCity('All Cities'); setSelectedRating('Any Rating'); setReraOnly(false); }}
            className="mt-4 text-amber-400 hover:text-amber-300 text-sm underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
