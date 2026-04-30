import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { agent_did } = await req.json();
    const db = await readDB();

    const agentIdx = db.agents.findIndex((a: any) => a.did === agent_did);
    if (agentIdx === -1) {
      return NextResponse.json({ success: false, error: 'Agent not found' }, { status: 404 });
    }

    const compromisedAgent = db.agents[agentIdx];
    
    // 1. QUARANTINE: Move to Shadow Registry
    const ghostEntry = {
      ...compromisedAgent,
      status: 'Quarantined',
      revocation_date: new Date().toISOString(),
      reason: 'Integrity Drift Detected'
    };
    db.shadow_registry.push(ghostEntry);

    // 2. TELEPORT: Re-key the Identity
    const healedAgent = {
      ...compromisedAgent,
      id: `ag-heal-${Date.now().toString().slice(-4)}-${Math.random().toString(36).slice(2, 6)}`,
      did: `did:sov:heal-${Math.random().toString(36).slice(2, 12)}`,
      status: 'Active',
      trust_index: "99.9", // Reset to high trust on fresh instance
      current_state_hash: compromisedAgent.baseline_state_hash, // Synchronize to baseline
      last_teleport: new Date().toISOString()
    };

    // Replace compromised with healed
    db.agents[agentIdx] = healedAgent;

    await writeDB(db);

    return NextResponse.json({ 
      success: true, 
      message: 'Identity Teleported Successfully',
      ghost_did: compromisedAgent.did,
      new_did: healedAgent.did,
      integrity_status: 'RESTORED'
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
