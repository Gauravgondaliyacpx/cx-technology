const fs = require('fs');
const path = require('path');

function getAllDiskFiles(dir) {
  let list = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) list = list.concat(getAllDiskFiles(full));
    else if (f.endsWith('.mp4')) list.push(full);
  });
  return list;
}

const vids = getAllDiskFiles('src/assets/videos');
console.log('Total videos to replace:', vids.length);

const grouped = {};
vids.forEach(v => {
  const dir = path.dirname(v);
  if (!grouped[dir]) grouped[dir] = [];
  grouped[dir].push(path.basename(v));
});

for (const [dir, files] of Object.entries(grouped)) {
  console.log(`Directory ${dir}: ${files.length} files`);
}

