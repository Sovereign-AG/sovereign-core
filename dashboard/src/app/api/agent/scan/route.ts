import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import crypto from 'crypto';

export async function GET() {
  // Simulate the "Shadow AI Scanner" pinging the network
  // In a real environment, this might run nmap or fetch internal metrics.
  
  // Fake delay to simulate network scanning
  await new Promise(r => setTimeout(r, 1500));

  const foundShadowAgents: any[] = [];
  
  // 1. Detect Shadow LLM (Ollama)
  try {
    const ollamaRes = await fetch('http://127.0.0.1:11434/api/tags').catch(() => null);
    if (ollamaRes && ollamaRes.ok) {
      foundShadowAgents.push({
        alias: "Shadow_Local_Llama",
        port: 11434,
        detected_traffic: "Active",
        risk: "High",
        reason: "Unauthorized local LLM (Ollama) detected on default port."
      });
    }
  } catch (e) {}

  // 2. Check for Shadow Registry persistence and sync new findings
  const db = await readDB();
  if (!db.shadow_registry) db.shadow_registry = [];

  // Sync Ollama finding to DB if not present
  if (foundShadowAgents.length > 0) {
    const ollama = foundShadowAgents[0];
    const exists = db .shadow_registry.find((s: any) => s.alias === ollama.alias);
    if (!exists) {
      db.shadow_registry.push({
        did: `did:sov:ollama-${crypto.randomBytes(4).toString('hex')}`,
        alias: ollama.alias,
        first_detected: new Date().toISOString(),
        signatures: 1, // Artificial for tracking
        status: 'DISCOVERED'
      });
      await writeDB(db);
    }
  }

  return NextResponse.json({
    success: true,
    scanned_endpoints: foundShadowAgents.length > 0 ? 1 : 0,
    found_shadow_agents: db.shadow_registry // Return from DB for consistency
  });
}
