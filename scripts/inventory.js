const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const imgFiles = getFiles('src/assets/images');
const vidFiles = getFiles('src/assets/videos');

console.log('Total img files on disk:', imgFiles.length);
console.log('Total vid files on disk:', vidFiles.length);

// Breakdown by subfolder
const imgByFolder = {};
imgFiles.forEach(f => {
  const dir = path.dirname(f);
  imgByFolder[dir] = (imgByFolder[dir] || 0) + 1;
});
console.log('\nImages by folder:', imgByFolder);

const vidByFolder = {};
vidFiles.forEach(f => {
  const dir = path.dirname(f);
  vidByFolder[dir] = (vidByFolder[dir] || 0) + 1;
});
console.log('\nVideos by folder:', vidByFolder);

