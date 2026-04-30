import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), '..', 'sovereign_db.json');
const ledgerPath = path.resolve(process.cwd(), '..', 'sovereign_ledger.ndjson');

let cachedDB: any = null;
let lastCacheTime = 0;
const CACHE_TTL = 500; // 500ms for high-frequency financial data synchronization

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
    if (!db.organizations) db.organizations = [{ id: 'sovereign-org', unbilled_assessments: 0.00, settlement_threshold: 1000.00 }];
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
      trust_index: agent.trust_index || "98.5",
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
    actor: 'Sovereign AG Protocol',
    id: entry.id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: entry.timestamp || new Date().toISOString()
  });
  fs.appendFileSync(ledgerPath, line + '\n');
}

/**
 * Institutional Billing Engine: Accrues unbilled assessments in real-time.
 * Returns { success: boolean, unbilled: number, status: 'OK' | 'THRESHOLD_HALT' }
 */
export async function accrueAssessment(orgId: string, amount: number) {
  const db = await readDB();
  const org = db.organizations.find((o: any) => o.id === orgId);
  if (!org) return { success: false, error: 'ORG_NOT_FOUND' };

  const threshold = org.settlement_threshold || 1000.00;
  const currentUnbilled = org.unbilled_assessments || 0;
  const newUnbilled = currentUnbilled + amount;

  if (newUnbilled >= threshold) {
     // THRESHOLD ENGAGEMENT: Logic should still allow the accrual but the SDK will check this status.
     // In a fail-closed model, we might block further actions if debt is too high.
     org.unbilled_assessments = newUnbilled;
     await writeDB(db);
     return { success: true, unbilled: newUnbilled, status: 'THRESHOLD_HALT' };
  }

  // MINT TAX EXEMPTION FOR FIRST 5 AGENTS
  let finalAmount = amount;
  if (amount >= 1.00 && org.free_agent_slots > 0) {
      org.free_agent_slots -= 1;
      finalAmount = 0;
      console.log(`[GENESIS_SUBSIDY] Exempted Mint Tax. Slots remaining: ${org.free_agent_slots}`);
  }

  org.unbilled_assessments = (org.unbilled_assessments || 0) + finalAmount;
  await writeDB(db);
  return { success: true, unbilled: org.unbilled_assessments, status: 'OK' };
}

/**
 * Automated Settlement Engine: Triggers NexaPay charges.
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
