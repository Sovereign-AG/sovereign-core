const fs = require('fs');
const path = require('path');

const ledgerPath = path.resolve(__dirname, '..', 'sovereign_ledger.ndjson');

function simulate() {
    console.log("Simulating High-Volume Ledger...");
    
    // 1. Create a large-ish ledger with some corruption
    const stream = fs.createWriteStream(ledgerPath, { flags: 'w' });
    for (let i = 0; i < 5000; i++) {
        stream.write(JSON.stringify({
            timestamp: Date.now(),
            agent_id: "TEST-BOT",
            action: "PULSE",
            metadata: { i }
        }) + "\n");
    }
    
    // Insert a corrupted line
    stream.write('{"timestamp": 123, "corrupted": true, "missing_quote: "no"}\n');
    
    // Add one last valid entry
    stream.write(JSON.stringify({
        timestamp: Date.now(),
        agent_id: "FINAL-BOT",
        action: "PULSE",
        metadata: { status: "OK" }
    }) + "\n");
    
    stream.end();
    console.log("Draft Ledger Created.");
}

simulate();
