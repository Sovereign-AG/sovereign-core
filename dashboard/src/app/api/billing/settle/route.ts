import { NextResponse } from 'next/server';
import { performSettlement } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { orgId } = await req.json();
    const result = await performSettlement(orgId || 'sovereign-org');
    
    if (result.success) {
      return NextResponse.json({ success: true, amount: result.amount });
    } else {
      return NextResponse.json({ success: false, error: 'SETTLEMENT_FAILED' }, { status: 400 });
    }
  } catch (error) {
    console.error("[SETTLEMENT_API_ERROR]", error);
    return NextResponse.json({ success: false, error: 'INTERNAL_ERROR' }, { status: 500 });
  }
}
