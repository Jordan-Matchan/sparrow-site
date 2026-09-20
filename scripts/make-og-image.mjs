// Renders scripts/og-card.html to public/og-image.png (2400×1260, 2× of 1200×630).
// Usage: node scripts/make-og-image.mjs   (needs playwright + a Chromium: npx playwright install chromium)
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto('file://' + path.join(here, 'og-card.html'), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(here, '..', 'public', 'og-image.png'), type: 'png' });
await browser.close();
console.log('wrote public/og-image.png');
