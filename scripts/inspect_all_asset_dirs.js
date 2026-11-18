const fs = require('fs');
const path = require('path');

function inspectFolder(dir) {
  const items = fs.readdirSync(dir);
  console.log(`\nDirectory: ${dir} (${items.length} items)`);
  let exts = {};
  let totalSize = 0;
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      inspectFolder(full);
    } else {
      const ext = path.extname(item).toLowerCase();
      exts[ext] = (exts[ext] || 0) + 1;
      totalSize += stat.size;
    }
  }
  if (Object.keys(exts).length > 0) {
    console.log(`  Files:`, exts, `Total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  }
}

inspectFolder('src/assets/images');
inspectFolder('src/assets/videos');

