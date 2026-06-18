'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Building2, Mail, ArrowLeft, CheckCircle, Send } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { setError('Please enter your email address'); return }
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
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

          {!sent ? (
            <>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <Mail size={22} className="text-amber-700" />
              </div>
              <h1 className="text-2xl font-bold text-stone-900 text-center mb-1">Forgot password?</h1>
              <p className="text-stone-500 text-center text-sm mb-8">Enter your email and we'll send you a reset link</p>

              {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Mail size={13} className="text-stone-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60">
                  <Send size={15} className="text-white" /> {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
              <div className="mt-6 text-center">
                <Link href="/login" className="flex items-center justify-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 transition-colors">
                  <ArrowLeft size={14} /> Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-stone-900 mb-3">Email Sent!</h2>
              <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                We've sent a password reset link to <strong className="text-stone-700">{email}</strong>. Check your inbox.
              </p>
              <Link href="/login" className="flex items-center justify-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 font-medium transition-colors">
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
