import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), '..', 'sovereign_revenue.json');
    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ 
            total_revenue: 0, 
            breakdown: { mint: 0, pulse: 0, action: 0 } 
        });
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Revenue data unavailable' }, { status: 500 });
  }
}

