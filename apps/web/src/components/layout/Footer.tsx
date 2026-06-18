import Link from 'next/link'
import { Building2, Twitter, Linkedin, Instagram } from 'lucide-react'

const sections = [
  { title: 'Platform', links: [{ label: 'Builders', href: '/builders' }, { label: 'Vendors', href: '/vendors' }, { label: 'Reviews', href: '/feed' }, { label: 'Write a Review', href: '/review/new' }] },
  { title: 'Company', links: [{ label: 'About Us', href: '/about' }, { label: 'Careers', href: '/careers' }, { label: 'Press', href: '/press' }, { label: 'Contact', href: '/contact' }] },
  { title: 'Legal', links: [{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' }, { label: 'Cookie Policy', href: '/cookies' }, { label: 'Disclaimer', href: '/disclaimer' }] },
]

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Building2 size={22} className="text-amber-500" />
              <span className="font-bold text-lg">
                <span className="text-amber-500">Builder</span>
                <span className="text-stone-100">Review</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-400 mb-6">
              India's most trusted real estate review platform. Verified reviews from real homebuyers.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center hover:bg-amber-700 transition-colors group">
                  <Icon size={16} className="text-stone-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
          {sections.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-stone-100 font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-stone-400 hover:text-amber-400 transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">© 2025 BuilderReview Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="text-xs text-stone-600">Making real estate transparent, one review at a time.</p>
        </div>
      </div>
    </footer>
  )
}
