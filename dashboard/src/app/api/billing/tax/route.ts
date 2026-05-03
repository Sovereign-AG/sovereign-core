import { NextResponse } from 'next/server';
import { accrueAssessment, appendToLedger } from '@/lib/db';

/**
 * Sovereign Protocol Tax API
 * Handles automated deductions for Minting, Heartbeats, and Forensic Actions.
 */
export async function POST(request: Request) {
  try {
    const { orgId, type, count = 1, agentId, metadata } = await request.json();

    if (!['MINT', 'ACTION', 'PULSE'].includes(type)) {
      return NextResponse.json({ success: false, error: 'INVALID_TAX_TYPE' }, { status: 400 });
    }

    const result = await accrueAssessment(orgId, type as 'MINT' | 'ACTION' | 'PULSE', count);
    
    if (result.success) {
        // PERMANENT RECORD: Stamp the event with the tenant ID
        appendToLedger({
            type,
            org_id: orgId,
            agent_id: agentId,
            count,
            metadata: metadata || {}
        });

        // LIVE UPDATE: Update the agent's performance signatures in the registry
        if (agentId) {
          const { updateAgentMetrics } = await import('@/lib/db');
          await updateAgentMetrics(agentId, { 
            latency_ms: metadata?.latency_ms,
            hash: metadata?.integrity_hash || metadata?.state_hash
          });
        }
    }
    
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    // Safety State: THRESHOLD_HALT - Blocks further action if settlement is pending above limit.
    if (result.status === 'THRESHOLD_HALT') {
      return NextResponse.json({ 
        success: true, 
        unbilled: result.unbilled,
        status: 'SETTLEMENT_REQUIRED' 
      }, { status: 402 });
    }

    return NextResponse.json({ 
      success: true, 
      unbilled: result.unbilled,
      status: 'OK',
      ledger_entry: { type, orgId, count, timestamp: new Date().toISOString() }
    });

  } catch (error) {
    console.error("[TAX_ENGINE_ERROR]", error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

