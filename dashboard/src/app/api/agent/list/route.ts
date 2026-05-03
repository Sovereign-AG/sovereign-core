import { NextResponse } from 'next/server';
import { readDB, getUserByEmail, getAgentsByOrg } from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    const db = await readDB();
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    
    // Multi-Tenant Identity Resolution
    const email = session?.user?.email || "adityagawand79@gmail.com"; 
    const user = await getUserByEmail(email);
    
    // Architect/Founder Bypass
    const isArchitect = email === "office.sovereign.ag@gmail.com" || (user && user.role === 'SUPER_ADMIN');
    
    let filteredAgents;
    if (isArchitect) {
        filteredAgents = await getAgentsByOrg('GLOBAL_ADMIN');
    } else if (user) {
        filteredAgents = await getAgentsByOrg(user.org_id);
    } else {
        return NextResponse.json({ success: false, error: 'IDENTITY_NOT_FOUND' }, { status: 403 });
    }

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

