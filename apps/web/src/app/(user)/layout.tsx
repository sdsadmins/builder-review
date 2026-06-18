'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/dashboard', label: 'Dashboard', emoji: '🏠' },
  { href: '/review/new', label: 'Write Review', emoji: '✍️' },
  { href: '/reviews', label: 'My Reviews', emoji: '📝' },
  { href: '/rewards', label: 'Rewards', emoji: '🎁' },
  { href: '/profile', label: 'Profile', emoji: '👤' },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0A0A0F' }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 min-h-screen sticky top-0 border-r border-white/8 flex-shrink-0"
        style={{ background: '#0F0F1A' }}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏗️</span>
            <span className="font-bold text-lg">
              <span className="text-amber-400">Builder</span>
              <span className="text-white">Review</span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                )}
              >
                <span className="text-lg">{link.emoji}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/8">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5">
            <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
              R
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Rahul Mehta</p>
              <p className="text-xs text-white/40 truncate">rahul@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
