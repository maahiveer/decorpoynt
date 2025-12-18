import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // 1. SPAM PROTECTION & CLEANUP (User Request)
  // Force 410 Gone for known spam remnants to tell Google they are gone forever.
  const spamKeywords = ['billionaire', 'brainwave', 'parasite']
  if (spamKeywords.some(keyword => pathname.toLowerCase().includes(keyword))) {
    return new NextResponse('Gone', { status: 410, statusText: 'Gone' })
  }

  // Block indexing on *.vercel.app domains to prevent duplicate content
  // AND ensure we never block the primary domain (pickpoynt.com)
  const hostname = request.headers.get('host') || ''
  const isVercelDomain = hostname.endsWith('.vercel.app');
  const isPrimaryDomain = hostname === 'www.pickpoynt.com' || hostname === 'pickpoynt.com';

  if ((isVercelDomain && !isPrimaryDomain) || pathname.startsWith('/admin')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }

  // Set no-cache headers for all pages to prevent caching
  // This ensures articles appear immediately after publishing
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  response.headers.set('X-Cache-Control', 'no-store')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}



