import { NextResponse } from 'next/server';
import { readDB, writeDB, appendToLedger } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { alias, owner, purpose, org_id } = body;

    const db = await readDB();
    
    // STRICT UNIQUENESS FOR ROOT IDENTITY ANCHOR
    if (alias === 'ROOT_IDENTITY_ANCHOR') {
      const existingAnchor = db.agents.find((a: any) => 
        a.alias === 'ROOT_IDENTITY_ANCHOR' && a.owner.toLowerCase() === owner.toLowerCase()
      );
      if (existingAnchor) {
        return NextResponse.json({ success: true, agent: existingAnchor, message: 'Existing anchor returned' });
      }
    }

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

    const org = db.organizations.find((o: any) => o.id === org_id);
    if (!org) {
       return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 });
    }

    // --- Institutional Billing Gate ---
    const isRootAnchor = alias === 'ROOT_IDENTITY_ANCHOR';
    const hasFreeSlots = (org.free_agent_slots || 0) > 0;
    const isBillingActive = org.payment_method || org.institutional_billing_active;

    // Industrial Debt Accrual: Proceed with registration even if subsidy is exhausted.
    // The $1.00 mint tax will be added to unbilled assessments.

    // Generate Sovereign DID & mock cryptographic anchors
    const newAgent = {
      id: `ag-${Date.now().toString().slice(-4)}-${Math.random().toString(36).slice(2, 6)}`,
      alias,
      did: `did:svtp:${Math.random().toString(36).substring(2, 12)}`,
      public_key: `svtp_pub_${Math.random().toString(36).substring(2, 15)}`,
      private_key: `svtp_priv_${Math.random().toString(36).substring(2, 25)}`,
      tier: 'Standard',
      nist: 'Verified',
      trust_index: (98 + Math.random() * 1.5).toFixed(1),
      liability_limit: '$1.0M',
      status: 'Active',
      owner,
      org_id,
      cpu: '0%',
      models: [],
      baseline_state_hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      auditHash: `0x${Math.random().toString(16).slice(2, 10)}`,
      purpose
    };

    db.agents.push(newAgent);

    // --- Settlement Logic ---
    if (isRootAnchor) {
        // Institutional Root of Trust: Exempt from Genesis Subsidy consumption and Mint Tax.
    } else if (hasFreeSlots) {
       // Consume Genesis Subsidy slot
       const orgIdx = db.organizations.findIndex((o: any) => o.id === org_id);
       db.organizations[orgIdx].free_agent_slots--;
    } else {
       // Accrue MINT tax to liabilities
       const orgIdx = db.organizations.findIndex((o: any) => o.id === org_id);
       db.organizations[orgIdx].unbilled_assessments = (db.organizations[orgIdx].unbilled_assessments || 0) + 1.00;
    }

    await writeDB(db);

    // Scaling MINT Settlement: Asynchronous Ledger Append
    appendToLedger({
        org_id: org_id,
        agent_did: newAgent.did,
        event_type: 'MINT',
        fee: isRootAnchor ? 0 : (hasFreeSlots ? 0 : 1.00),
        controller: owner
    });

    return NextResponse.json({ success: true, agent: newAgent });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Registration failed' }, { status: 500 });
  }
}

