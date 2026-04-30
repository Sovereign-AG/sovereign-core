import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    const db = await readDB();
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    // Privacy Shield & Session Persistence
    const email = session?.user?.email || "adityagawand79@gmail.com"; // Fallback for owner persistence
    const isArchitect = email === "office.sovereign.ag@gmail.com";
    
    const filteredAgents = db.agents.filter((a: any) => 
      isArchitect || 
      a.owner?.toLowerCase() === email.toLowerCase() || 
      a.owner === 'SOVEREIGN FOUNDER'
    );

    const paginatedAgents = filteredAgents.slice(offset, offset + limit);

    return NextResponse.json({ 
      success: true, 
      agents: paginatedAgents,
      total: filteredAgents.length,
      limit,
      offset
    });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
