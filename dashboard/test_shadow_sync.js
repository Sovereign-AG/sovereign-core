const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dbPath = path.resolve(__dirname, '..', 'sovereign_db.json');

async function testScan() {
    console.log('Reading DB...');
    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    if (!db.shadow_registry) db.shadow_registry = [];
    
    const initialCount = db.shadow_registry.length;
    console.log(`Initial Shadow Agents: ${initialCount}`);
    
    // Mock found agents
    const mockFound = [
        { alias: 'Shadow_Local_Llama', reason: 'Unauthorized Ollama detected.' },
        { alias: 'Shadow_LM_Studio', reason: 'Unauthorized LM Studio detected.' }
    ];
    
    let added = 0;
    for (const found of mockFound) {
        const exists = db.shadow_registry.find(s => s.alias === found.alias);
        if (!exists) {
            db.shadow_registry.push({
                did: `did:sov:shadow-${crypto.randomBytes(6).toString('hex')}`,
                alias: found.alias,
                first_detected: new Date().toISOString(),
                signatures: 42,
                status: 'DISCOVERED',
                risk: 'High',
                reason: found.reason
            });
            added++;
        }
    }
    
    console.log(`Added ${added} new shadow agents.`);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    
    console.log('DB Updated.');
}

testScan().catch(console.error);
