import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const db = await readDB();
    const { searchParams } = new URL(req.url);
    const did = searchParams.get('did');

    if (did) {
        const agent = db.agents.find((ag: any) => ag.did === did);
        if (!agent) return NextResponse.json({ success: false, message: 'Agent not found' }, { status: 404 });

        // Quality-Adjusted Cost per Task
        const qac = (agent.compute_cost_per_pulse || 0.0001) / (agent.success_rate || 0.99);
        
        // Cognitive Stability Index (CSI)
        const varianceIncrease = ((agent.variance || 0) - (agent.base_variance || 0));
        const csiDivergence = agent.base_variance > 0 ? (varianceIncrease / agent.base_variance) * 100 : 0;
        
        return NextResponse.json({
            success: true,
            did,
            qac,
            csi_divergence: csiDivergence,
            logic_health: agent.logic_health,
            decision_path: agent.decision_path,
            recommendation: qac > 0.0015 || agent.success_rate < 0.7 ? 'MODEL_DOWNGRADE_REQUIRED' : 'OPTIMAL',
            stability_alert: csiDivergence > 5 ? 'RETRAINING_REQUIRED' : 'STABLE'
        });
    }

    // Aggregate Enterprise Metrics
    let totalQAC = 0;
    let totalCSI = 0;
    let downgradeCount = 0;
    let retrainingCount = 0;

    db.agents.forEach((ag: any) => {
        const qac = (ag.compute_cost_per_pulse || 0.0001) / (ag.success_rate || 0.99);
        totalQAC += qac;
        
        const varianceIncrease = ((ag.variance || 0) - (ag.base_variance || 0));
        const csiDivergence = ag.base_variance > 0 ? (varianceIncrease / ag.base_variance) * 100 : 0;
        totalCSI += csiDivergence;

        if (qac > 0.0015 || ag.success_rate < 0.7) downgradeCount++;
        if (csiDivergence > 5) retrainingCount++;
    });

    return NextResponse.json({
        success: true,
        avg_qac: totalQAC / (db.agents.length || 1),
        avg_csi_divergence: totalCSI / (db.agents.length || 1),
        downgrade_recommendations: downgradeCount,
        retraining_alerts: retrainingCount
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

