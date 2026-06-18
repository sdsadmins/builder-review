'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/builder/dashboard', label: 'Dashboard', emoji: '📊' },
  { href: '/builder/reviews', label: 'Reviews', emoji: '📝' },
  { href: '/builder/projects', label: 'Projects', emoji: '🏗️' },
  { href: '/builder/analytics', label: 'Analytics', emoji: '📈' },
  { href: '/builder/disputes', label: 'Disputes', emoji: '⚖️' },
  { href: '/builder/profile', label: 'Profile', emoji: '🏢' },
];

export default function BuilderPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0A0A0F' }}>
      <aside className="hidden md:flex flex-col w-64 min-h-screen sticky top-0 border-r border-white/8 flex-shrink-0" style={{ background: '#0F0F1A' }}>
        <div className="px-6 py-6 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🏗️</span>
            <span className="font-bold text-lg"><span className="text-amber-400">Builder</span><span className="text-white">Review</span></span>
          </Link>
          <span className="ml-8 text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/20">Builder Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link key={link.href} href={link.href} className={cn('flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all', active ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' : 'text-white/60 hover:text-white hover:bg-white/5')}>
                <span className="text-lg">{link.emoji}</span>{link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
