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
const allImgs = new Set();
const imgLocations = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/\/assets\/images\/[^"'`\s\)]+/g) || [];
  matches.forEach(img => {
    allImgs.add(img);
    if (!imgLocations[img]) imgLocations[img] = [];
    imgLocations[img].push(f);
  });
});

console.log('Total unique images referenced in code:', allImgs.size);

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

const diskImgs = getAllDiskFiles('src/assets/images');
console.log('Total images on disk:', diskImgs.length);

const unreferenced = [];
diskImgs.forEach(di => {
  const rel = '/' + path.relative('src', di).replace(/\\/g, '/');
  if (!allImgs.has(rel)) {
    unreferenced.push(rel);
  }
});
console.log('Unreferenced images on disk:', unreferenced.length);
if (unreferenced.length > 0) {
  console.log('Sample unreferenced images:', unreferenced.slice(0, 15));
}

