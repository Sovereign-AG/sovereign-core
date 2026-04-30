import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const db = await readDB();
    
    const orgIndex = db.organizations.findIndex((o: any) => o.id === 'sovereign-org');
    if (orgIndex !== -1) {
      db.organizations[orgIndex].balance += parseFloat(amount);
      await writeDB(db);
      return NextResponse.json({ success: true, newBalance: db.organizations[orgIndex].balance });
    }
    
    return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
