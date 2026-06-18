'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight, Check, Building2, Store, Home } from 'lucide-react'

const roles = [
  { id: 'buyer', label: 'Home Buyer', icon: Home, desc: 'Looking to buy or already bought' },
  { id: 'builder', label: 'Builder', icon: Building2, desc: 'Real estate developer' },
  { id: 'vendor', label: 'Vendor', icon: Store, desc: 'Architect / contractor / interior' },
]

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [selectedRole, setSelectedRole] = useState('buyer')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string) => (v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) { setError('Please agree to the terms to continue'); return }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1400))
    router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 py-12">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="w-full max-w-md">
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-8">
          {/* Logo */}
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2">
              <Building2 size={28} className="text-amber-700" />
              <span className="font-black text-xl"><span className="text-amber-700">Builder</span><span className="text-stone-900">Review</span></span>
            </Link>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-2xl font-bold text-stone-900 text-center mb-1">Create your account</motion.h1>
          <motion.p variants={fadeUp} className="text-stone-500 text-center text-sm mb-8">Join 50,000+ homebuyers today</motion.p>

          {error && (
            <motion.div variants={fadeUp} className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => set('name')(e.target.value)}
                  required
                  placeholder="Rahul Mehta"
                  className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => set('email')(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone')(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </motion.div>

            {/* Role Selection */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-stone-700 mb-3">I am a...</label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map(({ id, label, icon: Icon, desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedRole(id)}
                    className={`p-3 rounded-xl text-center border transition-all ${
                      selectedRole === id
                        ? 'border-amber-700 bg-amber-50'
                        : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    <Icon
                      size={20}
                      className={`mx-auto mb-1.5 ${selectedRole === id ? 'text-amber-700' : 'text-stone-400'}`}
                    />
                    <div className={`text-xs font-semibold ${selectedRole === id ? 'text-amber-700' : 'text-stone-700'}`}>{label}</div>
                    <div className="text-xs text-stone-400 mt-0.5 hidden sm:block leading-tight">{desc}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => set('password')(e.target.value)}
                  required
                  placeholder="Min 8 characters"
                  className="w-full pl-9 pr-10 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 placeholder:text-stone-400"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={fadeUp}>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={e => set('confirmPassword')(e.target.value)}
                  required
                  placeholder="Repeat password"
                  className="w-full pl-9 pr-10 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 placeholder:text-stone-400"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </motion.div>

            {/* Terms */}
            <motion.div variants={fadeUp}>
              <label className="flex items-start gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => setAgreed(!agreed)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    agreed ? 'bg-amber-700 border-amber-700' : 'bg-white border-stone-300 hover:border-amber-500'
                  }`}
                >
                  {agreed && <Check size={12} className="text-white" />}
                </button>
                <span className="text-sm text-stone-500">
                  I agree to the{' '}
                  <Link href="/terms" className="text-amber-700 hover:text-amber-800">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-amber-700 hover:text-amber-800">Privacy Policy</Link>
                </span>
              </label>
            </motion.div>

            <motion.div variants={fadeUp}>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60"
              >
                {loading ? (
                  <span className="animate-pulse">Creating account...</span>
                ) : (
                  <>Create Account <ArrowRight size={16} /></>
                )}
              </button>
            </motion.div>
          </form>

          <p className="text-center text-sm text-stone-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-700 hover:text-amber-800 font-medium">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
