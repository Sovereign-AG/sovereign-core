import { NextResponse } from 'next/server';
import { readDB, writeDB, appendToLedger } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { alias, owner, purpose, org_id } = body;

    const db = readDB();

    // The Elite 20 Logic Gate
    // If the organization is new, check if we've hit the 20 limit
    const orgExists = db.organizations.some((o: any) => (typeof o === 'string' ? o : o.id) === org_id);
    if (!orgExists) {
      if (db.organizations.length >= 20) {
        return NextResponse.json({ 
          success: false, 
          message: "Waitlist Active: Control Tower has reached the 20 Organization cap. Your organization has been added to the Priority Queue." 
        }, { status: 403 });
      }
      db.organizations.push({ id: org_id, total_verifications: 0 });
    }

    // Generate Sovereign DID & mock data
    const newAgent = {
      id: `ag-${Date.now().toString().slice(-4)}`,
      alias,
      did: `did:sov:${Math.random().toString(36).substring(2, 10)}`,
      tier: 'Standard',
      nist: 'Verified',
      trust_index: (98 + Math.random() * 1.5).toFixed(1),
      liability_limit: '$1.0M',
      status: 'Active',
      owner,
      org_id,
      cpu: '0%',
      models: [],
      auditHash: `0x${Math.random().toString(16).slice(2, 10)}`,
      purpose
    };

    db.agents.push(newAgent);
    writeDB(db);

    // Scaling MINT Settlement: Asynchronous Ledger Append
    const mintRule = db.pricing_rules?.find((r: any) => r.event_type === 'MINT');
    const mintFee = mintRule ? mintRule.cost : 1.00;

    appendToLedger({
        org_id: org_id,
        agent_did: newAgent.did,
        event_type: 'MINT',
        fee: mintFee,
        controller: owner
    });

    return NextResponse.json({ success: true, agent: newAgent });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  }
}
