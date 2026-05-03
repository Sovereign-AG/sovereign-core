import { NextResponse } from 'next/server';
import { refillBalance } from '@/lib/db';

/**
 * NexaPay Billing Gateway: Refill Credit Balance
 * Secure implementation for institutional financial flow.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Simulate NexaPay signature verification
    const { amount, orgId, status } = payload;
    
    if (status !== 'confirmed') {
      return NextResponse.json({ success: false, error: 'PAYMENT_PENDING' }, { status: 400 });
    }

    if (!amount || !orgId) {
      return NextResponse.json({ success: false, error: 'INVALID_PAYLOAD' }, { status: 400 });
    }

    const result = await refillBalance(orgId, parseFloat(amount));
    
    if (!result.success) {
       return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    console.log(`[BILLING_ENGINE] Refilled ${amount} USD for Org: ${orgId}. New Balance: ${result.balance}`);

    return NextResponse.json({ 
      success: true, 
      new_balance: result.balance,
      message: 'CREDITS_INITIALIZED' 
    });

  } catch (error) {
    console.error("[BILLING_GATEWAY_ERROR]", error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

