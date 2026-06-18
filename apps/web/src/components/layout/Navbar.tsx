'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  Building2,
  Wrench,
  Rss,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/builders', label: '🏢 Builders' },
  { href: '/vendors', label: '🔧 Vendors' },
  { href: '/feed', label: '🌟 Feed' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Mock session — replace with useSession() when NextAuth is wired
  const session = null as null | { user: { name: string; email: string } };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className="mx-4 mt-3 rounded-2xl border border-white/10"
        style={{
          background: 'rgba(10, 10, 15, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🏗️</span>
            <span className="font-bold text-lg">
              <span className="text-amber-400">Builder</span>
              <span className="text-white">Review</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  pathname?.startsWith(link.href)
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/review/new"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: '#0A0A0F',
              }}
            >
              ✍️ Write a Review
            </Link>

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/80 hover:bg-white/5 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-black text-xs font-bold">
                    {session.user.name?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <ChevronDown size={14} className="text-amber-500" />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 py-1 shadow-2xl"
                      style={{ background: '#12121A' }}
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-all"
                      >
                        <Home size={14} className="text-amber-500" />
                        Dashboard 🏠
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-all"
                      >
                        <User size={14} className="text-amber-500" />
                        Profile 👤
                      </Link>
                      <Link
                        href="/rewards"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-all"
                      >
                        🎁 Rewards
                      </Link>
                      <div className="border-t border-white/10 my-1" />
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-all"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="px-6 py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      pathname?.startsWith(link.href)
                        ? 'bg-amber-500/15 text-amber-400'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/review/new"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold mt-2"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    color: '#0A0A0F',
                  }}
                >
                  ✍️ Write a Review
                </Link>
                {!session && (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium border border-amber-500/30 text-amber-400"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
