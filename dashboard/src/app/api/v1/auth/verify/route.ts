import { readDB, writeDB, appendToLedger } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { apiKey, did, eventType } = body;

    const db = await readDB();

    // High-performance API Key verification
    const keyData = db.api_keys?.find((k: any) => k.key === apiKey);
    if (!keyData) {
      return NextResponse.json({ success: false, error: 'Unauthorized Node' }, { status: 401 });
    }

    // Dynamic pricing lookup (Tiered Scale)
    const rule = db.pricing_rules?.find((r: any) => r.event_type === (eventType || 'ACTION'));
    const fee = rule ? rule.cost : 0.01;

    // Institutional Metered Settlement (Asynchronous Logging)
    appendToLedger({
      org_id: keyData.org_id,
      agent_did: did,
      event_type: eventType || 'ACTION',
      fee: fee,
      controller: 'Institutional Auth Node'
    });

    return NextResponse.json({ 
      success: true, 
      status: 'VERIFIED',
      trust_alignment: 'NIST-800-218',
      fee_impact: `$${fee.toFixed(4)}`
    });
  } catch (err) {
    console.error('Auth Verify API error:', err);
    return NextResponse.json({ success: false, error: 'Internal Authorization Fault' }, { status: 500 });
  }
}
