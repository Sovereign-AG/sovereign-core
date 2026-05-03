const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'sovereign_db.json');

function migrate() {
    console.log("Starting Migration...");
    if (!fs.existsSync(dbPath)) {
        console.error("DB Not Found at", dbPath);
        return;
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);
    
    console.log("Minifying...");
    const minified = JSON.stringify(db);
    fs.writeFileSync(dbPath, minified);
    
    console.log("Migration Complete.");
    const newSize = fs.statSync(dbPath).size;
    console.log(`New DB Size: ${newSize} bytes`);
}

migrate();
