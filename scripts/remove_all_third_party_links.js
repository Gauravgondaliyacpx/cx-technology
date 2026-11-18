const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.njk', '.html']) {
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

function cleanExternalLinks(html) {
  // 1. Convert CX Technology self-domain links to local internal links
  html = html.replace(/href=["']https?:\/\/(?:www\.)?cxtechnology\.dev(\/legal\/[^"']+)["']/g, 'href="$1"');
  html = html.replace(/href=["']https?:\/\/(?:www\.)?cxtechnology\.com\/?["']/g, 'href="/"');
  
  // 2. Convert Slack invite link to local Community page
  html = html.replace(/href=["']https?:\/\/join\.slack\.com\/[^"']+["']/g, 'href="/product/community/"');

  // 3. For any remaining external http/https href in <a> tags, replace with href="#" and remove target="_blank"
  html = html.replace(/<a\b([^>]*?)href=["']https?:\/\/[^"']+["']([^>]*?)>/gi, (match, before, after) => {
    let attrs = (before + ' ' + after)
      .replace(/\btarget\s*=\s*["']_blank["']/gi, '')
      .replace(/\brel\s*=\s*["'][^"']*["']/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    return attrs ? `<a href="#" ${attrs}>` : `<a href="#">`;
  });

  return html;
}

function processAllTemplates() {
  const files = getFiles('src');
  let totalReplaced = 0;

  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const matchesBefore = [...original.matchAll(/href\s*=\s*["'](https?:\/\/[^"']+)["']/gi)];
    if (matchesBefore.length > 0) {
      console.log(`Processing ${file}: found ${matchesBefore.length} external links...`);
      const cleaned = cleanExternalLinks(original);
      fs.writeFileSync(file, cleaned, 'utf8');
      totalReplaced += matchesBefore.length;
    }
  }

  // Also clean cx-webflow.js
  const webflowJs = 'src/assets/js/cx-webflow.js';
  if (fs.existsSync(webflowJs)) {
    let jsContent = fs.readFileSync(webflowJs, 'utf8');
    if (jsContent.includes('https://webflow.com/external/designer/')) {
      jsContent = jsContent.replace('https://webflow.com/external/designer/', '#');
      fs.writeFileSync(webflowJs, jsContent, 'utf8');
      console.log('Cleaned designer redirect in cx-webflow.js');
    }
  }

  console.log(`\nSuccessfully processed and removed ${totalReplaced} external redirect links!`);
}

processAllTemplates();

