import Link from 'next/link';

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/careers', label: 'Careers' },
  { href: '/press', label: 'Press' },
  { href: '/contact', label: 'Contact' },
];

const platformLinks = [
  { href: '/builders', label: '🏢 Builders' },
  { href: '/vendors', label: '🔧 Vendors' },
  { href: '/feed', label: '🌟 Community Feed' },
  { href: '/review/new', label: '✍️ Write a Review' },
  { href: '/rewards', label: '🎁 Rewards' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/rera', label: 'RERA Guidelines' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 mt-auto"
      style={{ background: '#0A0A0F' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏗️</span>
              <span className="font-bold text-xl">
                <span className="text-amber-400">Builder</span>
                <span className="text-white">Review</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              India&apos;s most trusted platform for real estate builder reviews. Real
              homebuyers, verified experiences, total transparency.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-xs font-bold text-white/50 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
              🏢 Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
              🚀 Platform
            </h4>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider">
              ⚖️ Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* RERA Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-green-500/20 bg-green-500/5">
              <span className="text-green-400 text-xs">✅ RERA Compliant</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 BuilderReview 🏗️. All rights reserved. Made with ❤️ for Indian homebuyers.
          </p>
          <div className="flex items-center gap-4 text-white/40 text-xs">
            <span>🔒 SSL Secured</span>
            <span>•</span>
            <span>🇮🇳 Made in India</span>
            <span>•</span>
            <span>✅ RERA Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
