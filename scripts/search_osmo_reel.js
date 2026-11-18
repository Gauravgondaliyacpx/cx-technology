const fs = require('fs');
const path = require('path');

function searchRefs(dir, term) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '_site', '.git'].includes(f)) searchRefs(full, term);
    } else {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes(term)) console.log(`Found in: ${full}`);
    }
  }
}

console.log('Searching for Osmo-V12-Reel-Tiny...');
searchRefs('src', 'Osmo-V12-Reel');

