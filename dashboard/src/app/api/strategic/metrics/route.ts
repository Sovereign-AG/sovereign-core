import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();
    const GRID_EMISSION_FACTOR = 0.4; // kgCO2/kWh
    const STANDARD_TASK_DURATION = 1.5; // Hours

    let totalEnergyKwh = 0;
    let totalHandshakes = 0;
    let totalVerifiedPulses = 0;
    let stalledAgentsCount = 0;

    let vendorVariances: Record<string, number> = {
      'Internal': 0,
      'Partner': 0,
      'Third-Party': 0
    };
    
    let vendorCounts: Record<string, number> = {
      'Internal': 0,
      'Partner': 0,
      'Third-Party': 0
    };

    db.agents.forEach((ag: any) => {
      // ESG
      totalEnergyKwh += Number(ag.energy_kwh || 0);
      totalHandshakes += Number(ag.total_handshakes || 0);
      
      // Handover Radar
      totalVerifiedPulses += Number(ag.verified_pulses || 0);
      if (Number(ag.pulse_stalls || 0) > 5) { // Arbitrary stall limit
        stalledAgentsCount += 1;
      }

      // Chain of trust tracking
      if (vendorVariances[ag.source] !== undefined) {
        vendorVariances[ag.source] += Number(ag.variance || 0);
        vendorCounts[ag.source] += 1;
      }
    });

    const safeHandshakes = Math.max(1, totalHandshakes); // prevent Zero Division 
    const carbonIntensity = (totalEnergyKwh / safeHandshakes) * GRID_EMISSION_FACTOR;
    const hoursReclaimed = totalVerifiedPulses * STANDARD_TASK_DURATION;

    // Evaluate Auto-Quarantine Warnings
    const quarantines = [];
    for (const source in vendorVariances) {
      if (vendorCounts[source] > 0) {
         const avgVariance = vendorVariances[source] / vendorCounts[source];
         if (avgVariance > 0.0005) {
           quarantines.push({ source, avgVariance, status: 'EXCEEDED_THRESHOLD_QUARANTINE_ARMED' });
         }
      }
    }

    return NextResponse.json({
      success: true,
      carbon_intensity: carbonIntensity,
      hours_reclaimed: hoursReclaimed,
      stalled_agents: stalledAgentsCount,
      quarantine_flags: quarantines,
      vendor_variances: vendorVariances
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
