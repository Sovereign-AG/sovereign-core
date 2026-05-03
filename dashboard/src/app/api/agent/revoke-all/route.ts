import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const db = await readDB();
    
    // Global Security Protocol: Revoke all active agents
    db.agents = db.agents.map((agent: any) => ({
      ...agent,
      status: 'TERMINATED',
      tier: 'Critical',
      nist: 'Non-Compliant'
    }));

    await writeDB(db);

    return NextResponse.json({ 
      success: true, 
      message: 'GLOBAL REVOCATION SUCCESSFUL. All agent endpoints terminated.' 
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

