import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();
    return NextResponse.json({ success: true, agents: db.agents });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
