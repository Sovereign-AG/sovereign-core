import { NextResponse } from 'next/server';
import { readDB, writeDB, appendToLedger } from '@/lib/db';
import { generateKeyPairSync } from 'crypto';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { count } = await request.json();
    if (!count || count <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid count' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const session = cookieStore.get('sov_session');
    const owner = session?.value || 'office.sovereign.ag@gmail.com';

    const db = await readDB();
    const orgId = 'sovereign-org'; // Standard institutional scope
    const orgIdx = db.organizations.findIndex((o: any) => o.id === orgId);
    const org = db.organizations[orgIdx];

    if (!org) {
       return NextResponse.json({ success: false, error: 'Organization not found' }, { status: 404 });
    }

    const currentFreeSlots = org.free_agent_slots || 0;
    const isBillingActive = org.payment_method || org.institutional_billing_active;
    
    const freeToMint = Math.min(count, currentFreeSlots);
    const taxableToMint = count - freeToMint;

    if (taxableToMint > 0 && !isBillingActive) {
       return NextResponse.json({ 
         success: false, 
         error: 'Genesis Subsidy Exhausted', 
         available_free: currentFreeSlots,
         requires_billing: true 
       }, { status: 402 });
    }

    const newAgents: any[] = [];
    const passports: any[] = [];

    for (let i = 0; i < count; i++) {
      const { publicKey, privateKey } = generateKeyPairSync('ed25519', {
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
      });

      const agentId = `agnt_${Math.random().toString(36).substring(2, 10)}`;
      const did = `did:sov:${agentId}`;
      
      passports.push({
        id: agentId,
        did: did,
        private_key: privateKey.toString()
      });

      newAgents.push({
        id: agentId,
        did: did,
        alias: `Fleet Node ${agentId.substring(5, 10).toUpperCase()}`,
        status: 'Active',
        tier: 'Standard',
        nist: 'Verified',
        owner: owner,
        org_id: orgId,
        publicKey: publicKey.toString(),
        trust_index: "99.0",
        variance: 0.0001,
        compliance_status: true,
        auditHash: `0x${Math.random().toString(16).substring(2, 10)}`,
        success_rate: 0.99,
        decision_confidence: 98.5,
        insurability_score: 95,
        fairness_score: 99.8,
        reasoning_trace: [
          "Bulk provisioned via Institutional Forge",
          "Cryptographic anchor verified",
          "NIST-2026 compliance sealed"
        ]
      });
    }

    // Update the primary agent registry
    db.agents = [...db.agents, ...newAgents];
    
    // Maintain secondary registry for protocol tracking
    if (!db.registered_agents) db.registered_agents = [];
    db.registered_agents = [...db.registered_agents, ...newAgents];
    
    // Update Billing State
    db.organizations[orgIdx].free_agent_slots = Math.max(0, currentFreeSlots - freeToMint);
    db.organizations[orgIdx].unbilled_assessments = (org.unbilled_assessments || 0) + (taxableToMint * 1.00);
    
    await writeDB(db);

    appendToLedger({
      type: 'MINT',
      agent_id: 'SYSTEM_PROVISIONER',
      amount: taxableToMint * 1.0,
      count: count,
      metadata: {
         action: 'BULK_FLEET_PROVISION',
         free_slots_used: freeToMint,
         taxable_minted: taxableToMint
      }
    });

    return NextResponse.json({ 
      success: true, 
      count: count,
      passports: passports 
    });

  } catch (err) {
    console.error('Bulk Mint Failed:', err);
    return NextResponse.json({ success: false, error: 'Bulk Mint Failed' }, { status: 500 });
  }
}
