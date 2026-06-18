'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, Search, PenLine, Gift, CheckCircle, MapPin, TrendingUp, ArrowRight, Shield, Users } from 'lucide-react'
import StarRating from '@/components/shared/StarRating'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), { ssr: false })

const stats = [
  { value: '50,000+', label: 'Verified Reviews', icon: PenLine },
  { value: '2,000+', label: 'Builders Listed', icon: Building2 },
  { value: '98%', label: 'Review Accuracy', icon: CheckCircle },
  { value: '10Cr+', label: 'Rewards Paid Out', icon: Gift },
]

const steps = [
  { num: '01', icon: Search, title: 'Find', desc: 'Search from 2,000+ builders and vendors across India. Filter by city, RERA status, rating.' },
  { num: '02', icon: PenLine, title: 'Review', desc: 'Share your honest experience through our verified 8-step review process. Your voice matters.' },
  { num: '03', icon: Gift, title: 'Earn', desc: 'Get rewarded for helping the community. Earn up to ₹500 per approved review via UPI.' },
]

const builders = [
  { name: 'Prestige Group', city: 'Bangalore', rating: 4.6, reviews: 1234, rera: true },
  { name: 'DLF Limited', city: 'Delhi NCR', rating: 4.2, reviews: 2891, rera: true },
  { name: 'Godrej Properties', city: 'Mumbai', rating: 4.5, reviews: 1677, rera: true },
]

const testimonials = [
  { name: 'Priya Sharma', city: 'Pune', text: 'BuilderReview helped me avoid a builder with poor RERA compliance. The detailed reviews gave me confidence to choose the right one for my family.', rating: 5 },
  { name: 'Rahul Mehta', city: 'Bangalore', text: 'I earned ₹1,500 just by writing honest reviews. The platform is incredibly easy to use and the community is very helpful.', rating: 5 },
  { name: 'Kavitha Nair', city: 'Chennai', text: 'As a first-time homebuyer, this platform was a lifesaver. Real reviews from real people — no fake ratings here!', rating: 5 },
]

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-white border-b border-stone-100 min-h-[88vh] flex items-center">
          <div className="absolute inset-0 pointer-events-none opacity-40"><ParticleField /></div>
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 text-sm font-medium mb-8">
                <Shield size={13} className="text-amber-700" />
                India&apos;s No.1 Real Estate Review Platform
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black leading-tight text-stone-900 mb-6">
                Real Builders.<br />
                <span className="text-amber-700">Real Reviews.</span><br />
                Real Transparency.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                50,000+ verified reviews from homebuyers like you. Make the right decision for your family&apos;s biggest investment.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/builders" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl text-base font-semibold transition-all shadow-lg shadow-stone-900/20 hover:shadow-xl hover:-translate-y-0.5">
                  <Building2 size={18} className="text-white" /> Explore Builders <ArrowRight size={16} className="text-white" />
                </Link>
                <Link href="/review/new" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-amber-700 text-amber-700 rounded-2xl text-base font-semibold hover:bg-amber-50 transition-all">
                  <PenLine size={18} className="text-amber-700" /> Write a Review
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-stone-900 py-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center">
                  <div className="flex justify-center mb-2"><Icon size={20} className="text-amber-400" /></div>
                  <div className="text-2xl font-black text-white mb-1">{value}</div>
                  <div className="text-sm text-stone-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-stone-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-stone-900 text-center mb-4">How it works</motion.h2>
              <motion.p variants={fadeUp} className="text-stone-500 text-center mb-16 max-w-xl mx-auto">Three simple steps to transparent real estate decisions</motion.p>
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map(({ num, icon: Icon, title, desc }) => (
                  <motion.div key={num} variants={fadeUp} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-2xl bg-amber-700 flex items-center justify-center mb-6">
                      <Icon size={22} className="text-white" />
                    </div>
                    <div className="text-xs font-bold text-amber-600 mb-2 tracking-wider">STEP {num}</div>
                    <h3 className="text-xl font-bold text-stone-900 mb-3">{title}</h3>
                    <p className="text-stone-500 leading-relaxed text-sm">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured builders */}
        <section className="py-24 bg-white border-y border-stone-100">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-3xl font-black text-stone-900 text-center mb-4">Featured Builders</motion.h2>
              <motion.p variants={fadeUp} className="text-stone-500 text-center mb-12">Top-rated builders with verified reviews</motion.p>
              <div className="grid md:grid-cols-3 gap-6">
                {builders.map(({ name, city, rating, reviews, rera }) => (
                  <motion.div key={name} variants={fadeUp} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                      <Building2 size={22} className="text-amber-700" />
                    </div>
                    <h3 className="font-bold text-stone-900 text-lg mb-1">{name}</h3>
                    <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-3">
                      <MapPin size={13} className="text-stone-400" /> {city}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <StarRating value={rating} size="sm" />
                      <span className="text-sm font-semibold text-stone-700">{rating}</span>
                      <span className="text-xs text-stone-400">({reviews.toLocaleString()} reviews)</span>
                    </div>
                    {rera && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-4">
                        <CheckCircle size={12} className="text-amber-700" /> RERA Verified
                      </div>
                    )}
                    <Link href={`/builders/${name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-1.5 text-amber-700 text-sm font-semibold hover:text-amber-800 transition-colors">
                      View Profile <ArrowRight size={14} className="text-amber-700" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-stone-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-3xl font-black text-stone-900 text-center mb-12">What homebuyers say</motion.h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map(({ name, city, text, rating }) => (
                  <motion.div key={name} variants={fadeUp} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                    <StarRating value={rating} size="sm" />
                    <p className="text-stone-600 text-sm leading-relaxed mt-4 mb-5">&ldquo;{text}&rdquo;</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                      <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">{name[0]}</div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{name}</p>
                        <p className="text-xs text-stone-400 flex items-center gap-1"><MapPin size={10} className="text-stone-400" />{city}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-stone-900 py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <Users size={36} className="text-amber-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-white mb-4">Join 50,000+ homebuyers</h2>
            <p className="text-stone-400 mb-8 leading-relaxed">Making informed real estate decisions every day. Your honest review could help thousands of families.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/builders" className="px-8 py-4 bg-amber-700 hover:bg-amber-600 text-white rounded-2xl font-semibold transition-colors">
                Explore Builders
              </Link>
              <Link href="/review/new" className="px-8 py-4 border-2 border-stone-600 text-stone-300 hover:border-stone-500 hover:text-white rounded-2xl font-semibold transition-colors">
                Write a Review
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
