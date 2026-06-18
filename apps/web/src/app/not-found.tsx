import Link from 'next/link'
import { Building2, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-8 text-center">
      <Building2 size={56} className="text-stone-300 mb-6" />
      <h1 className="text-8xl font-black text-stone-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Page Not Found</h2>
      <p className="text-stone-500 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link href="/" className="flex items-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-semibold transition-colors">
          <Home size={16} className="text-white" /> Back to Home
        </Link>
        <Link href="/builders" className="flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-xl font-semibold transition-colors">
          <Search size={16} /> Explore Builders
        </Link>
      </div>
    </div>
  )
}
