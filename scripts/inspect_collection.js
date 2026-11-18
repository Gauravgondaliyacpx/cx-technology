const fs = require('fs');

const collection = fs.readFileSync('src/collection.njk', 'utf8');
const lines = collection.split('\n');
console.log('Collection lines:', lines.length);

// Print first 5 items
let items = [];
let cur = {};
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('class="resource-card"') || line.includes('class="resources-item"') || line.includes('data-title=')) {
    if (Object.keys(cur).length > 0) items.push(cur);
    cur = { line: i };
  }
  if (line.includes('/assets/images/')) {
    const m = line.match(/\/assets\/images\/[^"'`\s\)]+/);
    if (m) cur.img = m[0];
  }
  if (line.includes('/assets/videos/')) {
    const m = line.match(/\/assets\/videos\/[^"'`\s\)]+/);
    if (m) cur.vid = m[0];
  }
  if (line.includes('class="resource-name"') || line.includes('class="resource-item_name"')) {
    cur.name = line.trim();
  }
}
if (Object.keys(cur).length > 0) items.push(cur);

console.log('Found items:', items.length);
console.log('Sample 3 items:', items.slice(0, 3));

