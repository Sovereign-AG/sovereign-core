import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await readDB();
    
    // Absolute Zero-Inference Telemetry
    const mints = db.registered_agents ? db.registered_agents.length : 0;
    
    // Scrape ledger for perfect tally (same logic as the SSE stream)
    const ledgerPath = path.resolve(process.cwd(), '..', 'sovereign_ledger.ndjson');
    let actions = 0;
    let pulses = 0;
    if (fs.existsSync(ledgerPath)) {
        const data = fs.readFileSync(ledgerPath, 'utf-8');
        const lines = data.split('\n').filter(Boolean);
        lines.forEach(line => {
             try {
                const entry = JSON.parse(line);
                const type = (entry.Type || entry.type || 'ACTION').toUpperCase();
                if (type === 'ACTION') actions++;
                else if (type === 'PULSE') pulses++;
             } catch(e) {}
        });
    }

    const totalYield = (mints * 1.0 + actions * 0.01 + pulses * 0.0001);
    const realizedRevenue = totalYield * 0.95; 
    const liabilityMitigated = actions * 12.5;

    // Aggregate Trust and Ethics
    const activeAgents = db.agents || [];
    const avgTrust = activeAgents.length > 0 ? activeAgents.reduce((acc: number, cur: any) => acc + Number(cur.trust_index || 98.5), 0) / activeAgents.length : 99.9;
    const avgFairness = activeAgents.length > 0 ? activeAgents.reduce((acc: number, cur: any) => acc + Number(cur.fairness_score || 98.0), 0) / activeAgents.length : 99.4;

    const org = db.organizations.find((o: any) => o.id === 'sovereign-org') || {};
    console.log(`[STATS_DEBUG] Org found: ${org.id}, FreeSlots: ${org.free_agent_slots}`);

    return NextResponse.json({ 
      success: true, 
      verifiedOrgs: db.organizations?.length || 0, 
      totalVerifications: actions + pulses, 
      usageLedgerCount: actions + pulses,
      totalActiveAgents: mints,
      totalRevenue: totalYield,
      realizedRevenue: realizedRevenue,
      liabilityMitigated: liabilityMitigated,
      avgTrustScore: avgTrust,
      avgFairnessScore: avgFairness,
      unbilledAssessments: org.unbilled_assessments || 0,
      settlementThreshold: org.settlement_threshold || 1000.00,
      balance: org.balance || 0,
      freeSlots: org.free_agent_slots ?? 5,
      paymentMethodActive: !!org.payment_method,
      protocolMode: 'INSTITUTIONAL',
      debug_db_path: path.resolve(process.cwd(), '..', 'sovereign_db.json'),
      debug_cwd: process.cwd()
    });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
