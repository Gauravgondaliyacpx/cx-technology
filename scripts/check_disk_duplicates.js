const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results = results.concat(getFiles(fullPath));
    else results.push(fullPath);
  }
  return results;
}

function analyzeDuplicates(files, label) {
  const hashes = {};
  for (const f of files) {
    const buf = fs.readFileSync(f);
    const hash = crypto.createHash('md5').update(buf).digest('hex');
    if (!hashes[hash]) hashes[hash] = [];
    hashes[hash].push(f);
  }
  const duplicateGroups = Object.values(hashes).filter(group => group.length > 1);
  console.log(`=== ${label} ===`);
  console.log(`Total files: ${files.length}, Unique contents: ${Object.keys(hashes).length}`);
  console.log(`Duplicate groups: ${duplicateGroups.length}`);
  duplicateGroups.slice(0, 5).forEach((group, i) => {
    console.log(`  Group ${i + 1} (${group.length} duplicates):`);
    group.slice(0, 3).forEach(f => console.log(`    ${f}`));
    if (group.length > 3) console.log(`    ... and ${group.length - 3} more`);
  });
}

analyzeDuplicates(getFiles('src/assets/images'), 'IMAGES');
analyzeDuplicates(getFiles('src/assets/videos'), 'VIDEOS');

