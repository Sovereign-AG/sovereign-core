import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const sdkPath = path.join(process.cwd(), '..', 'src', 'sovereign_sdk.py');
  
  if (!fs.existsSync(sdkPath)) {
    return NextResponse.json({ error: "SDK source not found" }, { status: 404 });
  }

  const sdkContent = fs.readFileSync(sdkPath, 'utf8');

  return new NextResponse(sdkContent, {
    headers: {
      'Content-Type': 'text/x-python',
      'Content-Disposition': 'attachment; filename=sovereign_sdk.py',
    },
  });
}
