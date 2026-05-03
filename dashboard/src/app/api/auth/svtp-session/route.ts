import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, action } = await request.json();
    
    if (action === 'SET') {
      const cookieStore = await cookies();
      cookieStore.set('svtp_session', email, {
        maxAge: 2592000, // 30 Days
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax'
      });
      return NextResponse.json({ success: true, message: 'Session Established' });
    }

    if (action === 'CLEAR') {
      const cookieStore = await cookies();
      cookieStore.set('svtp_session', '', { maxAge: 0, path: '/' }); // Use set with maxAge 0 to be more reliable in some Next versions
      // Note: signOut() from next-auth should also be called on the client
      return NextResponse.json({ success: true, message: 'Session Terminated' });
    }

    return NextResponse.json({ success: false, error: 'Invalid Action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Session Fault' }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('svtp_session');
  
  // UNIFIED SESSION BRIDGE:
  // Fallback to NextAuth if the legacy session is missing
  if (!session) {
    const authSession = await getServerSession(authOptions);
    if (authSession?.user?.email) {
      return NextResponse.json({ 
        active: true, 
        email: authSession.user.email,
        type: 'OIDC'
      });
    }
  }

  return NextResponse.json({ 
    active: !!session, 
    email: session?.value || null,
    type: 'LEGACY'
  });
}

