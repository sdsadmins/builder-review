import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'BuilderReview - Real Builders. Real Reviews. Real Transparency.',
  description: 'India\'s most trusted real estate review platform. 50,000+ verified reviews from homebuyers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full`}>
      <body style={{ backgroundColor: '#FAF9F6', color: '#1A1A2E' }} className="h-full antialiased">
        {children}
        <Toaster
          theme="light"
          position="top-right"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              border: '1px solid #E2DDD6',
              color: '#1A1A2E',
            },
          }}
        />
      </body>
    </html>
  )
}
