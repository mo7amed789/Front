import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/api-test'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasRefreshCookie = request.cookies.has('refreshToken');
  if (!hasRefreshCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api-test/:path*'],
};
