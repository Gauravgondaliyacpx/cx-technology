const sharp = require('sharp');
const { execFileSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

// Test generating a 3-second realistic motion video with:
// 1. Photographic tech background (blurred)
// 2. Real-time typing code terminal
// 3. Oscillating waveform / live data chart
async function testRealMotionVideo() {
  const tmp = 'test_motion_frames';
  if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);

  console.log('Generating multi-frame realistic motion video...');
  const totalFrames = 48; // 2 seconds at 24fps
  
  const codeLines = [
    "import { NeuralEngine } from '@cx/ai';",
    "const model = await NeuralEngine.load('transformer-v4');",
    "const stream = await model.generate({ stream: true });",
    "for await (const token of stream) {",
    "  process.stdout.write(token);",
    "}",
    "// [STATUS: 99.999% SLA | INFERENCE: 2.8ms | 100k TPS]"
  ];

  for (let f = 0; f < totalFrames; f++) {
    const t = f / totalFrames; // 0 to 1
    const cursorBlink = (f % 12 < 6) ? '▌' : ' ';
    const charsToShow = Math.floor(t * codeLines.join('\n').length);
    const visibleCode = codeLines.join('\n').slice(0, charsToShow);
    
    // Waveform points
    let wavePoints = '';
    for (let x = 0; x < 600; x += 10) {
      const y = 550 + Math.sin((x / 40) + (f * 0.4)) * 30 + Math.cos((x / 20) - (f * 0.3)) * 15;
      wavePoints += `${x === 0 ? 'M' : 'L'} ${760 + x} ${y} `;
    }

    const svg = `
    <svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#070A0F"/>
          <stop offset="100%" stop-color="#121824"/>
        </linearGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#bg)"/>
      
      <!-- Tech Grid with moving phase -->
      <g stroke="#1E293B" stroke-width="1" opacity="0.4">
        ${Array.from({ length: 15 }, (_, i) => `<line x1="0" y1="${(i * 60 + f * 2) % 900}" x2="1440" y2="${(i * 60 + f * 2) % 900}"/>`).join('')}
      </g>
      
      <!-- Left: Real Code Terminal Window -->
      <rect x="80" y="80" width="620" height="740" rx="16" fill="#0B0F17" stroke="#1E293B" stroke-width="2"/>
      <circle cx="115" cy="115" r="6" fill="#EF4444"/>
      <circle cx="135" cy="115" r="6" fill="#F59E0B"/>
      <circle cx="155" cy="115" r="6" fill="#10B981"/>
      <text x="185" y="120" font-family="monospace" font-size="13" fill="#64748B">cx-technology // engine.ts</text>
      
      <!-- Code lines -->
      <text x="110" y="180" font-family="monospace" font-size="16" fill="#38BDF8">
        ${visibleCode.split('\n').map((line, idx) => `<tspan x="110" dy="${idx === 0 ? 0 : 28}">${line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</tspan>`).join('')}
        <tspan fill="#E0A16C">${cursorBlink}</tspan>
      </text>
      
      <!-- Right: Live Neural Graph & Live Telemetry -->
      <rect x="740" y="80" width="620" height="740" rx="16" fill="#0B0F17" stroke="#1E293B" stroke-width="2"/>
      <text x="770" y="120" font-family="system-ui" font-size="16" font-weight="700" fill="#E2E8F0">REAL-TIME INFERENCE STREAM</text>
      <text x="770" y="150" font-family="monospace" font-size="13" fill="#E0A16C">LATENCY: ${(2.1 + Math.sin(f * 0.3) * 0.4).toFixed(2)} ms | TOKENS: ${(142 + f * 4)} t/s</text>
      
      <!-- Live Oscillating Waveform -->
      <path d="${wavePoints}" fill="none" stroke="#E0A16C" stroke-width="3"/>
      <path d="${wavePoints} L 1360 650 L 760 650 Z" fill="#E0A16C" opacity="0.1"/>
      
      <!-- Floating data nodes -->
      <circle cx="${900 + Math.cos(f * 0.2) * 40}" cy="${300 + Math.sin(f * 0.2) * 30}" r="12" fill="#38BDF8"/>
      <circle cx="${1100 + Math.sin(f * 0.25) * 50}" cy="${280 + Math.cos(f * 0.25) * 40}" r="16" fill="#A78BFA"/>
      <circle cx="${1000 + Math.cos(f * 0.15) * 30}" cy="${420 + Math.sin(f * 0.15) * 30}" r="14" fill="#34D399"/>
      <line x1="${900 + Math.cos(f * 0.2) * 40}" y1="${300 + Math.sin(f * 0.2) * 30}" x2="${1100 + Math.sin(f * 0.25) * 50}" y2="${280 + Math.cos(f * 0.25) * 40}" stroke="#38BDF8" stroke-width="2" opacity="0.6"/>
      <line x1="${1100 + Math.sin(f * 0.25) * 50}" y1="${280 + Math.cos(f * 0.25) * 40}" x2="${1000 + Math.cos(f * 0.15) * 30}" y2="${420 + Math.sin(f * 0.15) * 30}" stroke="#A78BFA" stroke-width="2" opacity="0.6"/>
    </svg>`;

    const frameFile = path.join(tmp, `frame_${String(f).padStart(3, '0')}.png`);
    await sharp(Buffer.from(svg)).png().toFile(frameFile);
  }

  console.log('Encoding MP4 with FFmpeg...');
  execFileSync(ffmpeg, [
    '-y',
    '-framerate', '24',
    '-i', path.join(tmp, 'frame_%03d.png'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'ultrafast',
    '-movflags', '+faststart',
    'test_real_motion.mp4'
  ]);

  console.log('Done! Video size:', fs.statSync('test_real_motion.mp4').size);
  // cleanup
  fs.readdirSync(tmp).forEach(f => fs.unlinkSync(path.join(tmp, f)));
  fs.rmdirSync(tmp);
}

testRealMotionVideo();

