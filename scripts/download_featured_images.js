const fs = require('fs');
const path = require('path');

const featuredImages = [
  {
    dest: 'src/assets/images/website/features/dashboard-overview-2880x1800.jpg',
    // Ultra high-res dark mode software and analytics dashboard
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=2880&h=1800&fit=crop&q=85&fm=jpg'
  },
  {
    dest: 'src/assets/images/website/bandwidth/pf-cx.avif',
    // Confident male tech founder / lead software engineer
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=faces&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/bandwidth/pf-cx-team.avif',
    // Professional female technical lead / AI research engineer
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop&crop=faces&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/bandwidth/about-modal-1.avif',
    // Contemporary tech engineering office / developers working
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/bandwidth/about-modal-2.avif',
    // Modern developer workstation with multiple monitors, code and AI models
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/bandwidth/about-modal-3.avif',
    // High-tech team whiteboard architecture session
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/author/dang-nguyen-270x270.avif',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=270&h=270&fit=crop&crop=faces&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/author/cassie-evans-270x270.avif',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=270&h=270&fit=crop&crop=faces&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/author/by-huy-270x270.avif',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=270&h=270&fit=crop&crop=faces&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/author/jordan-gilroy-270x270.avif',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=270&h=270&fit=crop&crop=faces&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/author/jesper-landberg-270x270.avif',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=270&h=270&fit=crop&crop=faces&q=85&fm=avif'
  },
  {
    dest: 'src/assets/images/website/author/victor-work-270x270.avif',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=270&h=270&fit=crop&crop=faces&q=85&fm=avif'
  }
];

async function run() {
  console.log('Downloading featured images...');
  for (const item of featuredImages) {
    try {
      const dir = path.dirname(item.dest);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(item.dest, buffer);
      console.log(`Saved ${item.dest} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Failed ${item.dest}:`, err.message);
    }
  }
  console.log('Featured images complete!');
}

run();

