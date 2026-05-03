const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/SATP/g, 'SVTP');
    content = content.replace(/satp/g, 'svtp');
    content = content.replace(/Sovereign Autonomous Trust Protocol/g, 'Sovereign Verification & Trust Protocol');
    fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.md')) {
            replaceInFile(filePath);
        }
    }
}

walkDir('./src');
walkDir('./public');
if (fs.existsSync('./SVTPSchema.json')) replaceInFile('./SVTPSchema.json');
if (fs.existsSync('./package.json')) replaceInFile('./package.json');
if (fs.existsSync('./README.md')) replaceInFile('./README.md');

console.log('Rebrand complete.');
