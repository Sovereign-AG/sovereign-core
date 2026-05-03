import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), '..', 'SVTP_db.json');
const ledgerPath = path.resolve(process.cwd(), '..', 'SVTP_ledger.ndjson');

let cachedDB: any = null;
let lastCacheTime = 0;
const CACHE_TTL = 500; // 500ms for high-frequency financial data synchronization

// GLOBAL PRICING STANDARD - IMMUTABLE (VALUES IN CENTS)
const PRICING_STANDARD = {
  MINT: 100,      // $1.00
  ACTION: 1,      // $0.01
  PULSE: 0.01     // $0.0001
};

// Global serialization lock for atomic writes
let isWriting = false;
const writeQueue: Array<(v: any) => void> = [];

async function acquireLock() {
  if (!isWriting) {
    isWriting = true;
    return;
  }
  return new Promise(resolve => writeQueue.push(resolve));
}

function releaseLock() {
  const next = writeQueue.shift();
  if (next) {
    next(true);
  } else {
    isWriting = false;
  }
}

export async function readDB() {
  const now = Date.now();
  if (cachedDB && (now - lastCacheTime < CACHE_TTL)) {
    return cachedDB;
  }

  if (!fs.existsSync(dbPath)) return { organizations: [], agents: [], api_keys: [], pricing_rules: [], usage_ledger: [] };
  
  try {
    const data = await fs.promises.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);
    
    // ENSURE INSTITUTIONAL DEFAULTS
    if (!db.organizations) db.organizations = [{ id: 'SVTP-org', unbilled_assessments: 0.00, settlement_threshold: 1000.00 }];
    db.organizations = db.organizations.map((org: any) => ({
      ...org,
      unbilled_assessments: org.unbilled_assessments ?? 0.00,
      settlement_threshold: org.settlement_threshold ?? 1000.00,
      total_verifications: org.total_verifications ?? 0,
      billing_cycle_start: org.billing_cycle_start ?? new Date().toISOString(),
      free_agent_slots: org.free_agent_slots ?? 5
    }));
    if (!db.agents) db.agents = [];
    if (!db.shadow_registry) db.shadow_registry = [];
    if (!db.users) db.users = [
      { email: 'adityagawand79@gmail.com', role: 'SUPER_ADMIN', org_id: 'SVTP-org' },
      { email: 'office.sovereign.ag@gmail.com', role: 'SUPER_ADMIN', org_id: 'GLOBAL_ADMIN' }
    ];
    if (!db.pricing_rules) db.pricing_rules = [
      { event_type: 'MINT', cost: 1.00 },
      { event_type: 'ACTION', cost: 0.01 },
      { event_type: 'PULSE', cost: 0.001 }
    ];
    
    // Normalize Agent Registry
    if (!db.agents) db.agents = [];
    if (!db.shadow_registry) db.shadow_registry = [];
    
    db.agents = db.agents.map((agent: any) => ({
      ...agent,
      trust_score: agent.trust_score || parseFloat(agent.trust_index || "98.5"),
      trust_index: agent.trust_index || (agent.trust_score ? agent.trust_score.toString() : "98.5"),
      status: agent.status || "Active"
    }));

    // Tail-read logic for usage_ledger
    if (fs.existsSync(ledgerPath)) {
        const stats = fs.statSync(ledgerPath);
        const readSize = Math.min(stats.size, 1024 * 1024);
        const buffer = Buffer.alloc(readSize);
        const fd = fs.openSync(ledgerPath, 'r');
        fs.readSync(fd, buffer, 0, readSize, Math.max(0, stats.size - readSize));
        fs.closeSync(fd);

        const lines = buffer.toString('utf-8').split('\n').filter(l => l.trim());
        db.usage_ledger = lines.map(l => { try { return JSON.parse(l); } catch(e) { return null; }})
                            .filter(Boolean).reverse().slice(0, 1000);
    } else {
        db.usage_ledger = [];
    }

    cachedDB = db;
    lastCacheTime = now;
    return db;
  } catch (err) {
    return cachedDB || { organizations: [], agents: [], api_keys: [], pricing_rules: [], usage_ledger: [] };
  }
}

export async function writeDB(data: any) {
  await acquireLock();
  try {
    const { usage_ledger, ...coreData } = data;
    await fs.promises.writeFile(dbPath, JSON.stringify(coreData, null, 2));
    cachedDB = data;
    lastCacheTime = Date.now();
  } finally {
    releaseLock();
  }
}

export function appendToLedger(entry: any) {
  const line = JSON.stringify({
    ...entry,
    actor: 'SVTP Root Authority',
    id: entry.id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: entry.timestamp || new Date().toISOString()
  });
  fs.appendFileSync(ledgerPath, line + '\n');
}

/**
 * Institutional Billing Engine: Accrues unbilled assessments in real-time.
 * Uses integer-based math (cents) to ensure Root of Trust precision.
 */
export async function accrueAssessment(orgId: string, type: 'MINT' | 'ACTION' | 'PULSE', count: number = 1) {
  const db = await readDB();
  const org = db.organizations.find((o: any) => o.id === orgId);
  if (!org) return { success: false, error: 'ORG_NOT_FOUND' };

  const rateCents = PRICING_STANDARD[type] || 0;
  const finalAmountCents = Math.round(rateCents * count);

  const threshold = (org.settlement_threshold || 1000.00) * 100;
  const currentUnbilledCents = Math.round((org.unbilled_assessments || 0) * 100);
  const newUnbilledCents = currentUnbilledCents + finalAmountCents;

  org.unbilled_assessments = newUnbilledCents / 100;
  if (type === 'ACTION' || type === 'PULSE') {
    org.total_verifications = (org.total_verifications || 0) + count;
  }
  
  if (newUnbilledCents >= threshold) {
     await writeDB(db);
     return { success: true, unbilled: org.unbilled_assessments, status: 'THRESHOLD_HALT' };
  }

  await writeDB(db);
  return { success: true, unbilled: org.unbilled_assessments, status: 'OK' };
}

/**
 * Automated Settlement Engine: Triggers Institutional Settlement via Dodo Payments.
 */
export async function performSettlement(orgId: string) {
  const db = await readDB();
  const org = db.organizations.find((o: any) => o.id === orgId);
  if (!org || (org.unbilled_assessments || 0) <= 0) return { success: false };

  const amountToCharge = org.unbilled_assessments;
  console.log(`[SETTLEMENT_ENGINE] Initiating Institutional Charge: ${amountToCharge} USD for ${orgId}`);

  // In production: await nexaPay.charge(org.settlement_source, amountToCharge);
  
  org.unbilled_assessments = 0;
  org.last_settlement_date = new Date().toISOString();
  await writeDB(db);

  return { success: true, amount: amountToCharge };
}

export async function refillBalance(orgId: string, amount: number) {
  const db = await readDB();
  const org = db.organizations.find((o: any) => o.id === orgId);
  if (!org) return { success: false, error: 'ORG_NOT_FOUND' };
  
  org.balance = (org.balance || 0) + amount;
  await writeDB(db);
  return { success: true, balance: org.balance, newBalance: org.balance };
}

export async function bulkRegisterAgents(orgId: string, agents: any[]) {
  const db = await readDB();
  const org = db.organizations.find((o: any) => o.id === orgId);
  if (!org) return { success: false, error: 'ORG_NOT_FOUND' };

  // SVTP-ISSUANCE: Formalize identities through the Root of Trust
  const { SVTP } = require('./SVTP');
  
  const formalizedAgents = agents.map(agent => {
     const identity = SVTP.issuePassport(orgId, agent.capabilities || ['GENERAL_AGENCY']);
     return {
        ...agent,
        ...identity, // Standardized SVTP Identity
        status: 'Active',
        trust_index: '98.5',
        minted_at: new Date().toISOString()
     };
  });

  // Enforce Standard Minting Tax with Subsidy Awareness
  let agentsToCharge = formalizedAgents.length;
  const availableSubsidy = org.free_agent_slots || 0;
  
  if (availableSubsidy > 0) {
    const consumption = Math.min(agentsToCharge, availableSubsidy);
    org.free_agent_slots = availableSubsidy - consumption;
    agentsToCharge -= consumption;
  }

  const totalMintTaxCents = agentsToCharge * PRICING_STANDARD.MINT;
  const currentUnbilledCents = Math.round((org.unbilled_assessments || 0) * 100);
  org.unbilled_assessments = (currentUnbilledCents + totalMintTaxCents) / 100;

  // Bulk Append Formalized Agents
  db.agents.push(...formalizedAgents);

  await writeDB(db);
  return { success: true, count: formalizedAgents.length, newTotalUnbilled: org.unbilled_assessments };
}

export async function updateAgentMetrics(agentId: string, metrics: { latency?: number; hash?: string }) {
  const db = await readDB();
  const agent = db.agents.find((a: any) => a.did === agentId || a.id === agentId);
  if (agent) {
    if (metrics.latency) agent.last_latency = metrics.latency;
    if (metrics.hash) agent.last_hash = metrics.hash;
    agent.last_active = new Date().toISOString();
    await writeDB(db);
  }
}

// --- GOVERNANCE & COMPLIANCE ---

export async function createComplianceRequest(request: {
  agentId: string;
  orgId: string;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  description: string;
  metadata?: any;
}) {
  const db = await readDB();
  const newRequest = {
    id: `REQ_${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
    status: 'PENDING',
    timestamp: new Date().toISOString(),
    ...request
  };
  
  if (!db.compliance_requests) db.compliance_requests = [];
  db.compliance_requests.push(newRequest);
  await writeDB(db);
  return newRequest;
}

export async function getPendingRequests(orgId?: string) {
  const db = await readDB();
  const requests = db.compliance_requests || [];
  if (orgId) {
    return requests.filter((r: any) => r.orgId === orgId && r.status === 'PENDING');
  }
  return requests.filter((r: any) => r.status === 'PENDING');
}

export async function processRequest(requestId: string, decision: 'APPROVED' | 'REJECTED') {
  const db = await readDB();
  const request = db.compliance_requests?.find((r: any) => r.id === requestId);
  if (request) {
    request.status = decision;
    request.processedAt = new Date().toISOString();
    await writeDB(db);
    return true;
  }
  return false;
}

/**
 * RBAC & Tenant Resolution
 */
export async function getUserByEmail(email: string) {
  const db = await readDB();
  if (!db.users) return null;
  return db.users.find((u: any) => u.email === email) || null;
}

export async function getAgentsByOrg(orgId: string) {
  const db = await readDB();
  if (orgId === 'GLOBAL_ADMIN') return db.agents;
  return db.agents.filter((a: any) => a.org_id === orgId);
}


// Background Worker: Sunday 23:59 IST & Threshold Monitoring
if (typeof setInterval !== 'undefined') {
  setInterval(async () => {
    const db = await readDB();
    const now = new Date();
    
    // Check for Sunday at 23:59 IST (approximate for local env)
    const isSunday = now.getDay() === 0;
    const isLateNight = now.getHours() === 23 && now.getMinutes() >= 58;

    for (const org of db.organizations) {
      const threshold = org.settlement_threshold || 1000.00;
      const unbilled = org.unbilled_assessments || 0;

      if (unbilled >= threshold || (isSunday && isLateNight)) {
        console.log(`[SETTLEMENT_ENGINE] Automatic Trigger: ${org.id} (Type: ${unbilled >= threshold ? 'THRESHOLD' : 'SCHEDULE'})`);
        await performSettlement(org.id);
      }
    }
  }, 60000); // Check every minute
}

