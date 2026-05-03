import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const db = await readDB();
    const data = await req.json();

    if (data.action === 'EVALUATE_QUARANTINE_ALL') {
        const sourceGroups: Record<string, { totalVariance: number, count: number }> = {};
        
        db.agents.forEach((ag: any) => {
           if (!sourceGroups[ag.source]) {
              sourceGroups[ag.source] = { totalVariance: 0, count: 0 };
           }
           sourceGroups[ag.source].totalVariance += Number(ag.variance || 0);
           sourceGroups[ag.source].count += 1;
        });

        let revokedCount = 0;
        const quarantinedSources: string[] = [];

        for (const source in sourceGroups) {
            const avgVariance = sourceGroups[source].totalVariance / sourceGroups[source].count;
            if (avgVariance > 0.0005) {
                quarantinedSources.push(source);
            }
        }

        if (quarantinedSources.length > 0) {
            db.agents = db.agents.map((ag: any) => {
                if (quarantinedSources.includes(ag.source) && ag.status !== 'REVOKED') {
                    ag.status = 'REVOKED';
                    ag.compliance_status = false;
                    ag.tier = 'Critical';
                    ag.nist = 'Non-Compliant';
                    revokedCount++;
                }
                return ag;
            });
            writeDB(db);
        }

        return NextResponse.json({ 
            success: true, 
            revoked_count: revokedCount, 
            quarantined_sources: quarantinedSources 
        });
    }

    if (data.action === 'SIMULATE_PULSE') {
        // IP to Region Simulation mapping via X-Forwarded-For
        const ipHeader = req.headers.get('X-Forwarded-For') || data.simulated_ip || '192.168.1.1';
        const did = data.did;
        
        // Mock IP to Region logic
        let incomingRegion = 'US';
        if (ipHeader.startsWith('10.')) incomingRegion = 'EU';
        if (ipHeader.startsWith('172.')) incomingRegion = 'IN';

        let targetAgent = null;
        let watchtowerTriggered = false;

        db.agents = db.agents.map((ag: any) => {
            if (ag.did === did) {
                targetAgent = ag;
                
                // Geographic Validation Check
                if (db.geographic_restrictions && db.geographic_restrictions.length > 0) {
                    if (incomingRegion !== ag.region) {
                         // Watchtower Revoke
                         ag.status = 'REVOKED';
                         ag.compliance_status = false;
                         ag.tier = 'Critical';
                         ag.nist = 'Non-Compliant';
                         watchtowerTriggered = true;
                    }
                }
            }
            return ag;
        });

        if (watchtowerTriggered) {
             writeDB(db);
             return NextResponse.json({ success: true, authorized: false, message: 'Watchtower Revoke: Unauthorized Pulse Geolocation.' });
        }

        if (!targetAgent) {
            return NextResponse.json({ success: false, message: 'Identity not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, authorized: true, message: 'Pulse Verified' });
    }

    if (data.action === 'TOGGLE_REGION') {
       if (!db.geographic_restrictions) db.geographic_restrictions = [];
       
       if (db.geographic_restrictions.includes(data.region)) {
          db.geographic_restrictions = db.geographic_restrictions.filter((r:string) => r !== data.region);
       } else {
          db.geographic_restrictions.push(data.region);
       }

       // Governance Toggles: Flag or Quarantine agents if variance > 0
       let flaggedCount = 0;
       if (db.geographic_restrictions.includes(data.region)) {
           db.agents = db.agents.map((ag: any) => {
               if (ag.variance > 0 && ag.region === data.region.replace('-GDPR', '').replace('-DPDP', '')) {
                   ag.status = 'REVIEW_REQUIRED';
                   ag.tier = 'Warning';
                   flaggedCount++;
               }
               return ag;
           });
       }

       writeDB(db);
       return NextResponse.json({ 
           success: true, 
           active_restrictions: db.geographic_restrictions,
           flagged_for_review: flaggedCount
       });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

