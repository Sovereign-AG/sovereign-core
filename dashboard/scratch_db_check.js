const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(process.cwd(), '..', 'sovereign_db.json');
console.log('CWD:', process.cwd());
console.log('Resolved dbPath:', dbPath);
console.log('Exists:', fs.existsSync(dbPath));

if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const db = JSON.parse(data);
    console.log('API Keys count:', db.api_keys ? db.api_keys.length : 'undefined');
    if (db.api_keys) {
        console.log('API Keys:', JSON.stringify(db.api_keys, null, 2));
    }
}
