'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', emoji: '📊' },
  { href: '/admin/moderation', label: 'Moderation', emoji: '⚖️' },
  { href: '/admin/users', label: 'Users', emoji: '👥' },
  { href: '/admin/roles', label: 'Roles', emoji: '🔐' },
  { href: '/admin/audit-log', label: 'Audit Log', emoji: '📋' },
  { href: '/admin/reports', label: 'Reports', emoji: '📈' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0A0A0F' }}>
      <aside className="hidden md:flex flex-col w-64 min-h-screen sticky top-0 border-r border-white/8 flex-shrink-0" style={{ background: '#0F0F1A' }}>
        <div className="px-6 py-6 border-b border-white/8">
          <Link href="/" className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🏗️</span>
            <span className="font-bold text-lg"><span className="text-amber-400">Builder</span><span className="text-white">Review</span></span>
          </Link>
          <span className="ml-8 text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/20">Admin Panel</span>
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
        <div className="p-4 border-t border-white/8">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-red-500/5 border border-red-500/10">
            <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Super Admin</p>
              <p className="text-xs text-red-400 truncate">admin@builderreview.in</p>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
