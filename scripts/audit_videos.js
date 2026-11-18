const fs = require('fs');
const path = require('path');

function getCodeFiles(dir) {
  let list = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!['node_modules', '_site', '.git', 'cache_media', 'assets'].includes(f)) {
        list = list.concat(getCodeFiles(full));
      }
    } else if (['.njk', '.html', '.json', '.js', '.css'].includes(path.extname(f))) {
      list.push(full);
    }
  });
  return list;
}

const files = getCodeFiles('src');
const allVids = new Set();
const vidLocations = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/\/assets\/videos\/[^"'`\s\)]+/g) || [];
  matches.forEach(v => {
    allVids.add(v);
    if (!vidLocations[v]) vidLocations[v] = [];
    vidLocations[v].push(f);
  });
});

console.log('Total unique videos referenced in code:', allVids.size);

// Also list all videos actually on disk
function getAllDiskFiles(dir) {
  let list = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) list = list.concat(getAllDiskFiles(full));
    else list.push(full);
  });
  return list;
}

const diskVids = getAllDiskFiles('src/assets/videos');
console.log('Total videos on disk:', diskVids.length);

const unreferenced = [];
diskVids.forEach(dv => {
  const rel = '/' + path.relative('src', dv).replace(/\\/g, '/');
  if (!allVids.has(rel)) {
    unreferenced.push(rel);
  }
});
console.log('Unreferenced videos on disk:', unreferenced.length, unreferenced.slice(0, 10));

