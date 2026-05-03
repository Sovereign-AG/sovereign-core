const fs = require('fs');
const path = require('path');

const ledgerPath = path.resolve(__dirname, '..', 'sovereign_ledger.ndjson');

function testRead() {
    console.log("Testing Tail-Stream Reader...");
    const stats = fs.statSync(ledgerPath);
    console.log(`Ledger Size: ${stats.size} bytes`);

    // Re-implementing the logic from db.ts for verification
    const readSize = Math.min(stats.size, 1024 * 1024); // 1MB tail buffer
    const buffer = Buffer.alloc(readSize);
    const fd = fs.openSync(ledgerPath, 'r');
    fs.readSync(fd, buffer, 0, readSize, Math.max(0, stats.size - readSize));
    fs.closeSync(fd);

    const tailData = buffer.toString('utf-8');
    const lines = tailData.split('\n').filter(l => l.trim());
    
    const usage_ledger = lines
        .map(line => {
            try { return JSON.parse(line); }
            catch (e) { return null; } // Skip corrupted lines
        })
        .filter(l => l !== null);

    console.log(`Parsed total: ${usage_ledger.length} entries.`);
    console.log(`Last Entry Agent: ${usage_ledger[usage_ledger.length - 1].agent_id}`);
    
    // Check for "FINAL-BOT" (the one after corruption)
    const finalEntry = usage_ledger[usage_ledger.length - 1];
    if (finalEntry.agent_id === "FINAL-BOT") {
        console.log("SUCCESS: Corruption skipped and final entry recovered.");
    } else {
        console.error("FAILED: Could not recover final entry.");
    }
}

testRead();
