'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, PenLine, Menu, Home, Layers, Rss, User } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/builders', label: 'Builders', icon: Building2 },
  { href: '/vendors', label: 'Vendors', icon: Layers },
  { href: '/feed', label: 'Feed', icon: Rss },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Building2 size={22} className="text-amber-700" />
            <span className="font-bold text-lg">
              <span className="text-amber-700">Builder</span>
              <span className="text-stone-900">Review</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === href
                    ? 'text-amber-700 bg-amber-50'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                )}
              >
                <Icon size={15} className={pathname === href ? 'text-amber-700' : 'text-stone-400'} />
                {label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/review/new"
              className="flex items-center gap-2 px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              <PenLine size={15} className="text-white" />
              Write a Review
            </Link>
            <Link href="/login" className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors">
              <User size={15} className="text-stone-400" /> Sign In
            </Link>
          </div>
          <Sheet>
            <SheetTrigger className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-50">
              <Menu size={22} className="text-stone-700" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-72">
              <div className="flex items-center gap-2 mb-8 pt-2">
                <Building2 size={22} className="text-amber-700" />
                <span className="font-bold text-lg"><span className="text-amber-700">Builder</span><span className="text-stone-900">Review</span></span>
              </div>
              <div className="space-y-1">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} className={cn('flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors', pathname === href ? 'text-amber-700 bg-amber-50' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50')}>
                    <Icon size={18} className={pathname === href ? 'text-amber-700' : 'text-stone-400'} />
                    {label}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <Link href="/review/new" className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-amber-700 text-white rounded-xl text-sm font-semibold">
                    <PenLine size={15} className="text-white" /> Write a Review
                  </Link>
                  <Link href="/login" className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-stone-200 text-stone-700 rounded-xl text-sm font-medium">
                    <User size={15} /> Sign In
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
