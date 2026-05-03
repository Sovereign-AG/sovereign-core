import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await readDB();
    const dbPath = path.resolve(process.cwd(), '..', 'sovereign_db.json');
    const exists = fs.existsSync(dbPath);
    let rawContent = '';
    if (exists) {
      rawContent = fs.readFileSync(dbPath, 'utf-8');
    }
    
    return NextResponse.json({ 
      success: true, 
      cwd: process.cwd(),
      dbPath: dbPath,
      exists: exists,
      rawContent: rawContent.substring(0, 500) + '...', // Just the start
      dbObject: {
        orgs: db.organizations,
        agentsCount: db.agents?.length
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

