import { NextResponse } from 'next/server';
import { refillBalance } from '@/lib/db';

/**
 * NexaPay/Dodo Auto-Topup Webhook
 * Triggered by the billing engine when an organization's pre-authorized refill is required.
 */
export async function POST(request: Request) {
  try {
    const { orgId, amount, secret } = await request.json();

    // Security Check
    if (secret !== 'svtp_webhook_secret_xyz') {
      return NextResponse.json({ success: false, error: 'UNAUTHORIZED' }, { status: 401 });
    }

    console.log(`[SOVEREIGN_WEBHOOK] Executing Auto-Refill Charge of $${amount} for ${orgId}...`);
    
    // Simulate NexaPay API Delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = await refillBalance(orgId, amount);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        newBalance: result.newBalance,
        message: 'AUTO_REFILL_SUCCESSFUL'
      });
    }

    return NextResponse.json({ success: false, error: result.error }, { status: 400 });

  } catch (error) {
    console.error("[AUTO_TOPUP_ERROR]", error);
    return NextResponse.json({ success: false, error: 'INTERNAL_SERVER_ERROR' }, { status: 500 });
  }
}

