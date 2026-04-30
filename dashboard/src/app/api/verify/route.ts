import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { did } = await request.json();
    const db = await readDB();

    
    const agent = db.agents.find((a: any) => a.did === did);
    if (!agent) {
      return NextResponse.json({ success: false, message: 'Agent not found' }, { status: 404 });
    }

    // Check NIST status as requested
    if (agent.nist !== 'Verified') {
      return NextResponse.json({ 
        success: false, 
        message: 'High-Risk Action Blocked: Agent NIST Status is non-compliant.',
        nist_status: agent.nist 
      }, { status: 403 });
    }

    // Find organization and increment total_verifications
    const orgIndex = db.organizations.findIndex((o: any) => (typeof o === 'string' ? o : o.id) === agent.org_id);
    if (orgIndex !== -1) {
      if (typeof db.organizations[orgIndex] === 'string') {
        db.organizations[orgIndex] = { id: db.organizations[orgIndex], total_verifications: 1 };
      } else {
        db.organizations[orgIndex].total_verifications = (db.organizations[orgIndex].total_verifications || 0) + 1;
      }
    } else {
       // If org doesn't exist for some reason, create it
       db.organizations.push({ id: agent.org_id || 'unknown', total_verifications: 1 });
    }

    // Append log entry with timestamp for auditing
    if (!db.usage_logs) db.usage_logs = [];
    db.usage_logs.push({
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      agent_id: agent.id,
      did: agent.did,
      timestamp: new Date().toISOString(),
      action: 'API_VERIFY'
    });

    // Append to usage_ledger for revenue tracking (ACTION TAX: $0.01)
    if (!db.usage_ledger) db.usage_ledger = [];
    db.usage_ledger.push({
      id: `ledger-${Date.now()}`,
      agent_id: agent.id,
      did: agent.did,
      timestamp: new Date().toISOString(),
      fee: 0.01,
      type: 'ACTION_TAX',
      controller: agent.owner
    });

    await writeDB(db);


    return NextResponse.json({ 
      success: true, 
      message: 'Sovereign Verification Successful',
      nist_status: agent.nist
    });
  } catch (err) {
    console.error('Verify API error:', err);
    return NextResponse.json({ success: false, error: 'Verification internal error' }, { status: 500 });
  }
}
