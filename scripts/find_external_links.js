const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.njk', '.html', '.js', '.json']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '_site', '.git', 'cache_media', 'cache_real_photos'].includes(file)) {
        results = results.concat(getFiles(fullPath, exts));
      }
    } else if (exts.includes(path.extname(file))) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getFiles('src');
const fileLinksMap = {};

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/href\s*=\s*["'](https?:\/\/[^"']+)["']/gi)];
  if (matches.length > 0) {
    fileLinksMap[file] = matches.map(m => m[1]);
  }
}

for (const [file, links] of Object.entries(fileLinksMap)) {
  console.log(`\n=== ${file} (${links.length} external links) ===`);
  const unique = [...new Set(links)];
  unique.forEach(u => {
    const count = links.filter(l => l === u).length;
    console.log(`  [x${count}] ${u}`);
  });
}
