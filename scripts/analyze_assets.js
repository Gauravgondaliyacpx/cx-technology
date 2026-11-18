const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory() && !p.includes('assets') && !p.includes('node_modules')) {
      files = files.concat(walk(p));
    } else if (p.endsWith('.njk') || p.endsWith('.json')) {
      files.push(p);
    }
  });
  return files;
}

const files = walk('src');
const imgRegex = /\/assets\/images\/[^"'\s\)]+/g;
const vidRegex = /\/assets\/videos\/[^"'\s\)]+/g;

let imgs = new Set();
let vids = new Set();
let usageByFile = {};

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const fileImgs = c.match(imgRegex) || [];
  const fileVids = c.match(vidRegex) || [];
  usageByFile[f] = { images: fileImgs, videos: fileVids };
  fileImgs.forEach(i => imgs.add(i));
  fileVids.forEach(v => vids.add(v));
});

console.log('Total unique images referenced:', imgs.size);
console.log('Total unique videos referenced:', vids.size);
console.log('\n--- ALL VIDEOS ---');
console.log(Array.from(vids));

console.log('\n--- KEY VIDEOS BY FILE ---');
for (const [f, data] of Object.entries(usageByFile)) {
  if (data.videos.length > 0) {
    console.log(f, 'unique videos:', Array.from(new Set(data.videos)));
  }
}

