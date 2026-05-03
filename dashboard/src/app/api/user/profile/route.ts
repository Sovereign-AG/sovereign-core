import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, error: 'EMAIL_REQUIRED' }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      // Default for unknown identities (Self-Service)
      return NextResponse.json({ 
        success: true, 
        user: { 
          email, 
          org_id: 'sovereign-org', 
          role: 'FLEET_MANAGER',
          name: 'Independent Operator' 
        } 
      });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

