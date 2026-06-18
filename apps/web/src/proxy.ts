import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin routes require Admin role
    if (pathname.startsWith('/admin')) {
      if (!token?.roles?.includes('Admin')) {
        return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
      }
    }

    // Builder portal routes require Builder role
    if (pathname.startsWith('/builder')) {
      if (!token?.roles?.includes('Builder')) {
        return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
      }
    }

    // Vendor portal routes require Vendor role
    if (pathname.startsWith('/vendor')) {
      if (!token?.roles?.includes('Vendor')) {
        return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Protected routes require any auth
        const protectedPrefixes = [
          '/dashboard',
          '/review',
          '/rewards',
          '/profile',
          '/admin',
          '/builder',
          '/vendor',
        ];
        const requiresAuth = protectedPrefixes.some((prefix) =>
          pathname.startsWith(prefix)
        );

        if (requiresAuth) {
          return !!token;
        }

        return true;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/review/:path*',
    '/rewards/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/builder/:path*',
    '/vendor/:path*',
  ],
};
