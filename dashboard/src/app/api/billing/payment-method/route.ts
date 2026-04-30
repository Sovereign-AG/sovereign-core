import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();
    const org = db.organizations.find((o: any) => o.id === 'sovereign-org');
    return NextResponse.json({ success: true, paymentMethod: org?.payment_method || null });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { cardType, last4 } = await req.json();
    const db = await readDB();
    const orgIndex = db.organizations.findIndex((o: any) => o.id === 'sovereign-org');
    
    if (orgIndex !== -1) {
      db.organizations[orgIndex].payment_method = { cardType, last4 };
      await writeDB(db);
      return NextResponse.json({ success: true, paymentMethod: db.organizations[orgIndex].payment_method });
    }
    
    return NextResponse.json({ success: false, error: 'Org not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
