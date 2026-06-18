'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

const roles = [
  { id: 'buyer', label: 'Home Buyer', emoji: '🏠', desc: 'Looking to buy / already bought' },
  { id: 'builder', label: 'Builder', emoji: '🏗️', desc: 'Real estate developer' },
  { id: 'vendor', label: 'Vendor', emoji: '🔧', desc: 'Architect / contractor / interior' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4 },
  }),
};

function InputField({
  icon,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  delay,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  delay: number;
  children?: React.ReactNode;
}) {
  return (
    <motion.div custom={delay} variants={fadeUp}>
      <label className="block text-sm font-medium text-white/70 mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
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
        {children && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{children}</span>
        )}
      </div>
    </motion.div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [selectedRole, setSelectedRole] = useState('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error('Please agree to terms'); return; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    toast.success('🚀 Account created! Welcome to BuilderReview!');
    router.push('/dashboard');
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
        <h1 className="text-2xl font-bold text-white mb-2">Create your account 🚀</h1>
        <p className="text-white/50 text-sm">Join 50,000+ homebuyers today</p>
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
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            icon={<User size={16} />}
            label="👤 Full Name"
            value={form.name}
            onChange={set('name')}
            placeholder="Rahul Mehta"
            delay={2}
          />
          <InputField
            icon={<Mail size={16} />}
            label="📧 Email Address"
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="you@example.com"
            delay={3}
          />
          <InputField
            icon={<Phone size={16} />}
            label="📱 Phone Number"
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            placeholder="+91 98765 43210"
            delay={4}
          />

          {/* Role Selection */}
          <motion.div custom={5} variants={fadeUp}>
            <label className="block text-sm font-medium text-white/70 mb-3">
              🎯 I am a...
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className="p-3 rounded-xl text-center transition-all"
                  style={{
                    background:
                      selectedRole === role.id
                        ? 'rgba(245,158,11,0.15)'
                        : 'rgba(255,255,255,0.04)',
                    border:
                      selectedRole === role.id
                        ? '1px solid rgba(245,158,11,0.4)'
                        : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="text-2xl mb-1">{role.emoji}</div>
                  <div className="text-xs font-semibold text-white">{role.label}</div>
                  <div className="text-xs text-white/40 mt-0.5 hidden sm:block">
                    {role.desc}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Password */}
          <motion.div custom={6} variants={fadeUp}>
            <label className="block text-sm font-medium text-white/70 mb-2">🔒 Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => set('password')(e.target.value)}
                placeholder="Min 8 characters"
                className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F8F8FF',
                }}
                onFocus={(e) => { e.target.style.border = '1px solid rgba(245,158,11,0.5)'; }}
                onBlur={(e) => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>

          {/* Confirm Password */}
          <motion.div custom={7} variants={fadeUp}>
            <label className="block text-sm font-medium text-white/70 mb-2">🔒 Confirm Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => set('confirmPassword')(e.target.value)}
                placeholder="Repeat password"
                className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#F8F8FF',
                }}
                onFocus={(e) => { e.target.style.border = '1px solid rgba(245,158,11,0.5)'; }}
                onBlur={(e) => { e.target.style.border = '1px solid rgba(255,255,255,0.1)'; }}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>

          {/* Terms */}
          <motion.div custom={8} variants={fadeUp}>
            <label className="flex items-start gap-3 cursor-pointer">
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className="w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                style={{
                  background: agreed ? '#F59E0B' : 'transparent',
                  borderColor: agreed ? '#F59E0B' : 'rgba(255,255,255,0.2)',
                }}
              >
                {agreed && <Check size={12} style={{ color: '#0A0A0F' }} />}
              </button>
              <span className="text-sm text-white/50">
                I agree to the{' '}
                <Link href="/terms" className="text-amber-400 hover:text-amber-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-amber-400 hover:text-amber-300">
                  Privacy Policy
                </Link>{' '}
                📋
              </span>
            </label>
          </motion.div>

          <motion.div custom={9} variants={fadeUp}>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:scale-100"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: '#0A0A0F',
                boxShadow: '0 0 20px rgba(245,158,11,0.3)',
              }}
            >
              {loading ? (
                <span className="animate-pulse">Creating account...</span>
              ) : (
                <>
                  🚀 Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </motion.div>

          <motion.p custom={10} variants={fadeUp} className="text-center text-sm text-white/50">
            Already have an account?{' '}
            <Link href="/login" className="text-amber-400 font-medium hover:text-amber-300">
              Sign in 🔐
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </motion.div>
  );
}
