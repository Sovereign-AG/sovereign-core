import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Point to the actual Sovereign SDK core implementation
  const sdkPath = path.join(process.cwd(), '..', 'sdk', 'python', 'sovereign_agent', 'core.py');
  
  if (!fs.existsSync(sdkPath)) {
    return NextResponse.json({ error: "Sovereign SDK Core not found at " + sdkPath }, { status: 404 });
  }

  const sdkContent = fs.readFileSync(sdkPath, 'utf8');

  return new NextResponse(sdkContent, {
    headers: {
      'Content-Type': 'text/x-python',
      'Content-Disposition': 'attachment; filename=sovereign_sdk_v0.1.0.py',
    },
  });
}
