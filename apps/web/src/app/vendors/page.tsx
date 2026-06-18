'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Store, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import StarRating from '@/components/shared/StarRating'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

const categories = [
  'All Categories', 'Architect', 'Contractor', 'Interior Designer',
  'Plumber', 'Electrician', 'Civil Engineer', 'Landscaper', 'Vastu Consultant',
]

const vendors = [
  { slug: 'design-studio', name: 'The Design Studio', category: 'Interior Designer', city: 'Mumbai', rating: 4.7, reviews: 234, verified: true, price: '₹800/sqft' },
  { slug: 'build-plus', name: 'BuildPlus Contractors', category: 'Contractor', city: 'Bangalore', rating: 4.4, reviews: 187, verified: true, price: '₹1200/sqft' },
  { slug: 'arch-visions', name: 'Arch Visions', category: 'Architect', city: 'Delhi', rating: 4.8, reviews: 312, verified: true, price: '₹1500/sqft' },
  { slug: 'green-scape', name: 'GreenScape', category: 'Landscaper', city: 'Pune', rating: 4.5, reviews: 89, verified: true, price: '₹500/sqft' },
  { slug: 'spark-electric', name: 'Spark Electricals', category: 'Electrician', city: 'Hyderabad', rating: 4.3, reviews: 156, verified: false, price: '₹250/point' },
  { slug: 'aqua-plumb', name: 'AquaPlumb Services', category: 'Plumber', city: 'Chennai', rating: 4.1, reviews: 98, verified: true, price: '₹200/point' },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function VendorsPage() {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('All Categories')

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase())
    const matchCat = selectedCat === 'All Categories' || v.category === selectedCat
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Store size={28} className="text-amber-700" />
            <h1 className="text-4xl font-black text-stone-900">Vendor Directory</h1>
          </div>
          <p className="text-stone-500">Find trusted architects, contractors, and more</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="relative max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search vendors by name or city..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </motion.div>

        {/* Category Filter pills */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedCat === cat
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="text-sm text-stone-400 mb-6">Showing {filtered.length} vendor{filtered.length !== 1 ? 's' : ''}</div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {filtered.map(vendor => (
            <motion.div key={vendor.slug} variants={fadeUp}>
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Store size={22} className="text-amber-700" />
                  </div>
                  {vendor.verified ? (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                      <CheckCircle size={11} className="text-amber-700" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200 text-stone-500 text-xs font-medium">
                      <AlertCircle size={11} className="text-stone-400" /> Unverified
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-1">{vendor.name}</h3>
                <p className="text-amber-700 text-xs font-medium mb-1">{vendor.category}</p>
                <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-4">
                  <MapPin size={12} className="text-stone-400" />{vendor.city}
                </div>

                <div className="flex-1" />

                <div className="border-t border-stone-100 pt-4 mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <StarRating value={vendor.rating} size="sm" showValue />
                    <span className="text-stone-400 text-xs">({vendor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700 text-xs font-semibold">{vendor.price}</span>
                    <Link
                      href={`/vendors/${vendor.slug}`}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-sm font-semibold text-amber-700 border border-amber-700 hover:bg-amber-50 transition-all"
                    >
                      View <ArrowRight size={13} className="text-amber-700" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search size={40} className="text-stone-300 mx-auto mb-4" />
            <p className="text-lg text-stone-500 font-medium mb-2">No vendors found</p>
            <p className="text-sm text-stone-400 mb-4">Try adjusting your search or category filter</p>
            <button
              onClick={() => { setSearch(''); setSelectedCat('All Categories') }}
              className="text-amber-700 hover:text-amber-800 text-sm font-medium underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
