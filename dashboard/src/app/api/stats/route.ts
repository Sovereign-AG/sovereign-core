import { NextResponse } from 'next/server';
import { readDB, getUserByEmail } from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email || "adityagawand79@gmail.com"; 
    const user = await getUserByEmail(email);

    const isArchitect = email === "office.sovereign.ag@gmail.com" || (user && user.role === 'SUPER_ADMIN');
    const orgId = user?.org_id || (isArchitect ? 'GLOBAL_ADMIN' : 'sovereign-org');

    const db = await readDB();
    
    // Scrape ledger for tenant-specific tally
    const ledgerPath = path.resolve(process.cwd(), '..', 'sovereign_ledger.ndjson');
    let actions = 0;
    let pulses = 0;
    if (fs.existsSync(ledgerPath)) {
        const data = fs.readFileSync(ledgerPath, 'utf-8');
        const lines = data.split('\n').filter(Boolean);
        lines.forEach(line => {
             try {
                const entry = JSON.parse(line);
                
                // MULTI-TENANT FILTER: Only count if it's the user's org or if user is Architect
                const entryOrg = entry.org_id || entry.orgId;
                if (!isArchitect && entryOrg !== orgId) return;

                const type = (entry.type || entry.Type || 'ACTION').toUpperCase();
                const count = entry.count || 1;
                if (type === 'ACTION') actions += count;
                else if (type === 'PULSE') pulses += count;
             } catch(e) {}
        });
    }

    const agents = isArchitect ? db.agents : db.agents.filter((a: any) => a.org_id === orgId);
    const mints = agents.length;
    
    // PRICING SYNCHRONIZATION WITH CORE DB
    const totalYield = (mints * 1.0 + actions * 0.01 + pulses * 0.0001);
    const org = db.organizations.find((o: any) => o.id === (isArchitect ? 'sovereign-org' : orgId)) || {};
    const realizedRevenue = Math.max(0, totalYield - (org.unbilled_assessments || 0));
    const liabilityMitigated = actions * 12.5;

    // Aggregate Trust, Ethics, and Latency for THIS FLEET
    const avgTrust = agents.length > 0 ? agents.reduce((acc: number, cur: any) => acc + Number(cur.trust_index || 98.5), 0) / agents.length : 99.9;
    const avgFairness = agents.length > 0 ? agents.reduce((acc: number, cur: any) => acc + Number(cur.fairness_score || 98.0), 0) / agents.length : 99.4;
    const avgLatency = agents.length > 0 ? agents.reduce((acc: number, cur: any) => acc + Number(cur.last_latency || 0), 0) / agents.filter((a: any) => a.last_latency).length || 0 : 0;

    // REAL-TIME PULSE RATE (Events in last 60s)
    let pulseRate = 0;
    if (db.usage_ledger) {
        const now = Date.now();
        let recentCount = 0;
        for (const entry of db.usage_ledger) {
            const entryTime = new Date(entry.timestamp).getTime();
            if (now - entryTime < 60000) recentCount++;
            else break;
        }
        pulseRate = recentCount / 60;
    }

    // MEAN TIME TO APPROVAL (MTTA)
    let mtta = 12.4; 
    if (db.compliance_requests) {
        const processed = db.compliance_requests.filter((r: any) => r.processedAt && r.timestamp);
        if (processed.length > 0) {
            const totalDiff = processed.reduce((acc: number, cur: any) => {
                return acc + (new Date(cur.processedAt).getTime() - new Date(cur.timestamp).getTime());
            }, 0);
            mtta = (totalDiff / processed.length) / (1000 * 60); 
        }
    }

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
      avgLatency: avgLatency,
      pulseRate: pulseRate,
      mtta: mtta,
      unbilledAssessments: org.unbilled_assessments || 0,
      settlementThreshold: org.settlement_threshold || 1000.00,
      balance: org.balance || 0,
      freeSlots: org.free_agent_slots ?? 5,
      paymentMethodActive: !!org.payment_method,
      protocolMode: 'ROOT_OF_TRUST'
    });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

