'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'lucide-react';
import StarRating from '@/components/shared/StarRating';
import GlassCard from '@/components/shared/GlassCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ParticleField = dynamic(
  () => import('@/components/three/ParticleField'),
  { ssr: false }
);

const stats = [
  { value: '50,000+', label: 'Reviews', emoji: '📊' },
  { value: '2,000+', label: 'Builders', emoji: '🏢' },
  { value: '98%', label: 'Verified', emoji: '✅' },
  { value: '₹10Cr+', label: 'Rewards', emoji: '💰' },
];

const steps = [
  { emoji: '🔍', step: '01', title: 'Find', desc: 'Search from 2,000+ builders and vendors across India. Filter by city, RERA status, rating, and more.' },
  { emoji: '✍️', step: '02', title: 'Review', desc: 'Share your honest experience through our verified 8-step review process. Your voice matters.' },
  { emoji: '🎁', step: '03', title: 'Earn', desc: 'Get rewarded for helping the community. Earn up to ₹500 per review, redeemable via UPI.' },
];

const featuredBuilders = [
  { name: 'Prestige Group', city: '🏙️ Bangalore', rating: 4.6, reviews: 1234, rera: true, specialty: 'Luxury Residential', slug: 'prestige-group' },
  { name: 'DLF Limited', city: '🏙️ Delhi NCR', rating: 4.2, reviews: 2891, rera: true, specialty: 'Premium Housing', slug: 'dlf-limited' },
  { name: 'Godrej Properties', city: '🏙️ Mumbai', rating: 4.5, reviews: 1677, rera: true, specialty: 'Mid-Range & Luxury', slug: 'godrej-properties' },
];

const testimonials = [
  { name: 'Priya Sharma', city: 'Pune', text: 'BuilderReview helped me avoid a builder with poor RERA compliance. The detailed reviews gave me confidence to choose the right one for my family.', rating: 5, emoji: '👩' },
  { name: 'Rahul Mehta', city: 'Bangalore', text: 'I earned ₹1,500 just by writing honest reviews. The platform is incredibly easy to use and the community is very helpful.', rating: 5, emoji: '👨' },
  { name: 'Kavitha Nair', city: 'Chennai', text: 'As a first-time homebuyer, this platform was a lifesaver. Real reviews from real people — no fake ratings here!', rating: 5, emoji: '👩‍💼' },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#0A0A0F', color: '#F8F8FF', minHeight: '100vh' }}>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <ParticleField />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 30% 40%, rgba(245,158,11,0.1) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(217,119,6,0.06) 0%, transparent 60%)',
              zIndex: 1,
            }}
          />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-8">
                <Shield size={14} className="text-amber-500" />
                🇮🇳 India&apos;s #1 Real Estate Review Platform
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black leading-tight mb-6">
                <span style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #FCD34D 50%, #D97706 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  🏗️ Real Builders.<br />Real Reviews.<br />Real Transparency.
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                50,000+ verified reviews from real homebuyers. Make the right decision for your family&apos;s biggest investment. 🏠
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/builders" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#0A0A0F', boxShadow: '0 0 30px rgba(245,158,11,0.3)' }}>
                  🏢 Explore Builders <ArrowRight size={18} />
                </Link>
                <Link href="/review/new" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 transition-all">
                  ✍️ Write a Review
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="max-w-5xl mx-auto px-6 py-8">
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">{stat.emoji} {stat.value}</div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span style={{ background: 'linear-gradient(135deg, #F59E0B, #FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>⚡ How It Works</span>
              </h2>
              <p className="text-white/50 text-lg">Three simple steps to protect your investment</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <motion.div key={step.step} variants={fadeUp}>
                  <GlassCard className="p-8 h-full hover:border-amber-500/20 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black" style={{ background: 'linear-gradient(135deg, #F59E0B20, #D9770610)', border: '1px solid rgba(245,158,11,0.2)' }}>
                        {step.emoji}
                      </div>
                      <span className="text-5xl font-black text-white/10 group-hover:text-amber-500/20 transition-colors">{step.step}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed">{step.desc}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Featured Builders */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span style={{ background: 'linear-gradient(135deg, #F59E0B, #FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>🏆 Featured Builders</span>
              </h2>
              <p className="text-white/50 text-lg">Top-rated builders trusted by thousands</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBuilders.map((builder) => (
                <motion.div key={builder.name} variants={fadeUp}>
                  <GlassCard className="p-6 hover:border-amber-500/20 transition-all duration-300 group cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-4" style={{ background: 'linear-gradient(135deg, #F59E0B15, #D9770608)', border: '1px solid rgba(245,158,11,0.15)' }}>🏗️</div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-white">{builder.name}</h3>
                      {builder.rera && <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">✅ RERA</span>}
                    </div>
                    <p className="text-white/50 text-sm mb-1">{builder.city}</p>
                    <p className="text-amber-400/70 text-xs mb-4">{builder.specialty}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StarRating value={builder.rating} size="sm" showValue />
                        <span className="text-white/40 text-xs">({builder.reviews.toLocaleString()})</span>
                      </div>
                      <Link href={`/builders/${builder.slug}`} className="text-amber-400 text-sm font-medium group-hover:translate-x-1 transition-transform">View →</Link>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link href="/builders" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all font-medium">
                View All Builders 🏢 <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="py-24" style={{ background: 'rgba(245,158,11,0.03)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4">
                  <span style={{ background: 'linear-gradient(135deg, #F59E0B, #FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>💬 What Homebuyers Say</span>
                </h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <motion.div key={t.name} variants={fadeUp}>
                    <GlassCard className="p-6 h-full hover:border-amber-500/20 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-lg">{t.emoji}</div>
                        <div>
                          <p className="font-semibold text-white text-sm">{t.name}</p>
                          <p className="text-white/40 text-xs">📍 {t.city}</p>
                        </div>
                      </div>
                      <StarRating value={t.rating} size="sm" />
                      <p className="text-white/60 text-sm leading-relaxed mt-3">&ldquo;{t.text}&rdquo;</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="rounded-3xl p-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(217,119,6,0.05) 100%)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6">
                  <span style={{ background: 'linear-gradient(135deg, #F59E0B, #FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Join 50,000 Homebuyers 🏠</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-xl text-white/60 mb-10 max-w-xl mx-auto">
                  Write your first review today, earn rewards, and help thousands of families make the right decision. 🎁
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/register" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)', color: '#0A0A0F', boxShadow: '0 0 40px rgba(245,158,11,0.4)' }}>
                    🚀 Get Started Free <ArrowRight size={18} />
                  </Link>
                  <Link href="/builders" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-semibold border border-white/20 text-white/80 hover:bg-white/5 transition-all">
                    Explore Platform
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
