import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDB();
    const verifiedOrgs = db.organizations ? db.organizations.length : 0;
    
    // Sum up total verifications across all organizations
    const totalVerifications = db.organizations ? db.organizations.reduce((acc: number, org: any) => acc + (org.total_verifications || 0), 0) : 0;
    const usageLedgerCount = db.usage_ledger ? db.usage_ledger.length : 0;
    
    // Revenue Calculation Engine (Genesis Grant Evolution)
    const usageLedger = db.usage_ledger || [];
    const potentialYield = usageLedger.reduce((acc: number, entry: any) => acc + (entry.fee || 0), 0);
    const realizedRevenue = usageLedger.filter((entry: any) => !entry.grant_subsidized).reduce((acc: number, entry: any) => acc + (entry.fee || 0), 0);
    
    // Liability Mitigation Logic: $0.01 Action Tax = $12.50 Risk Protection
    const actionTaxCount = usageLedger.filter((e: any) => e.fee === 0.01).length;
    const liabilityMitigated = actionTaxCount * 12.5;

    // Projection Logic: Scale last 24h to 30 days
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last24hRevenue = usageLedger
      .filter((e: any) => new Date(e.timestamp) > oneDayAgo)
      .reduce((acc: number, e: any) => acc + (e.fee || 0), 0);
    
    const projectedMonthlyRevenue = last24hRevenue > 0 ? last24hRevenue * 30 : potentialYield * 5; 

    return NextResponse.json({ 
      success: true, 
      verifiedOrgs,
      totalVerifications,
      usageLedgerCount,
      totalRevenue: potentialYield, // Renamed in UI to Potential Yield
      realizedRevenue,
      liabilityMitigated,
      projectedMonthlyRevenue
    });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
