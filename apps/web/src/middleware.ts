import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    const roles: string[] = (token?.roles as string[]) ?? []

    const isAdmin = roles.includes('super_admin') || roles.includes('moderator')
    const isBuilder = roles.includes('builder')
    const isVendor = roles.includes('vendor')

    // Redirect root /dashboard to role-specific dashboard
    if (pathname === '/dashboard' || pathname === '/dashboard/') {
      if (isAdmin) return NextResponse.redirect(new URL('/admin/dashboard', req.url))
      if (isBuilder) return NextResponse.redirect(new URL('/builder/dashboard', req.url))
      if (isVendor) return NextResponse.redirect(new URL('/vendor/dashboard', req.url))
      return NextResponse.next()
    }

    // Protect admin routes
    if (pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Protect builder routes
    if (pathname.startsWith('/builder') && !isBuilder && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Protect vendor routes
    if (pathname.startsWith('/vendor') && !isVendor && !isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        // Public routes — no auth required
        const publicPaths = ['/', '/login', '/register', '/forgot-password', '/builders', '/vendors', '/feed']
        if (publicPaths.some(p => pathname === p || pathname.startsWith('/builders/') || pathname.startsWith('/vendors/'))) {
          return true
        }
        // Everything else requires a token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
