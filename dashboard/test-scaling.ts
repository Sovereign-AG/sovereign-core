import { readDB, writeDB } from './src/lib/db';
import fs from 'fs';
import path from 'path';

async function testScaling() {
    console.log("Starting Scaling Test...");
    const db = await readDB();
    const initialSize = fs.statSync(path.resolve(process.cwd(), '..', 'sovereign_db.json')).size;
    console.log(`Initial DB Size: ${initialSize} bytes`);

    // Mock 100 new agents (mini bulk)
    for (let i = 0; i < 100; i++) {
        db.agents.push({ id: `test_${i}`, did: `did:sov:test_${i}`, status: 'Active' });
    }

    console.log("Writing minified DB...");
    const start = Date.now();
    writeDB(db);
    const end = Date.now();
    
    const finalSize = fs.statSync(path.resolve(process.cwd(), '..', 'sovereign_db.json')).size;
    console.log(`Final DB Size: ${finalSize} bytes`);
    console.log(`Write Time: ${end - start}ms`);
    
    // Check if minified (no newlines/spaces)
    const content = fs.readFileSync(path.resolve(process.cwd(), '..', 'sovereign_db.json'), 'utf-8');
    if (content.includes('\n')) {
        console.error("FAILED: DB is still pretty-printed (contains newlines)");
    } else {
        console.log("SUCCESS: DB is minified.");
    }
}

testScaling();
