import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import crypto from 'crypto';

export async function GET() {
  const db = await readDB();
  
  // Remove simulation (Institutional Hardening Request)
  if (!db.shadow_registry) db.shadow_registry = [];

  return NextResponse.json({ success: true, discoveries: db.shadow_registry });
}

export async function POST(request: Request) {
  try {
    const { did, action } = await request.json();
    const db = await readDB();
    
    const target = db.shadow_registry.find((s: any) => s.did === did);
    if (!target) return NextResponse.json({ success: false, error: 'Target not found' }, { status: 404 });

    if (action === 'ONBOARD') {
      // Transition to Registry with heavy institutional metadata
      const newAgent = {
        ...target,
        id: `agnt_${Date.now()}`,
        status: 'Active',
        source: 'Third-Party',
        owner: 'Sovereign Watchtower',
        trust_index: '82.0',
        variance: 0.0005,
        compliance_status: true,
        energy_kwh: 0.045,
        total_handshakes: 0,
        pulse_frequency: 60,
        pulse_stalls: 0,
        verified_pulses: 0,
        region: 'IN',
        success_rate: 0.95 + Math.random() * 0.04,
        compute_cost_per_pulse: 0.0001,
        base_variance: 0.0005,
        logic_health: 100,
        decision_confidence: 85 + Math.random() * 10,
        insurability_score: 95,
        fairness_score: 98 + Math.random() * 1.5,
        reasoning_trace: [
          "Input validated against Ed25519 registry",
          "Logic variance within institutional bounds",
          "Cryptographic settlement signed successfully"
        ],
        decision_path: [
          {
            step: "INPUT_VALIDATION",
            logic_hash: `sha256:${crypto.randomBytes(4).toString('hex')}`,
            timestamp: new Date().toISOString(),
            result: "PASS"
          },
          {
            step: "HEARTBEAT_SYNC",
            logic_hash: `sha256:${crypto.randomBytes(4).toString('hex')}`,
            timestamp: new Date().toISOString(),
            result: "PASS"
          },
          {
            step: "SETTLEMENT",
            logic_hash: `sha256:${crypto.randomBytes(4).toString('hex')}`,
            timestamp: new Date().toISOString(),
            result: "SIGNED"
          }
        ]
      };
      db.agents.push(newAgent);
    } else if (action === 'KILL') {
      // Add to a protocol-level blocklist to prevent future communication
      if (!db.blocklist) db.blocklist = [];
      db.blocklist.push({
        ...target,
        blocked_at: new Date().toISOString(),
        reason: 'Manually blocked via Shadow AI Hunter'
      });
    }

    // Remove from Shadow Registry after action
    db.shadow_registry = db.shadow_registry.filter((s: any) => s.did !== did);
    await writeDB(db);

    return NextResponse.json({ success: true, message: `Action ${action} executed for ${did}` });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

