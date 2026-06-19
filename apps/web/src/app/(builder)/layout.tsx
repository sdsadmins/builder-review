'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, MessageSquare, FolderOpen, BarChart2, Scale, Building2, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/builder/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/builder/reviews', label: 'Reviews', icon: MessageSquare },
  { href: '/builder/projects', label: 'Projects', icon: FolderOpen },
  { href: '/builder/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/builder/disputes', label: 'Disputes', icon: Scale },
]

export default function BuilderRouteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const name = session?.user?.name ?? 'Builder Account'
  const initial = name.charAt(0).toUpperCase()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex bg-stone-50">
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-stone-200 flex-shrink-0">
        <div className="px-6 py-5 border-b border-stone-200">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <Building2 size={20} className="text-amber-700" />
            <span className="font-bold text-base"><span className="text-amber-700">Builder</span><span className="text-stone-900">Review</span></span>
          </Link>
          <span className="text-xs px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-medium">Builder Portal</span>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname?.startsWith(href + '/')
            return (
              <Link key={href} href={href} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all', active ? 'bg-amber-50 text-amber-700 border-l-2 border-amber-700 pl-[10px]' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50')}>
                <Icon size={17} className={active ? 'text-amber-700' : 'text-stone-400'} />
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-stone-200">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 cursor-pointer" onClick={handleLogout}>
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-sm font-bold">{initial}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-900 truncate">{name}</p>
              <p className="text-xs text-stone-400">RERA Verified</p>
            </div>
            <LogOut size={16} className="text-stone-400 hover:text-amber-700" />
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
