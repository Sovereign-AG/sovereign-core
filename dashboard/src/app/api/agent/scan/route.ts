import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import crypto from 'crypto';

export async function GET() {
  // Simulate the "Shadow AI Scanner" pinging the network
  
  // Fake delay to simulate network scanning latency
  await new Promise(r => setTimeout(r, 2000));

  const endpoints = [
    { name: "Ollama", port: 11434, path: "/api/tags", alias: "Shadow_Local_Llama" },
    { name: "LM Studio", port: 1234, path: "/v1/models", alias: "Shadow_LM_Studio" },
    { name: "vLLM / Local OpenAI", port: 8000, path: "/v1/models", alias: "Shadow_vLLM_Node" }
  ];

  const foundShadowAgents: any[] = [];
  
  for (const ep of endpoints) {
    try {
      const res = await fetch(`http://127.0.0.1:${ep.port}${ep.path}`, { signal: AbortSignal.timeout(500) }).catch(() => null);
      if (res && res.ok) {
        foundShadowAgents.push({
          alias: ep.alias,
          port: ep.port,
          detected_traffic: "Active",
          risk: "High",
          reason: `Unauthorized ${ep.name} instance detected on port ${ep.port}.`
        });
      }
    } catch (e) {}
  }

  // Sync findings to DB
  const db = await readDB();
  if (!db.shadow_registry) db.shadow_registry = [];

  let newFound = false;
  for (const found of foundShadowAgents) {
    const exists = db.shadow_registry.find((s: any) => s.alias === found.alias);
    if (!exists) {
      db.shadow_registry.push({
        did: `did:sov:shadow-${crypto.randomBytes(6).toString('hex')}`,
        alias: found.alias,
        first_detected: new Date().toISOString(),
        signatures: Math.floor(Math.random() * 50) + 10,
        status: 'DISCOVERED',
        risk: 'High',
        reason: found.reason
      });
      newFound = true;
    }
  }

  if (newFound) {
    await writeDB(db);
  }

  return NextResponse.json({
    success: true,
    scanned_endpoints: endpoints.length,
    found_shadow_agents: db.shadow_registry
  });
}

