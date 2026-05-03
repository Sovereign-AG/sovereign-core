const crypto = require('crypto');

function generateKey() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    // New logic
    const secretHash = crypto.randomBytes(16).toString('hex');
    const newKey = `sov_live_${secretHash}`;
    return newKey;
}

const keys = new Set();
const count = 1000;
for (let i = 0; i < count; i++) {
    const key = generateKey();
    if (keys.has(key)) {
        console.error('COLLISION DETECTED:', key);
        process.exit(1);
    }
    keys.add(key);
}

console.log(`Verified ${count} keys. No collisions detected.`);
console.log('Sample key:', generateKey());
