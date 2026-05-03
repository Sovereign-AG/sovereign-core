import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const db = await readDB();

    // Check if the user is a returning architect or a new Sovereign member
    const isReturning = db.agents?.some((a: any) => 
      a.owner.toLowerCase() === email.toLowerCase() || 
      a.owner === 'SVTP FOUNDER'
    ) || db.usage_ledger?.some((e: any) => 
      e.event_type === 'MINT' && e.controller?.toLowerCase() === email.toLowerCase()
    );

    if (isReturning) {
      return NextResponse.json({ success: true, action: 'RETURNING' });
    } else {
      return NextResponse.json({ success: true, action: 'NEW_ANCHOR' });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Handshake Fault' }, { status: 500 });
  }
}

