import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'sovereign_db.json');
const ledgerPath = path.join(process.cwd(), 'sovereign_ledger.ndjson');

let cachedDB: any = null;
let lastCacheTime = 0;
const CACHE_TTL = 3000; // 3 seconds cache for peak institutional performance

export async function readDB() {
  const now = Date.now();
  if (cachedDB && (now - lastCacheTime < CACHE_TTL)) {
    return cachedDB;
  }

  if (!fs.existsSync(dbPath)) return { organizations: [], agents: [], api_keys: [], pricing_rules: [], usage_ledger: [] };
  
  try {
    const data = await fs.promises.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);
    
    // Normalize Agent Registry (Merge Python and Next schema)
    const pythonAgents = db.registered_agents || [];
    const nextAgents = db.agents || [];
    db.agents = [...nextAgents];
    
    pythonAgents.forEach((pa: any) => {
      if (!db.agents.find((na: any) => na.did === pa.did)) {
        db.agents.push({
          ...pa,
          alias: pa.alias || pa.did.split(':').pop()?.substring(0, 8),
          trust_index: pa.trust_score || "98.5",
          liability_limit: pa.liability_limit || "$1.0M",
          owner: pa.owner || "Genesis Sovereign",
          cpu: pa.cpu || "4%",
          status: pa.status || "Active"
        });
      }
    });

    // High-performance Ledger streaming
    if (fs.existsSync(ledgerPath)) {
      const ledgerData = await fs.promises.readFile(ledgerPath, 'utf-8');
      db.usage_ledger = ledgerData
        .split('\n')
        .filter(line => line.trim())
        .map(line => {
          try {
            return JSON.parse(line);
          } catch (e) {
            return null;
          }
        })
        .filter((entry: any) => entry !== null);
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

export function writeDB(data: any) {
  // Extract ledger to prevent monolithic writes
  const { usage_ledger, ...coreData } = data;
  fs.writeFileSync(dbPath, JSON.stringify(coreData, null, 2));

  // Ledger is usually handled by appendToLedger, but as a fallback for full sync:
  if (usage_ledger && usage_ledger.length > 0) {
    const ndjsonData = usage_ledger.map((e: any) => JSON.stringify(e)).join('\n') + '\n';
    fs.writeFileSync(ledgerPath, ndjsonData);
  }
}

/**
 * Institutional Scaling Logic: Append-only NDJSON logging for zero-latency minting.
 */
export function appendToLedger(entry: any) {
  const line = JSON.stringify({
    ...entry,
    id: entry.id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: entry.timestamp || new Date().toISOString()
  });
  fs.appendFileSync(ledgerPath, line + '\n');
}
