import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  const db = await readDB();
  
  // Scoring Criteria:
  // 1. Fleet Uptime (30%): Simulated based on last variance
  // 2. Zero-Variance Continuity (50%): Aggregate variance across fleet
  // 3. Revocation Efficiency (20%): Response time to bad actors (simulated)

  const activeAgents = db.agents.filter((a: any) => a.status === 'Active');
  if (activeAgents.length === 0) return NextResponse.json({ success: true, score: 0 });

  const avgVariance = activeAgents.reduce((acc: number, cur: any) => acc + (cur.variance || 0), 0) / activeAgents.length;
  
  // Uptime (Max 30) - Inverse of variance drift
  const uptimeScore = Math.max(0, 30 - (avgVariance * 1000));
  
  // Continuity (Max 50) - Consistency of success rate
  const successAvg = activeAgents.reduce((acc: number, cur: any) => acc + (cur.success_rate || 0.99), 0) / activeAgents.length;
  const continuityScore = successAvg * 50;

  // Revocation (Max 20) - Mock efficiency
  const revocationScore = 19.5; 

  const totalScore = Math.min(100, uptimeScore + continuityScore + revocationScore);

  return NextResponse.json({
    success: true,
    insurability_score: totalScore.toFixed(1),
    metrics: {
      uptime_reliability: uptimeScore.toFixed(2),
      variance_continuity: continuityScore.toFixed(2),
      revocation_efficiency: revocationScore.toFixed(2)
    },
    certification_id: `SOV-INSR-${Buffer.from(totalScore.toString()).toString('hex').substring(0,8).toUpperCase()}`,
    last_audit: new Date().toISOString()
  });
}
