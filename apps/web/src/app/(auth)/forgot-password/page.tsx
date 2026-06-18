'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <motion.div initial="hidden" animate="visible">
      {/* Logo */}
      <motion.div custom={0} variants={fadeUp} className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <span className="text-3xl">🏗️</span>
          <span className="font-bold text-2xl">
            <span className="text-amber-400">Builder</span>
            <span className="text-white">Review</span>
          </span>
        </Link>
      </motion.div>

      <motion.div
        custom={1}
        variants={fadeUp}
        className="rounded-2xl p-8"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
                  style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>
                  🔑
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
                <p className="text-white/50 text-sm">
                  No worries! Enter your email and we&apos;ll send you a reset link 📧
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    📧 Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#F8F8FF',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(245,158,11,0.5)';
                        e.target.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    color: '#0A0A0F',
                    boxShadow: '0 0 20px rgba(245,158,11,0.3)',
                  }}
                >
                  {loading ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      📧 Send Reset Link
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-amber-400 transition-colors"
                  >
                    <ArrowLeft size={14} />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: 'rgba(245,158,11,0.15)',
                  border: '2px solid rgba(245,158,11,0.4)',
                  boxShadow: '0 0 40px rgba(245,158,11,0.2)',
                }}
              >
                <CheckCircle size={36} className="text-amber-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-3">✅ Email Sent!</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-2">
                We&apos;ve sent a password reset link to
              </p>
              <p className="text-amber-400 font-semibold mb-6">{email}</p>
              <p className="text-white/40 text-xs mb-8">
                Didn&apos;t receive it? Check your spam folder or{' '}
                <button
                  onClick={() => setSent(false)}
                  className="text-amber-400 hover:text-amber-300 underline"
                >
                  try again
                </button>
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all"
              >
                <ArrowLeft size={14} />
                Back to Sign In
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
