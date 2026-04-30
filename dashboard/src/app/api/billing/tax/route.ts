import { NextResponse } from 'next/server';
import { accrueAssessment } from '@/lib/db';

/**
 * Sovereign Protocol Tax API
 * Handles automated deductions for Minting, Heartbeats, and Forensic Actions.
 */
export async function POST(request: Request) {
  try {
    const { orgId, type, metadata } = await request.json();

    const TAX_RATES: Record<string, number> = {
      'MINT': 1.00,
      'ACTION': 0.01,
      'PULSE': 0.0001
    };

    const cost = TAX_RATES[type];
    
    if (cost === undefined) {
      return NextResponse.json({ success: false, error: 'INVALID_TAX_TYPE' }, { status: 400 });
    }

    const result = await accrueAssessment(orgId, cost);
    
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
      status: 'OK' 
    });

  } catch (error) {
    console.error("[TAX_ENGINE_ERROR]", error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}
