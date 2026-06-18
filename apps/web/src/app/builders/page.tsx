'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, MapPin, CheckCircle, Building2, ArrowRight, XCircle } from 'lucide-react'
import StarRating from '@/components/shared/StarRating'
import Navbar from '@/components/layout/Navbar'

const cities = ['All Cities', 'Mumbai', 'Delhi NCR', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad']
const ratings = ['Any Rating', '4.5+', '4.0+', '3.5+', '3.0+']

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
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export default function BuildersPage() {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [selectedRating, setSelectedRating] = useState('Any Rating')
  const [reraOnly, setReraOnly] = useState(false)

  const filtered = builders.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.city.toLowerCase().includes(search.toLowerCase())
    const matchCity = selectedCity === 'All Cities' || b.city === selectedCity
    const minRating = selectedRating === 'Any Rating' ? 0 : parseFloat(selectedRating)
    const matchRating = b.rating >= minRating
    const matchRera = !reraOnly || b.rera
    return matchSearch && matchCity && matchRating && matchRera
  })

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Building2 size={28} className="text-amber-700" />
            <h1 className="text-4xl font-black text-stone-900">Builder Directory</h1>
          </div>
          <p className="text-stone-500">2,000+ verified builders across India</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <div className="relative max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search builders by name or city..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border border-stone-300 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </motion.div>

        {/* Filter pills — City */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-3">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin size={11} className="text-stone-400" /> City
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedCity === city
                    ? 'bg-amber-700 text-white border-amber-700'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Filter pills — Rating */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-3">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Min Rating</p>
          <div className="flex flex-wrap gap-2">
            {ratings.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRating(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedRating === r
                    ? 'bg-amber-700 text-white border-amber-700'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </motion.div>

        {/* RERA toggle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mb-8">
          <button
            onClick={() => setReraOnly(!reraOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border transition-all ${
              reraOnly
                ? 'bg-amber-700 text-white border-amber-700'
                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
            }`}
          >
            <CheckCircle size={13} className={reraOnly ? 'text-white' : 'text-stone-400'} />
            RERA Verified Only
          </button>
        </motion.div>

        {/* Results count */}
        <div className="text-sm text-stone-400 mb-6">
          Showing {filtered.length} builder{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {filtered.map(builder => (
            <motion.div key={builder.slug} variants={fadeUp}>
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Building2 size={22} className="text-amber-700" />
                  </div>
                  {builder.rera ? (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                      <CheckCircle size={11} className="text-amber-700" /> RERA
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                      <XCircle size={11} className="text-red-500" /> No RERA
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-1">{builder.name}</h3>
                <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-1">
                  <MapPin size={12} className="text-stone-400" />{builder.city}
                </div>
                <p className="text-amber-700 text-xs font-medium mb-4">{builder.specialty}</p>

                <div className="flex-1" />

                <div className="flex items-center justify-between border-t border-stone-100 pt-4 mt-4">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <StarRating value={builder.rating} size="sm" showValue />
                    </div>
                    <p className="text-stone-400 text-xs">
                      {builder.reviews.toLocaleString()} reviews · {builder.projects} projects
                    </p>
                  </div>
                  <Link
                    href={`/builders/${builder.slug}`}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-semibold text-amber-700 border border-amber-700 hover:bg-amber-50 transition-all"
                  >
                    View <ArrowRight size={13} className="text-amber-700" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-stone-400">
            <Search size={40} className="text-stone-300 mx-auto mb-4" />
            <p className="text-lg text-stone-500 font-medium mb-2">No builders found</p>
            <p className="text-sm mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(''); setSelectedCity('All Cities'); setSelectedRating('Any Rating'); setReraOnly(false) }}
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
