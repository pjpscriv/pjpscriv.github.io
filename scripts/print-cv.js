#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:1313';
const ROOT = path.join(__dirname, '..');

const DEFAULT_MARGIN = { top: '1.5cm', bottom: '1.5cm', left: '1.5cm', right: '1.5cm' };

const CVS = [{
  lang: 'en',
  url: `${BASE_URL}/cv`,
  outputDir: path.join(ROOT, 'content', 'en'),
  filename: 'cv.pdf',
  margin: { ...DEFAULT_MARGIN }
}, {
  lang: 'fr',
  url: `${BASE_URL}/fr/cv`,
  outputDir: path.join(ROOT, 'content', 'fr'),
  filename: 'cv.pdf',
  margin: { ...DEFAULT_MARGIN, top: '1cm', bottom: '0.5cm' }
}];

async function printCVs() {
  const browser = await chromium.launch({ headless: true });

  try {
    for (const { lang, url, outputDir, filename, margin } of CVS) {
      console.log(`Printing ${lang.toUpperCase()} CV from ${url}...`);
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const outputPath = path.join(outputDir, filename);
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin,
      });

      await page.close();
      console.log(`  Saved: ${outputPath}`);
    }
  } finally {
    await browser.close();
  }
}

printCVs().catch(err => {
  console.error(err);
  process.exit(1);
});
