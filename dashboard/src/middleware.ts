import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('SVTP_session');
  const { pathname } = request.nextUrl;

  // Protected Institutional Zones
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                          pathname.startsWith('/security') || 
                          pathname.startsWith('/network');

  // If no session and trying to access protected zone, redirect to handshake
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Auto-refresh the 30-day lease on every interaction
  const response = NextResponse.next();
  if (session) {
    response.cookies.set('SVTP_session', session.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // Reset to 30 days
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/security/:path*', '/network/:path*'],
};

