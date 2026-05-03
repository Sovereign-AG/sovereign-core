import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { action } = await req.json();
    const db = await readDB();
    
    const orgIndex = db.organizations.findIndex((o: any) => o.id === 'sovereign-org');
    
    if (orgIndex !== -1) {
      if (action === 'ACTIVATE_POST_PAID') {
        // Initialize or Reset the billing cycle
        db.organizations[orgIndex].billing_cycle_start = new Date().toISOString();
        db.organizations[orgIndex].institutional_billing_active = true;
        
        // Record the authorization event in the ledger
        const newTx = {
          id: `AUTH-${Math.floor(Math.random() * 9000) + 1000}`,
          date: new Date().toISOString(),
          type: 'Institutional Billing Authorized',
          amount: 0,
          status: 'Confirmed',
          did: 'SOV-TREASURY-001'
        };
        
        if (!db.billing) db.billing = {};
        if (!db.billing.ledger) db.billing.ledger = [];
        
        db.billing.ledger.unshift(newTx);
        
        await writeDB(db);
        
        return NextResponse.json({ 
          success: true, 
          message: 'Post-paid cycle activated.'
        });
      }
    }
    
    return NextResponse.json({ success: false, error: 'Organization or action invalid' }, { status: 404 });
  } catch (err) {
    console.error("[CHECKOUT_API_ERROR]", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

