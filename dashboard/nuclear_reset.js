const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'sovereign_db.json');
const ledgerPath = path.join(__dirname, 'sovereign_ledger.ndjson');

async function nuclearReset() {
    console.log("INITIATING ZERO-POINT RESET...");
    
    // 1. Wipe Ledger File
    if (fs.existsSync(ledgerPath)) {
        fs.unlinkSync(ledgerPath);
        console.log("[-] Ledger File Deleted.");
    }

    // 2. Read and Truncate DB
    if (fs.existsSync(dbPath)) {
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        
        console.log(`[-] Truncating ${data.agents?.length || 0} Agents.`);
        data.agents = [];
        data.registered_agents = [];
        data.usage_ledger = [];
        data.protocol_mode = "GROWTH";
        data.global_agent_count = 0;

        // 3. Identity Preservation (Keep Users, Clear DIDs)
        if (data.users) {
            console.log(`[-] Clearing DIDs for ${data.users.length} Users.`);
            data.users = data.users.map((u) => ({
                ...u,
                did: null,
                agent_id: null
            }));
        }

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        console.log("[+] Database Truncated. Protocol State: GROWTH.");
    }

    console.log("[SUCCESS] RESET COMPLETE. SYSTEM READY FOR AGENT #001.");
}

nuclearReset();
