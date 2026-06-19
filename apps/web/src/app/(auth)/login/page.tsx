'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, User, Shield, Store } from 'lucide-react'

const TEST_USERS = [
  { role: 'Registered User', email: 'user@builderreview.in', password: 'Test@1234', icon: User, color: 'text-stone-600', bg: 'bg-stone-50 border-stone-200 hover:bg-stone-100' },
  { role: 'Builder', email: 'builder@builderreview.in', password: 'Test@1234', icon: Building2, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200 hover:bg-amber-100' },
  { role: 'Vendor', email: 'vendor@builderreview.in', password: 'Test@1234', icon: Store, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
  { role: 'Super Admin', email: 'admin@builderreview.in', password: 'Test@1234', icon: Shield, color: 'text-red-600', bg: 'bg-red-50 border-red-200 hover:bg-red-100' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Middleware handles role-based redirect — just push to /dashboard and it redirects
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) setError('Invalid email or password')
    else router.push('/dashboard')
  }

  const loginAs = async (testEmail: string, testPassword: string) => {
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email: testEmail, password: testPassword, redirect: false })
    setLoading(false)
    if (res?.error) setError('Could not sign in with test account')
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Building2 size={28} className="text-amber-700" />
              <span className="font-black text-xl"><span className="text-amber-700">Builder</span><span className="text-stone-900">Review</span></span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 text-center mb-1">Welcome back</h1>
          <p className="text-stone-500 text-center text-sm mb-8">Sign in to your account</p>

          {/* Quick test login */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Quick Login — Test Accounts</p>
            <div className="grid grid-cols-1 gap-2">
              {TEST_USERS.map(({ role, email: te, password: tp, icon: Icon, color, bg }) => (
                <button
                  key={role}
                  onClick={() => loginAs(te, tp)}
                  disabled={loading}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${bg} ${color}`}
                >
                  <Icon size={16} className={color} />
                  <span className="flex-1 text-left">{role}</span>
                  <span className="text-xs opacity-60">{te}</span>
                  <ArrowRight size={13} className={color} />
                </button>
              ))}
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200" /></div>
            <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-stone-400">or sign in manually</span></div>
          </div>

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 placeholder:text-stone-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white text-stone-900 placeholder:text-stone-400"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-amber-700 hover:text-amber-800">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-sm text-stone-500 mt-6">
            No account?{' '}
            <Link href="/register" className="text-amber-700 hover:text-amber-800 font-medium">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
