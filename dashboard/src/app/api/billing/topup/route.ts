import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { amount, orgId } = await request.json();
    const db = await readDB();
    const org = db.organizations.find((o: any) => o.id === orgId);
    
    if (!org) {
      return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 });
    }

    org.balance = (org.balance || 0) + amount;
    await writeDB(db);

    return NextResponse.json({ 
      success: true, 
      newBalance: org.balance 
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

