const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.njk', '.html', '.json']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '_site', '.git', 'cache_media'].includes(file)) {
        results = results.concat(getFiles(fullPath, exts));
      }
    } else if (exts.includes(path.extname(file))) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getFiles('src');
console.log(`Scanning ${files.length} source files...`);

let missingAssets = [];
let checkedCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const assetMatches = [...content.matchAll(/["'](\/assets\/[^"'\s>]+)["']/g)].map(m => m[1]);
  for (const assetPath of assetMatches) {
    checkedCount++;
    const diskPath = path.join('src', assetPath);
    if (!fs.existsSync(diskPath)) {
      missingAssets.push({ file, assetPath, diskPath });
    }
  }
}

console.log(`Checked ${checkedCount} asset references across the website.`);
if (missingAssets.length === 0) {
  console.log('PERFECT! EXACTLY 0 MISSING ASSETS! ALL FILES EXIST ON DISK!');
} else {
  console.log(`FOUND ${missingAssets.length} missing assets:`);
  missingAssets.forEach(m => console.log(`  In ${m.file}: ${m.assetPath}`));
}

