import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ledgerPath = path.resolve(process.cwd(), '..', 'sovereign_ledger.ndjson');
    const transactions: any[] = [];

    if (fs.existsSync(ledgerPath)) {
      const data = fs.readFileSync(ledgerPath, 'utf-8');
      const lines = data.split('\n').filter(Boolean);
      
      // Get last 20 transactions
      const recentLines = lines.slice(-20).reverse();
      
      recentLines.forEach((line, idx) => {
        try {
          const entry = JSON.parse(line);
          const type = (entry.type || entry.Type || 'ACTION').toUpperCase();
          const fee = type === 'ACTION' ? 0.01 : (type === 'PULSE' ? 0.001 : 0.00);
          
          transactions.push({
            id: `TX-${Math.floor(1000 + Math.random() * 9000)}-${idx}`,
            date: entry.timestamp ? new Date(entry.timestamp * 1000).toLocaleString() : 'Recent',
            type: type === 'ACTION' ? 'Action Resolution' : (type === 'PULSE' ? 'Network Pulse' : 'Verification'),
            amount: -fee,
            status: 'Settled',
            did: entry.did || 'did:sov:unknown'
          });
        } catch (e) {}
      });
    }

    // Add initial deposits if ledger is empty for flair
    if (transactions.length === 0) {
      transactions.push({ id: 'TX-PROT-001', date: 'Genesis', type: 'Trial Credit Allocation', amount: 10.00, status: 'Injected' });
      transactions.push({ id: 'TX-INIT-000', date: 'Genesis', type: 'Initial Protocol Identity', amount: 490.00, status: 'Confirmed' });
    }

    return NextResponse.json({ 
      success: true, 
      transactions 
    });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

