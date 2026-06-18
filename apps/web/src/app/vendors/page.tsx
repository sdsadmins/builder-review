'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Filter } from 'lucide-react';
import GlassCard from '@/components/shared/GlassCard';
import StarRating from '@/components/shared/StarRating';
import Link from 'next/link';

const categories = [
  'All Categories', 'Architect 🏛️', 'Contractor 🔨', 'Interior Designer 🪴',
  'Plumber 🔧', 'Electrician ⚡', 'Civil Engineer 🏗️', 'Landscaper 🌿', 'Vastu Consultant 🧿',
];

const vendors = [
  { slug: 'design-studio', name: 'The Design Studio', category: 'Interior Designer 🪴', city: 'Mumbai', rating: 4.7, reviews: 234, verified: true, price: '₹800/sqft' },
  { slug: 'build-plus', name: 'BuildPlus Contractors', category: 'Contractor 🔨', city: 'Bangalore', rating: 4.4, reviews: 187, verified: true, price: '₹1200/sqft' },
  { slug: 'arch-visions', name: 'Arch Visions', category: 'Architect 🏛️', city: 'Delhi', rating: 4.8, reviews: 312, verified: true, price: '₹1500/sqft' },
  { slug: 'green-scape', name: 'GreenScape', category: 'Landscaper 🌿', city: 'Pune', rating: 4.5, reviews: 89, verified: true, price: '₹500/sqft' },
  { slug: 'spark-electric', name: 'Spark Electricals', category: 'Electrician ⚡', city: 'Hyderabad', rating: 4.3, reviews: 156, verified: false, price: '₹250/point' },
  { slug: 'aqua-plumb', name: 'AquaPlumb Services', category: 'Plumber 🔧', city: 'Chennai', rating: 4.1, reviews: 98, verified: true, price: '₹200/point' },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function VendorsPage() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All Categories');

  const filtered = vendors.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'All Categories' || v.category === selectedCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-black mb-3">
          <span style={{
            background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            🔧 Vendor Directory
          </span>
        </h1>
        <p className="text-white/50">Find trusted architects, contractors, and more</p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
        <div className="relative max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search vendors by name or city..."
            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#F8F8FF',
            }}
          />
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              background: selectedCat === cat ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
              border: selectedCat === cat ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgba(255,255,255,0.08)',
              color: selectedCat === cat ? '#F59E0B' : '#F8F8FF70',
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <div className="text-sm text-white/40 mb-6">Showing {filtered.length} vendors</div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((vendor) => (
          <motion.div key={vendor.slug} variants={fadeUp}>
            <GlassCard className="p-6 hover:border-amber-500/20 transition-all duration-300 group h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.08))',
                    border: '1px solid rgba(245,158,11,0.15)',
                  }}
                >
                  🔧
                </div>
                {vendor.verified ? (
                  <span className="px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">✅ Verified</span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">⚠️ Unverified</span>
                )}
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{vendor.name}</h3>
              <p className="text-amber-400/70 text-xs mb-1">{vendor.category}</p>
              <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                <MapPin size={12} className="text-amber-500" />
                {vendor.city}
              </div>

              <div className="flex-1" />

              <div className="border-t border-white/5 pt-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <StarRating value={vendor.rating} size="sm" showValue />
                  <span className="text-white/40 text-xs">({vendor.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400/60 text-xs font-medium">{vendor.price}</span>
                  <Link
                    href={`/vendors/${vendor.slug}`}
                    className="px-4 py-1.5 rounded-lg text-sm font-semibold text-amber-400 hover:bg-amber-500/10 border border-amber-500/20 transition-all"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
