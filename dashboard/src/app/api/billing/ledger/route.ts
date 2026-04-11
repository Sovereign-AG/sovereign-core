import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  try {
    const db = readDB();
    
    // Return the raw ledger and pricing rules for the billing portal
    return NextResponse.json({ 
      success: true, 
      ledger: db.usage_ledger || [],
      pricing_rules: db.pricing_rules || []
    });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
