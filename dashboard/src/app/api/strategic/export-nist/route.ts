import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();
    
    const reportData = {
        protocol: 'Sovereign AG',
        version: 'v1.0.4',
        export_timestamp: new Date().toISOString(),
        compliance_standard: 'NIST-2026-PREVIEW',
        governance_summary: {
            total_active_identities: db.agents.length,
            geographic_restrictions: db.geographic_restrictions || [],
            watchtower_revocations_24h: db.agents.filter((a: any) => a.status === 'REVOKED' || a.status === 'TERMINATED').length,
        },
        enterprise_indices: db.agents.map((ag: any) => ({
            did: ag.did,
            alias: ag.alias,
            region: ag.region,
            csi_logic_health: ag.logic_health,
            success_rate: ag.success_rate,
            compliance_status: ag.compliance_status ? 'VALIDATED' : 'REVOKED',
            decision_path: ag.decision_path
        })),
        signature: 'CRYPTO_SIGNATURE_SOV_' + Math.random().toString(16).slice(2, 10).toUpperCase()
    };

    return new NextResponse(JSON.stringify(reportData, null, 2), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': `attachment; filename="Sovereign_NIST-2026_Audit_${Date.now()}.json"`
        }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
