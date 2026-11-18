const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const accents = [
  '#E0A16C', '#EFDDB7', '#B1B6A2', '#38BDF8', '#60A5FA', 
  '#34D399', '#A78BFA', '#F472B6', '#FBBF24', '#2DD4BF'
];

const buttonLabels = [
  "Initialize AI Cluster", "Deploy Microservice", "Scale Cloud Nodes", "Compile TypeScript",
  "Stream Kafka Pipeline", "Execute RAG Query", "Sync Figma Tokens", "Run Unit Tests",
  "Encrypt Data Vault", "Authorize OAuth Token", "Inspect DOM Tree", "Optimize GSAP Timeline",
  "Provision Kubernetes", "Run Benchmarks", "Trigger Webhook", "Hydrate Component",
  "Index Vector Embeddings", "Rebase Git Branch", "Generate Test Suite", "Monitor Cyber Defense",
  "Query GraphQL Schema", "Build Docker Image", "Warm Serverless Cache", "Calculate Neural Weights",
  "Export OpenAPI Spec", "Validate JSON Schema", "Format Prettier Code", "Lint ESLint Rules",
  "Trace Distributed Span", "Analyze Heap Memory", "Flush Redis Cache", "Resolve DNS Records",
  "Rotate TLS Certificates", "Stream SSE Events", "Broadcast WebSocket", "Fork Repository",
  "Cherry-Pick Commit", "Tag Production Release", "Rollback Deployment", "Drain Canary Pods",
  "Verify Hash Integrity", "Sign JWT Claims", "Generate API Key", "Migrate Postgres Schema",
  "Index Elastic Database", "Render Canvas WebGL", "Mount Virtual DOM", "Subscribe RxJS Stream",
  "Compile WebAssembly", "Profile CPU Usage", "Benchmark TPS Throughput", "Train Transformer Model",
  "Fine-Tune Hyperparameters", "Vectorize Documents", "Embed Semantic Text", "Cluster K-Means Latent",
  "Synthesize Voice Audio", "Segment Image Masks", "Detect Object Bounding", "Evaluate Precision Metric",
  "Quantize FP16 Model", "Distill Student Model", "Cache Inference Prompt", "Route Gateway Proxy",
  "Throttle Rate Limits", "Enforce CORS Policy", "Validate CSRF Token", "Audit IAM Roles",
  "Deploy Edge Function", "Prune Unused Images", "Compress Video Asset", "Bundle Webpack Chunks",
  "Minify CSS Stylesheets", "Transpile Babel Code", "Tree-Shake Exports", "Register Service Worker",
  "Cache Offline PWA", "Simulate Network Latency", "Run End-to-End Cypress", "Capture Visual Regression",
  "Inspect Network Har", "Debug Chrome DevTools", "Dump SQLite Database", "Partition Kafka Topic",
  "Elect Raft Leader", "Consolidate WAL Logs", "Replicate Cross-Region", "Trigger PagerDuty Alert",
  "Check Prometheus Metrics", "Render Grafana Dashboard", "Trace OpenTelemetry Span", "Ingest Log Stash",
  "Execute SQL Query", "Snapshot EBS Volume", "Restore Backup Archive", "Establish VPC Peering",
  "Attach IAM Policy", "Configure Load Balancer", "Verify Health Check", "Scale To Zero Active"
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getResourceCategory(name) {
  const n = name.toLowerCase();
  if (n.includes('nav') || n.includes('menu') || n.includes('dock') || n.includes('header') || n.includes('drawer') || n.includes('tab')) return 'Navigation & Menu Systems';
  if (n.includes('card') || n.includes('slider') || n.includes('carousel') || n.includes('flick') || n.includes('stack') || n.includes('parallax')) return 'Cards & Interactive Sliders';
  if (n.includes('button') || n.includes('toggle') || n.includes('hover') || n.includes('tilt') || n.includes('bounce') || n.includes('magnetic')) return 'Controls & Buttons';
  if (n.includes('text') || n.includes('scramble') || n.includes('typewriter') || n.includes('marquee') || n.includes('font')) return 'Typography & Dynamic Text';
  if (n.includes('loader') || n.includes('loading') || n.includes('spinner') || n.includes('progress') || n.includes('reveal')) return 'Loaders & Reveal Animations';
  if (n.includes('modal') || n.includes('dialog') || n.includes('popup') || n.includes('tooltip')) return 'Overlays & Modals';
  if (n.includes('cursor') || n.includes('trail') || n.includes('particle') || n.includes('3d') || n.includes('canvas')) return 'WebGL & Spatial Effects';
  return 'Architectural Blueprint';
}

function formatTitle(name) {
  return name
    .replace(/-\d+x\d+.*$/, '')
    .replace(/-v\d+$/, '')
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

async function runInBatches(items, batchSize, fn) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map((item, idx) => fn(item, i + idx)));
  }
}

// 1. Button Images (1440x900 AVIF)
async function renderButtonImage(file, destPath, index) {
  const numMatch = file.match(/button-(\d+)/);
  const num = numMatch ? parseInt(numMatch[1], 10) : (index + 1);
  const label = buttonLabels[(num - 1) % buttonLabels.length];
  const accent = accents[(num - 1) % accents.length];
  const secAccent = accents[(num + 2) % accents.length];
  const padded = String(num).padStart(3, '0');

  const svg = `
  <svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B0F17"/>
        <stop offset="100%" stop-color="#141C2B"/>
      </linearGradient>
      <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accent}"/>
        <stop offset="100%" stop-color="${secAccent}"/>
      </linearGradient>
    </defs>
    <rect width="1440" height="900" fill="url(#bg)"/>
    <rect x="80" y="60" width="1280" height="780" rx="24" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
    <circle cx="120" cy="100" r="6" fill="#EF4444"/>
    <circle cx="140" cy="100" r="6" fill="#F59E0B"/>
    <circle cx="160" cy="100" r="6" fill="#10B981"/>
    <text x="190" y="106" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#94A3B8">CX TECHNOLOGY // INTERACTIVE BUTTON PACK</text>
    <text x="1320" y="106" font-family="monospace" font-size="14" fill="${accent}" text-anchor="end">BTN-${padded}</text>
    
    <rect x="440" y="390" width="560" height="84" rx="42" fill="url(#btnGrad)"/>
    <text x="720" y="443" font-family="system-ui, sans-serif" font-weight="700" font-size="22" fill="#0F172A" text-anchor="middle">${escapeXml(label.toUpperCase())} →</text>
    
    <text x="720" y="530" font-family="monospace" font-size="15" fill="#64748B" text-anchor="middle">VARIANT: MAGNETIC SPRING | CURSOR: REACTIVE | ACCENT: ${accent}</text>
    <text x="720" y="560" font-family="monospace" font-size="13" fill="#475569" text-anchor="middle">STATUS: ACTIVE COMPONENT | GSAP INERTIA DRAG READY</text>
  </svg>`;

  await sharp(Buffer.from(svg)).avif({ quality: 75, effort: 3 }).toFile(destPath);
}

// 2. Resource Images (1440x900 AVIF)
async function renderResourceImage(file, destPath, index) {
  const base = path.basename(file, path.extname(file));
  const title = formatTitle(base);
  const category = getResourceCategory(base);
  const accent = accents[index % accents.length];
  const secAccent = accents[(index + 3) % accents.length];

  const svg = `
  <svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0D1117"/>
        <stop offset="100%" stop-color="#161F2E"/>
      </linearGradient>
    </defs>
    <rect width="1440" height="900" fill="url(#bg)"/>
    <rect x="70" y="50" width="1300" height="800" rx="20" fill="#111827" stroke="#1F2937" stroke-width="2"/>
    <circle cx="110" cy="90" r="7" fill="#EF4444"/>
    <circle cx="132" cy="90" r="7" fill="#F59E0B"/>
    <circle cx="154" cy="90" r="7" fill="#10B981"/>
    <text x="185" y="96" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#94A3B8">CX TECHNOLOGY // ${escapeXml(category.toUpperCase())}</text>
    <rect x="1170" y="76" width="160" height="28" rx="14" fill="#1F2937"/>
    <text x="1250" y="95" font-family="monospace" font-size="12" fill="${accent}" text-anchor="middle">MODULE #${String(index + 1).padStart(3, '0')}</text>
    
    <rect x="110" y="140" width="1220" height="420" rx="16" fill="#0B0F17" stroke="#1E293B" stroke-width="1.5"/>
    <text x="150" y="200" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="#F8FAFC">${escapeXml(title)}</text>
    <text x="150" y="235" font-family="monospace" font-size="14" fill="${accent}">${escapeXml(category)} • Production Module</text>
    
    <rect x="150" y="280" width="340" height="220" rx="12" fill="#1E293B" stroke="#334155"/>
    <rect x="520" y="280" width="340" height="220" rx="12" fill="#1E293B" stroke="#334155"/>
    <rect x="890" y="280" width="400" height="220" rx="12" fill="#1E293B" stroke="#334155"/>
    
    <rect x="170" y="310" width="140" height="26" rx="13" fill="${accent}" opacity="0.2"/>
    <text x="240" y="327" font-family="monospace" font-size="11" fill="${accent}" text-anchor="middle">ACTIVE STATE</text>
    <rect x="170" y="360" width="220" height="12" rx="6" fill="#475569"/>
    <rect x="170" y="384" width="160" height="12" rx="6" fill="#334155"/>
    
    <rect x="540" y="310" width="140" height="26" rx="13" fill="${secAccent}" opacity="0.2"/>
    <text x="610" y="327" font-family="monospace" font-size="11" fill="${secAccent}" text-anchor="middle">INTERACTION</text>
    <rect x="540" y="360" width="240" height="12" rx="6" fill="#475569"/>
    <rect x="540" y="384" width="180" height="12" rx="6" fill="#334155"/>

    <rect x="910" y="310" width="140" height="26" rx="13" fill="#38BDF8" opacity="0.2"/>
    <text x="980" y="327" font-family="monospace" font-size="11" fill="#38BDF8" text-anchor="middle">TELEMETRY</text>
    <rect x="910" y="360" width="280" height="12" rx="6" fill="#475569"/>
    <rect x="910" y="384" width="200" height="12" rx="6" fill="#334155"/>
    
    <rect x="110" y="580" width="1220" height="220" rx="16" fill="#0B0F17" stroke="#1E293B" stroke-width="1.5"/>
    <text x="150" y="630" font-family="monospace" font-size="16" fill="#38BDF8">import { ${title.replace(/[\s\(\)\/\-]+/g, '')} } from '@cx/components';</text>
    <text x="150" y="670" font-family="monospace" font-size="16" fill="#A78BFA">const instance = new ${title.replace(/[\s\(\)\/\-]+/g, '')}();</text>
    <text x="150" y="710" font-family="monospace" font-size="16" fill="${accent}">await instance.mount('#container');</text>
  </svg>`;

  await sharp(Buffer.from(svg)).avif({ quality: 75, effort: 3 }).toFile(destPath);
}

// 3. Showcase Images (1440x900 AVIF)
async function renderShowcaseImage(file, destPath, index) {
  const base = path.basename(file, path.extname(file));
  const title = formatTitle(base);
  const accent = accents[index % accents.length];
  const secAccent = accents[(index + 2) % accents.length];

  const svg = `
  <svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#1E293B"/>
      </linearGradient>
    </defs>
    <rect width="1440" height="900" fill="url(#bg)"/>
    
    <rect x="60" y="50" width="1320" height="800" rx="18" fill="#0B0F17" stroke="#334155" stroke-width="2"/>
    <circle cx="100" cy="85" r="7" fill="#EF4444"/>
    <circle cx="125" cy="85" r="7" fill="#F59E0B"/>
    <circle cx="150" cy="85" r="7" fill="#10B981"/>
    
    <rect x="200" y="70" width="1040" height="32" rx="16" fill="#1E293B"/>
    <text x="230" y="91" font-family="monospace" font-size="13" fill="#94A3B8">https://${base.toLowerCase().replace(/[^a-z0-9]/g, '')}.engineering.cxtechnology.com</text>
    
    <rect x="60" y="120" width="220" height="730" fill="#0F172A"/>
    <text x="90" y="170" font-family="system-ui, sans-serif" font-weight="700" font-size="16" fill="#F8FAFC">CX ENTERPRISE</text>
    <rect x="80" y="200" width="180" height="36" rx="8" fill="${accent}" opacity="0.2"/>
    <text x="100" y="223" font-family="system-ui, sans-serif" font-size="13" fill="${accent}" font-weight="600">● Live Overview</text>
    <text x="100" y="265" font-family="system-ui, sans-serif" font-size="13" fill="#64748B">○ API Gateway</text>
    <text x="100" y="305" font-family="system-ui, sans-serif" font-size="13" fill="#64748B">○ Neural Models</text>
    <text x="100" y="345" font-family="system-ui, sans-serif" font-size="13" fill="#64748B">○ Microservices</text>
    <text x="100" y="385" font-family="system-ui, sans-serif" font-size="13" fill="#64748B">○ Telemetry</text>
    
    <text x="320" y="175" font-family="system-ui, sans-serif" font-weight="800" font-size="28" fill="#F8FAFC">${escapeXml(title)}</text>
    <text x="320" y="205" font-family="monospace" font-size="14" fill="${accent}">Enterprise Production Case Study • Sub-5ms Latency</text>
    
    <rect x="320" y="240" width="300" height="130" rx="14" fill="#1E293B" stroke="#334155"/>
    <text x="350" y="280" font-family="system-ui, sans-serif" font-size="13" fill="#94A3B8">TRANSACTIONS / SEC</text>
    <text x="350" y="330" font-family="monospace" font-weight="bold" font-size="32" fill="${accent}">${(35000 + (index * 731) % 25000).toLocaleString()} TPS</text>
    
    <rect x="650" y="240" width="300" height="130" rx="14" fill="#1E293B" stroke="#334155"/>
    <text x="680" y="280" font-family="system-ui, sans-serif" font-size="13" fill="#94A3B8">AVERAGE INFERENCE</text>
    <text x="680" y="330" font-family="monospace" font-weight="bold" font-size="32" fill="#38BDF8">${(2.1 + (index * 0.17) % 3.0).toFixed(1)} ms</text>
    
    <rect x="980" y="240" width="350" height="130" rx="14" fill="#1E293B" stroke="#334155"/>
    <text x="1010" y="280" font-family="system-ui, sans-serif" font-size="13" fill="#94A3B8">SYSTEM AVAILABILITY</text>
    <text x="1010" y="330" font-family="monospace" font-weight="bold" font-size="32" fill="#34D399">99.999% SLA</text>
    
    <rect x="320" y="400" width="1010" height="410" rx="16" fill="#111827" stroke="#1E293B"/>
    <text x="350" y="440" font-family="system-ui, sans-serif" font-weight="600" font-size="16" fill="#E2E8F0">Real-Time Throughput &amp; Latency Distribution</text>
    
    <path d="M 360 700 Q 550 560 750 620 T 1100 500 T 1280 480" fill="none" stroke="${accent}" stroke-width="4"/>
    <path d="M 360 720 Q 550 630 750 680 T 1100 580 T 1280 540" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="6,6"/>
  </svg>`;

  await sharp(Buffer.from(svg)).avif({ quality: 75, effort: 3 }).toFile(destPath);
}

// 4. Developer / Author Avatar Portraits (AVIF)
async function renderAvatarImage(destPath, index, label = 'CX') {
  const accent = accents[index % accents.length];
  const secAccent = accents[(index + 3) % accents.length];
  const initials = String.fromCharCode(65 + (index % 26)) + String.fromCharCode(65 + ((index + 7) % 26));
  const roles = ['Architect', 'AI Lead', 'Staff Eng', 'Frontend Lead', 'DevOps Eng', 'Security Eng', 'Systems Eng', 'Data Eng'];
  const role = roles[index % roles.length];

  const svg = `
  <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="avGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accent}"/>
        <stop offset="100%" stop-color="${secAccent}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="#0F172A"/>
    <circle cx="200" cy="200" r="170" fill="url(#avGrad)"/>
    <circle cx="200" cy="200" r="150" fill="#111827"/>
    <text x="200" y="225" font-family="system-ui, sans-serif" font-weight="900" font-size="96" fill="${accent}" text-anchor="middle">${initials}</text>
    <rect x="100" y="290" width="200" height="34" rx="17" fill="${accent}"/>
    <text x="200" y="312" font-family="system-ui, sans-serif" font-weight="700" font-size="13" fill="#0F172A" text-anchor="middle">${escapeXml(role.toUpperCase())}</text>
  </svg>`;

  await sharp(Buffer.from(svg)).avif({ quality: 80, effort: 3 }).toFile(destPath);
}

// 5. Bandwidth / Meta / Banner Images
async function renderBannerImage(title, destPath, w = 1200, h = 630) {
  const accent = '#E0A16C';
  const svg = `
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="#0D1117"/>
    <rect x="30" y="30" width="${w - 60}" height="${h - 60}" rx="18" fill="#111827" stroke="#1F2937" stroke-width="2"/>
    <text x="${w / 2}" y="${h / 2 - 20}" font-family="system-ui, sans-serif" font-weight="800" font-size="36" fill="${accent}" text-anchor="middle">${escapeXml(title)}</text>
    <text x="${w / 2}" y="${h / 2 + 40}" font-family="monospace" font-size="18" fill="#94A3B8" text-anchor="middle">CX TECHNOLOGY // ENTERPRISE ENGINEERING</text>
  </svg>`;

  const ext = path.extname(destPath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') {
    await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(destPath);
  } else {
    await sharp(Buffer.from(svg)).avif({ quality: 75, effort: 3 }).toFile(destPath);
  }
}

async function generateAllImages() {
  console.log('--- STARTING COMPREHENSIVE PARALLEL IMAGE GENERATION ---');

  // 1. Button Images
  const btnDir = 'src/assets/images/button-img';
  const btnFiles = fs.readdirSync(btnDir);
  console.log(`Generating ${btnFiles.length} button images in ${btnDir}...`);
  await runInBatches(btnFiles, 8, (f, i) => renderButtonImage(f, path.join(btnDir, f), i));
  console.log('Button images completed!');

  // 2. Resource Images
  const resDir = 'src/assets/images/resource-img';
  const resFiles = fs.readdirSync(resDir);
  console.log(`Generating ${resFiles.length} resource images in ${resDir}...`);
  await runInBatches(resFiles, 8, (f, i) => renderResourceImage(f, path.join(resDir, f), i));
  console.log('Resource images completed!');

  // 3. Showcase Images
  const showDir = 'src/assets/images/showcase-img';
  const showFiles = fs.readdirSync(showDir);
  console.log(`Generating ${showFiles.length} showcase images in ${showDir}...`);
  await runInBatches(showFiles, 8, (f, i) => renderShowcaseImage(f, path.join(showDir, f), i));
  console.log('Showcase images completed!');

  const showFeatDir = 'src/assets/images/showcase';
  if (fs.existsSync(showFeatDir)) {
    const showFeatFiles = fs.readdirSync(showFeatDir);
    console.log(`Generating ${showFeatFiles.length} featured showcase images in ${showFeatDir}...`);
    await runInBatches(showFeatFiles, 8, (f, i) => renderShowcaseImage(f, path.join(showFeatDir, f), i + 200));
    console.log('Featured showcase images completed!');
  }

  // 4. Avatars
  const avDir = 'src/assets/images/avatars';
  const avFiles = fs.readdirSync(avDir);
  console.log(`Generating ${avFiles.length} team avatars in ${avDir}...`);
  await runInBatches(avFiles, 8, (f, i) => renderAvatarImage(path.join(avDir, f), i, 'TEAM'));
  console.log('Team avatars completed!');

  const credDir = 'src/assets/images/showcase-credits-img';
  const credFiles = fs.readdirSync(credDir);
  console.log(`Generating ${credFiles.length} credit avatars in ${credDir}...`);
  await runInBatches(credFiles, 8, (f, i) => renderAvatarImage(path.join(credDir, f), i + 30, 'CREATOR'));
  console.log('Credit avatars completed!');

  const authDir = 'src/assets/images/website/author';
  const authFiles = fs.readdirSync(authDir);
  console.log(`Generating ${authFiles.length} author avatars in ${authDir}...`);
  await runInBatches(authFiles, 8, (f, i) => renderAvatarImage(path.join(authDir, f), i + 150, 'AUTHOR'));
  console.log('Author avatars completed!');

  // 5. Website Bandwidth Images
  const bandDir = 'src/assets/images/website/bandwidth';
  if (fs.existsSync(bandDir)) {
    const bandFiles = fs.readdirSync(bandDir).filter(f => f.endsWith('.avif') || f.endsWith('.jpg'));
    console.log(`Generating ${bandFiles.length} bandwidth images in ${bandDir}...`);
    await runInBatches(bandFiles, 8, (f, i) => {
      const title = formatTitle(path.basename(f, path.extname(f)));
      return renderBannerImage(title, path.join(bandDir, f), 1440, 900);
    });
    console.log('Bandwidth images completed!');
  }

  // 6. Website Button Pack, Features, Meta-image, Resources
  const bpDir = 'src/assets/images/website/button-pack';
  if (fs.existsSync(bpDir)) {
    const bpFiles = fs.readdirSync(bpDir).filter(f => f.endsWith('.avif') || f.endsWith('.jpg'));
    await runInBatches(bpFiles, 8, (f, i) => renderBannerImage('BUTTON PACK // ' + formatTitle(f), path.join(bpDir, f), 1440, 900));
  }

  const metaDir = 'src/assets/images/website/meta-image';
  if (fs.existsSync(metaDir)) {
    const metaFiles = fs.readdirSync(metaDir);
    await runInBatches(metaFiles, 8, (f, i) => renderBannerImage('CX TECHNOLOGY // ' + formatTitle(f), path.join(metaDir, f), 1200, 630));
  }

  const featImg = 'src/assets/images/website/features/dashboard-overview-2880x1800.jpg';
  if (fs.existsSync(path.dirname(featImg))) {
    await renderBannerImage('DASHBOARD OVERVIEW', featImg, 2880, 1800);
  }

  const resCardsDir = 'src/assets/images/resources';
  if (fs.existsSync(resCardsDir)) {
    const resCardsFiles = fs.readdirSync(resCardsDir).filter(f => f.endsWith('.avif') || f.endsWith('.jpg'));
    await runInBatches(resCardsFiles, 8, (f, i) => renderResourceImage(f, path.join(resCardsDir, f), i + 400));
  }

  console.log('=== ALL 700+ IMAGES GENERATED & SAVED IN TARGET LOCATIONS! ===');
}

generateAllImages().catch(err => {
  console.error('Fatal image generation error:', err);
  process.exit(1);
});
