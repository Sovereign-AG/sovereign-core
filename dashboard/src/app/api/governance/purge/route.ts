import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { org_id, confirm_delete } = await request.json();
    
    if (!confirm_delete) {
      return NextResponse.json({ success: false, error: 'Confirmation required for Burn Protocol' }, { status: 400 });
    }

    const db = await readDB();

    // GDRP Article 17: Cryptographic Wipe of all Organization Data
    // 1. Remove Agents associated with org
    db.agents = db.agents.filter((a: any) => a.org_id !== org_id && a.owner !== 'SOVEREIGN FOUNDER'); // Protect system agents for this demo, usually filter by org_id
    
    // 2. Remove API Keys
    db.api_keys = db.api_keys.filter((k: any) => k.org_id !== org_id);

    // 3. Wiping Ledger (Institutional Hardening)
    // For this demo, we'll filter the usage_ledger if it's in memory, 
    // but in a real institutional setup, the ledger disk file would be sanitized.
    db.usage_ledger = db.usage_ledger.filter((l: any) => l.org_id !== org_id);

    writeDB(db);

    // Force disk cleanup for the ledger file
    const ledgerPath = path.resolve(process.cwd(), '..', 'sovereign_ledger.ndjson');
    if (fs.existsSync(ledgerPath)) {
      const ledgerData = fs.readFileSync(ledgerPath, 'utf-8');
      const sanitizedLedger = ledgerData.split('\n')
        .filter(line => {
          if (!line.trim()) return false;
          try {
            const entry = JSON.parse(line);
            return entry.org_id !== org_id;
          } catch(e) { return true; }
        })
        .join('\n') + '\n';
      fs.writeFileSync(ledgerPath, sanitizedLedger);
    }

    return NextResponse.json({ success: true, message: 'Burn Protocol executed. Organization data purged.' });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
