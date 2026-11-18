const sharp = require('sharp');
const { execFileSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

async function testAnimatedButtonVideo() {
  const tmp = 'test_btn_motion';
  if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);

  const totalFrames = 48; // 2 seconds
  console.log('Generating 48 frames of realistic animated button interaction...');

  for (let f = 0; f < totalFrames; f++) {
    const t = f / totalFrames; // 0 to 1
    
    // Cursor position moves from (300, 700) to button center (720, 450) and clicks at t=0.5
    let cursorX, cursorY, scale = 1, rippleR = 0, rippleOpacity = 0;
    if (t < 0.4) {
      const p = t / 0.4;
      cursorX = 300 + (720 - 300) * Math.sin(p * Math.PI / 2);
      cursorY = 700 + (450 - 700) * Math.sin(p * Math.PI / 2);
    } else if (t < 0.6) {
      cursorX = 720;
      cursorY = 450;
      // Click press down
      scale = 0.95 + 0.05 * Math.abs(Math.sin((t - 0.4) / 0.2 * Math.PI));
      rippleR = ((t - 0.4) / 0.2) * 180;
      rippleOpacity = 0.8 * (1 - (t - 0.4) / 0.2);
    } else {
      const p = (t - 0.6) / 0.4;
      cursorX = 720 + 200 * p;
      cursorY = 450 + 100 * p;
      scale = 1;
    }

    const isClicked = t >= 0.5;
    const btnLabel = isClicked ? "AI CLUSTER DEPLOYED ✓" : "INITIALIZE AI CLUSTER →";
    const btnColor = isClicked ? "#10B981" : "#E0A16C";

    const svg = `
    <svg width="1440" height="900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1E293B" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#0A0E17" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="1440" height="900" fill="url(#bgGlow)"/>
      
      <!-- Tech Grid Lines -->
      <g stroke="#334155" stroke-width="1" opacity="0.25">
        <line x1="720" y1="0" x2="720" y2="900"/>
        <line x1="0" y1="450" x2="1440" y2="450"/>
        <circle cx="720" cy="450" r="280" fill="none"/>
        <circle cx="720" cy="450" r="420" fill="none"/>
      </g>
      
      <!-- Card Frame -->
      <rect x="100" y="80" width="1240" height="740" rx="24" fill="#0F172A" stroke="#1E293B" stroke-width="2"/>
      <circle cx="140" cy="120" r="7" fill="#EF4444"/>
      <circle cx="165" cy="120" r="7" fill="#F59E0B"/>
      <circle cx="190" cy="120" r="7" fill="#10B981"/>
      <text x="225" y="126" font-family="system-ui" font-weight="600" font-size="15" fill="#94A3B8">CX TECHNOLOGY // INTERACTIVE BUTTON CONTROL</text>
      
      <!-- Scaled Button Container -->
      <g transform="translate(720, 450) scale(${scale}) translate(-720, -450)">
        <!-- Button shadow -->
        <rect x="460" y="405" width="520" height="90" rx="45" fill="${btnColor}" opacity="0.25" filter="blur(20px)"/>
        <!-- Button body -->
        <rect x="460" y="405" width="520" height="90" rx="45" fill="${btnColor}"/>
        <!-- Ripple wave -->
        ${rippleR > 0 ? `<circle cx="720" cy="450" r="${rippleR}" fill="#FFFFFF" opacity="${rippleOpacity}"/>` : ''}
        <!-- Label -->
        <text x="720" y="460" font-family="system-ui" font-weight="bold" font-size="22" fill="#0B0F17" text-anchor="middle" letter-spacing="1">${btnLabel}</text>
      </g>
      
      <!-- Animated Cursor -->
      <g transform="translate(${cursorX}, ${cursorY})">
        <path d="M 0 0 L 0 24 L 6 18 L 14 24 L 18 20 L 10 14 L 18 14 Z" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
      </g>
      
      <text x="720" y="570" font-family="monospace" font-size="14" fill="#64748B" text-anchor="middle">STATUS: ${isClicked ? 'EXECUTED (HTTP 200 OK)' : 'WAITING FOR POINTER EVENT'}</text>
    </svg>`;

    const frameFile = path.join(tmp, `frame_${String(f).padStart(3, '0')}.png`);
    await sharp(Buffer.from(svg)).png().toFile(frameFile);
  }

  console.log('Encoding with FFmpeg...');
  execFileSync(ffmpeg, [
    '-y',
    '-framerate', '24',
    '-i', path.join(tmp, 'frame_%03d.png'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'ultrafast',
    '-movflags', '+faststart',
    'test_animated_button.mp4'
  ]);

  console.log('Animated button video created! Size:', fs.statSync('test_animated_button.mp4').size);
  fs.readdirSync(tmp).forEach(f => fs.unlinkSync(path.join(tmp, f)));
  fs.rmdirSync(tmp);
}

testAnimatedButtonVideo();

