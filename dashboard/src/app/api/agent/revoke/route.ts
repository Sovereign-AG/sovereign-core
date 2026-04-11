import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "Agent ID required" }, { status: 400 });

    const db = readDB();
    let updated = false;

    db.agents = db.agents.map((agent: any) => {
      if (agent.id === id) {
        updated = true;
        return { ...agent, status: 'TERMINATED', tier: 'Critical', nist: 'Non-Compliant' };
      }
      return agent;
    });

    if (updated) {
      writeDB(db);
      return NextResponse.json({ success: true, message: `Agent ${id} TERMINATED cryptographically.` });
    } else {
      return NextResponse.json({ success: false, error: "Agent not found" }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Revocation failed' }, { status: 500 });
  }
}
