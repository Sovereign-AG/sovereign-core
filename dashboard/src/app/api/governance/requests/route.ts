import { NextResponse } from 'next/server';
import { getPendingRequests, processRequest, createComplianceRequest } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orgId = searchParams.get('orgId') || undefined;
  
  const requests = await getPendingRequests(orgId);
  return NextResponse.json({ success: true, requests });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, requestId, decision, requestData } = body;

    // SDK Signal: Create new request
    if (action === 'CREATE') {
      const newReq = await createComplianceRequest(requestData);
      return NextResponse.json({ success: true, request: newReq });
    }

    // Dashboard Signal: Approve/Reject
    if (action === 'PROCESS') {
      const success = await processRequest(requestId, decision);
      return NextResponse.json({ success });
    }
    
    // SDK Check: Is request processed?
    if (action === 'CHECK') {
        const { id } = body;
        const db = require('@/lib/db'); // Dynamic for freshness
        const fullDB = await db.readDB();
        const req = fullDB.compliance_requests?.find((r: any) => r.id === id);
        return NextResponse.json({ 
            status: req?.status || 'PENDING',
            processedAt: req?.processedAt || null
        });
    }

    return NextResponse.json({ success: false, error: 'Invalid Action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Governance Fault' }, { status: 500 });
  }
}

