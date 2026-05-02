import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const src = path.join(root, 'Retro_Insomnium_icon.png');
const outDir = path.join(root, 'public');
mkdirSync(outDir, { recursive: true });

const targets = [
  { name: 'favicon-16.png',       size: 16  },
  { name: 'favicon-32.png',       size: 32  },
  { name: 'favicon-48.png',       size: 48  },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png',         size: 192 },
  { name: 'icon-512.png',         size: 512 },
];

for (const { name, size } of targets) {
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outDir, name));
  console.log(`wrote ${name} (${size}\u00d7${size})`);
}

// Build a multi-size favicon.ico (PNG-payload ICO; supported by all modern browsers + IE11)
const icoSizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  icoSizes.map((s) =>
    sharp(src)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toBuffer()
  )
);

const headerSize = 6;
const entrySize = 16;
const dataOffsetStart = headerSize + entrySize * icoSizes.length;

const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0);                  // reserved
header.writeUInt16LE(1, 2);                  // type = ICO
header.writeUInt16LE(icoSizes.length, 4);    // image count

const entries = Buffer.alloc(entrySize * icoSizes.length);
let offset = dataOffsetStart;
icoSizes.forEach((size, i) => {
  const buf = pngBuffers[i];
  const e = i * entrySize;
  entries.writeUInt8(size === 256 ? 0 : size, e + 0); // width  (0 = 256)
  entries.writeUInt8(size === 256 ? 0 : size, e + 1); // height (0 = 256)
  entries.writeUInt8(0,           e + 2);             // palette
  entries.writeUInt8(0,           e + 3);             // reserved
  entries.writeUInt16LE(1,        e + 4);             // color planes
  entries.writeUInt16LE(32,       e + 6);             // bits per pixel
  entries.writeUInt32LE(buf.length, e + 8);           // image byte size
  entries.writeUInt32LE(offset,     e + 12);          // image offset
  offset += buf.length;
});

const ico = Buffer.concat([header, entries, ...pngBuffers]);
writeFileSync(path.join(outDir, 'favicon.ico'), ico);
console.log(`wrote favicon.ico (${icoSizes.join(',')})`);

// Web app manifest
const manifest = {
  name: 'RETRO INSOMNIUM \u2014 Sparrow Matchan',
  short_name: 'RETRO INSOMNIUM',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
  theme_color: '#0a0a0f',
  background_color: '#0a0a0f',
  display: 'standalone',
};
writeFileSync(path.join(outDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
console.log('wrote site.webmanifest');
