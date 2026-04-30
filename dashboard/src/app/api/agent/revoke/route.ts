import { NextResponse } from 'next/server';
import { readDB, writeDB, appendToLedger } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Agent ID required" }, { status: 400 });

    const db = await readDB();
    let updated = false;
    let agentName = id;

    db.agents = db.agents.map((agent: any) => {
      if (agent.id === id || agent.did === id) {
        updated = true;
        agentName = agent.alias || agent.did;
        return { 
          ...agent, 
          status: 'TERMINATED', 
          tier: 'Critical', 
          nist: 'Non-Compliant',
          compliance_status: false 
        };
      }
      return agent;
    });

    if (updated) {
      await writeDB(db);
      
      // Log to forensic ledger
      appendToLedger({
        type: 'AGENT_REVOCATION',
        agent_id: id,
        details: `Identity ${agentName} REVOKED cryptographically.`,
        severity: 'CRITICAL'
      });

      return NextResponse.json({ success: true, message: `Agent ${agentName} TERMINATED cryptographically.` });
    } else {
      return NextResponse.json({ success: false, error: "Agent not found" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Revocation failed' }, { status: 500 });
  }
}
