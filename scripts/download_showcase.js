const fs = require('fs');
const path = require('path');

const showcaseProjects = [
  {
    file: 'project-aegis-cloud.avif',
    // Modern banking fintech / cloud software server room / fintech screen
    photoId: 'photo-1551288049-bebda4e38f71', 
    desc: 'Financial cloud banking core'
  },
  {
    file: 'project-synthetix-ai.avif',
    // Neural network / AI brain / quantum computing abstract data
    photoId: 'photo-1620712943543-bcc4688e7485',
    desc: 'Enterprise multi-modal AI / RAG'
  },
  {
    file: 'project-veloce-web.avif',
    // Sleek automotive 3D design / futuristic car web platform
    photoId: 'photo-1617788138017-80ad40651399',
    desc: 'Interactive 3D automotive web platform'
  },
  {
    file: 'project-neuraldesk.avif',
    // AI workstation / multi-screen developer desk / modern IDE
    photoId: 'photo-1526374965328-7f61d4dc18c5',
    desc: 'Autonomous AI agent assistant workspace'
  },
  {
    file: 'project-corepulse.avif',
    // Healthcare tech / bio-analytics / medical software monitor
    photoId: 'photo-1576091160399-112ba8d25d1d',
    desc: 'Health analytics & metrics platform'
  },
  {
    file: 'project-prism-vision.avif',
    // Computer vision / camera sensor / optics technology
    photoId: 'photo-1507413245164-6160d8298b31',
    desc: 'Computer vision spatial AI'
  },
  {
    file: 'project-omnichain.avif',
    // Global logistics / cargo smart shipping / automated supply chain
    photoId: 'photo-1586528116311-ad8dd3c8310d',
    desc: 'Supply chain enterprise SaaS logistics'
  },
  {
    file: 'project-novamesh-devops.avif',
    // Cloud datacenter / server rack / Kubernetes infrastructure
    photoId: 'photo-1558494949-ef010cbdcc31',
    desc: 'Cloud DevOps Kubernetes infrastructure'
  },
  {
    file: 'project-quantedge.avif',
    // Trading floor / stock market algorithmic analytics chart
    photoId: 'photo-1611974789855-9c2a0a7236a3',
    desc: 'Algorithmic trading financial terminal'
  },
  {
    file: 'project-aura-arch.avif',
    // Modern architectural minimal building / luxury web experience
    photoId: 'photo-1600585154340-be6161a56a0c',
    desc: 'Architectural studio web experience'
  },
  {
    file: 'project-shieldops.avif',
    // Cybersecurity matrix / padlock code / digital defense shield
    photoId: 'photo-1563986768609-322da13575f3',
    desc: 'Zero-trust cybersecurity operations'
  },
  {
    file: 'project-hyperflux.avif',
    // Big data fiber optic streams / ultra-fast digital data processing
    photoId: 'photo-1518770660439-4636190af475',
    desc: 'Real-time big data stream processing AI engine'
  }
];

const destDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'showcase');

async function downloadProjectImage(proj) {
  const url = `https://images.unsplash.com/${proj.photoId}?w=1440&h=900&fit=crop&q=85&fm=avif`;
  const destPath = path.join(destDir, proj.file);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    console.log(`Saved ${proj.file} (${buffer.length} bytes) - ${proj.desc}`);
  } catch (err) {
    console.error(`Failed ${proj.file}:`, err.message);
  }
}

async function run() {
  console.log('Downloading realistic showcase images...');
  for (const proj of showcaseProjects) {
    await downloadProjectImage(proj);
  }
  console.log('Showcase images complete!');
}

run();

