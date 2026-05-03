import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET() {
  const db = await readDB();
  return NextResponse.json({
    success: true,
    branding: db.branding || { logo_url: '', brand_color: '#0EA5E9', company_name: 'Sovereign AG' },
    governance: db.governance || { variance_threshold: 0.0005, tfa_active_for_revocation: false },
    integrations: db.integrations || { mcp_bridge: { active: true, protocol_version: 'v1.2', alignment: 'NIST-CAISI' } }
  });
}

export async function POST(request: Request) {
  try {
    const { branding, governance, integrations } = await request.json();
    const db = await readDB();

    if (branding) db.branding = { ...db.branding, ...branding };
    if (governance) db.governance = { ...db.governance, ...governance };
    if (integrations) db.integrations = { ...db.integrations, ...integrations };

    writeDB(db);

    return NextResponse.json({ 
      success: true, 
      branding: db.branding, 
      governance: db.governance,
      integrations: db.integrations 
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

