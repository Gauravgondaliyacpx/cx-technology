const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.njk', '.html', '.json']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '_site', '.git'].includes(file)) {
        results = results.concat(getFiles(fullPath, exts));
      }
    } else if (exts.includes(path.extname(file))) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getFiles('src');
let allImgs = new Set();
let allVids = new Set();
let fileUsage = {};

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const imgMatches = [...content.matchAll(/src=["'](\/assets\/images\/[^"'\s>]+)["']/g)].map(m => m[1]);
  const vidMatches = [...content.matchAll(/data-video-src=["'](\/assets\/videos\/[^"'\s>]+)["']/g)].map(m => m[1]);
  
  imgMatches.forEach(img => allImgs.add(img));
  vidMatches.forEach(vid => allVids.add(vid));
  
  fileUsage[file] = {
    imgs: imgMatches.length,
    vids: vidMatches.length
  };
}

console.log('File usage overview:');
for (const [f, count] of Object.entries(fileUsage)) {
  if (count.imgs > 0 || count.vids > 0) {
    console.log(`  ${f}: ${count.imgs} images, ${count.vids} videos`);
  }
}

console.log('\nTotal Unique Images referenced:', allImgs.size);
console.log('Total Unique Videos referenced:', allVids.size);

// Group videos by folder
let vidFolders = {};
for (const v of allVids) {
  const folder = path.dirname(v);
  vidFolders[folder] = (vidFolders[folder] || 0) + 1;
}
console.log('\nVideo Folders in use:', vidFolders);

// Group images by folder
let imgFolders = {};
for (const i of allImgs) {
  const folder = path.dirname(i);
  imgFolders[folder] = (imgFolders[folder] || 0) + 1;
}
console.log('\nImage Folders in use:', imgFolders);

