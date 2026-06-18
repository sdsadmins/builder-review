'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('🔐 Signed in successfully!');
    router.push('/dashboard');
    setLoading(false);
  };

  return (
    <motion.div initial="hidden" animate="visible">
      {/* Logo */}
      <motion.div custom={0} variants={fadeUp} className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <span className="text-3xl">🏗️</span>
          <span className="font-bold text-2xl">
            <span className="text-amber-400">Builder</span>
            <span className="text-white">Review</span>
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back 👋</h1>
        <p className="text-white/50 text-sm">Sign in to your account</p>
      </motion.div>

      {/* Card */}
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
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <motion.div custom={2} variants={fadeUp}>
            <label className="block text-sm font-medium text-white/70 mb-2">
              📧 Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"
              />
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
          </motion.div>

          {/* Password */}
          <motion.div custom={3} variants={fadeUp}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white/70">🔒 Password</label>
              <Link
                href="/forgot-password"
                className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-xl text-sm transition-all outline-none"
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
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div custom={4} variants={fadeUp}>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 mt-2"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: '#0A0A0F',
                boxShadow: '0 0 20px rgba(245,158,11,0.3)',
              }}
            >
              {loading ? (
                <span className="animate-pulse">Signing in...</span>
              ) : (
                <>
                  🔐 Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Register Link */}
          <motion.p custom={5} variants={fadeUp} className="text-center text-sm text-white/50">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-amber-400 font-medium hover:text-amber-300 transition-colors"
            >
              Create one 🚀
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </motion.div>
  );
}
