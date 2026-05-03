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
          status: 'QUARANTINED', 
          tier: 'Forensic', 
          nist: 'Isolated',
          compliance_status: false
        };
      }
      return agent;
    });

    if (updated) {
      await writeDB(db);
      
      // Log to forensic ledger
      appendToLedger({
        type: 'AGENT_QUARANTINE',
        agent_id: id,
        details: `Identity ${agentName} placed in forensic isolation.`,
        severity: 'HIGH'
      });

      return NextResponse.json({ success: true, message: `Agent ${agentName} QUARANTINED.` });
    } else {
      return NextResponse.json({ success: false, error: "Agent not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("[QUARANTINE_API] Error:", err);
    return NextResponse.json({ success: false, error: 'Quarantine failed' }, { status: 500 });
  }
}

