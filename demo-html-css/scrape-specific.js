const puppeteer = require('puppeteer');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const OUTPUT_DIR = path.join(__dirname, 'scraped-images');

const URLS = [
  'https://spaansetuin-enzo.nl/index.php/onze-bomen-en-planten/palmbomen',
  'https://spaansetuin-enzo.nl/index.php/onze-bomen-en-planten/palmbomen/trachycarpus-fortunei',
  'https://spaansetuin-enzo.nl/index.php/onze-bomen-en-planten/palmbomen/cycca-revoluta',
  'https://spaansetuin-enzo.nl/index.php/onze-bomen-en-planten/vijgenbomen/ficus-carica',
  'https://spaansetuin-enzo.nl/index.php/onze-bomen-en-planten/olijfbomen',
  'https://spaansetuin-enzo.nl/index.php/onze-bomen-en-planten/olijfbomen/bonsai-olijfboom',
  'https://spaansetuin-enzo.nl/index.php/onze-bomen-en-planten/olijfbomen/olea-europea',
  'https://spaansetuin-enzo.nl/index.php/onze-bomen-en-planten/olijfbomen/hoija-blanca',
  'https://spaansetuin-enzo.nl/index.php/bloembakken-en-potgrond/bloembakken',
  'https://spaansetuin-enzo.nl/index.php/bloembakken-en-potgrond/bloembakken-klaar-voor-beplanting',
  'https://spaansetuin-enzo.nl/index.php/bloembakken-en-potgrond/mediterraan-potgrond'
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    protocol.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      } else {
        file.close(); fs.unlink(filepath, () => {});
        reject(new Error('Status ' + res.statusCode));
      }
    }).on('error', (err) => { fs.unlink(filepath, () => {}); reject(err); });
  });
}

function getExtFromUrl(u) {
  try {
    const p = new URL(u).pathname;
    const ext = path.extname(p).toLowerCase();
    return ext || '.jpg';
  } catch { return '.jpg'; }
}

function slugFromUrl(u) {
  try {
    const p = new URL(u).pathname;
    const parts = p.split('/').filter(Boolean);
    return parts[parts.length-1] || 'index';
  } catch { return 'page'; }
}

async function scrapeOne(browser, pageUrl) {
  const page = await browser.newPage();
  console.log('\nScraping:', pageUrl);
  try {
    await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    const images = await page.evaluate(() => {
      const out = [];
      // img tags (defensive) - include data-src and dataset variants
      document.querySelectorAll('img').forEach(img => {
        try {
          const candidates = [];
          if (img.getAttribute) {
            candidates.push(img.getAttribute('src'));
            candidates.push(img.getAttribute('data-src'));
          }
          if (img.src) candidates.push(img.src);
          if (img.dataset && img.dataset.src) candidates.push(img.dataset.src);
          const src = candidates.find(Boolean);
          const s = src ? String(src) : '';
          if (s && !s.startsWith('data:')) out.push(s);
        } catch (e) { /* ignore */ }
      });
      // background images from computed styles and inline style attributes
      document.querySelectorAll('*').forEach(el => {
        try {
          const computed = window.getComputedStyle(el).getPropertyValue('background-image') || '';
          const inline = el.getAttribute && (el.getAttribute('style') || '');
          const combined = computed + '|' + inline;
          const match = combined.match(/url\((?:'|")?(.*?)(?:'|")?\)/);
          if (match && match[1]) {
            const url = String(match[1]);
            if (url && !url.startsWith('data:')) out.push(url);
          }
        } catch (e) { /* ignore */ }
      });
      return Array.from(new Set(out));
    });

    const slug = slugFromUrl(pageUrl);
    const dir = path.join(OUTPUT_DIR, slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const mapping = [];
    let i = 1;
    for (const src of images) {
      let abs = src;
      if (!src.startsWith('http')) {
        try { const base = new URL(pageUrl); abs = new URL(src, base.origin + base.pathname).href; } catch { abs = src; }
      }
      const ext = getExtFromUrl(abs);
      const filename = `img${i}${ext}`;
      const filepath = path.join(dir, filename);
      try {
        await downloadImage(abs, filepath);
        console.log('  ✓', filename);
        mapping.push({ filename, original: abs });
        i++;
      } catch (err) {
        console.log('  ✗ failed', abs, err.message);
      }
    }
    fs.writeFileSync(path.join(dir, 'mapping.json'), JSON.stringify({ page: slug, url: pageUrl, images: mapping }, null, 2));
    await page.close();
  } catch (err) {
    console.log('  ✗ error visiting', pageUrl, err.message);
    await page.close();
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const u of URLS) {
    await scrapeOne(browser, u);
    await new Promise(r => setTimeout(r, 500));
  }
  await browser.close();
  console.log('\nDone');
})();
