import sharp from 'sharp';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../src/assets/images');
fs.mkdirSync(outDir, { recursive: true });

const images = [
  { url: 'https://retroinsomnium.weebly.com/uploads/1/5/3/2/153297959/artfight-icon-2025_orig.png', name: 'artfight-icon' },
  { url: 'https://retroinsomnium.weebly.com/uploads/1/5/3/2/153297959/laurence-1_orig.png',         name: 'laurence' },
  { url: 'https://retroinsomnium.weebly.com/uploads/1/5/3/2/153297959/octavia_orig.png',             name: 'octavia' },
  { url: 'https://retroinsomnium.weebly.com/uploads/1/5/3/2/153297959/reeds-room-concept_orig.png',  name: 'reeds-room-concept' },
  { url: 'https://retroinsomnium.weebly.com/uploads/1/5/3/2/153297959/gil-2025-bday_orig.png',       name: 'gil' },
  { url: 'https://retroinsomnium.weebly.com/uploads/1/5/3/2/153297959/mango-being-hot_orig.png',     name: 'mango' },
  { url: 'https://retroinsomnium.weebly.com/uploads/1/5/3/2/153297959/screenshot-2025-07-09-154635_orig.png', name: 'scene-3d' },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

for (const { url, name } of images) {
  const outPath = path.join(outDir, `${name}.webp`);
  console.log(`Downloading ${name}...`);
  const buf = await fetchBuffer(url);
  await sharp(buf).webp({ quality: 88 }).toFile(outPath);
  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`  → ${name}.webp (${kb} KB)`);
}

console.log('Done.');
