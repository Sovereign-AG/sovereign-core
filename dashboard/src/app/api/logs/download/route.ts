import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const ledgerPath = path.join(process.cwd(), '..', 'sovereign_ledger.ndjson');
  
  if (!fs.existsSync(ledgerPath)) {
    return NextResponse.json({ error: "Sovereign Ledger not found" }, { status: 404 });
  }

  const ledgerContent = fs.readFileSync(ledgerPath, 'utf8');

  return new NextResponse(ledgerContent, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Content-Disposition': 'attachment; filename=svtp_nist_audit_log.ndjson',
    },
  });
}

