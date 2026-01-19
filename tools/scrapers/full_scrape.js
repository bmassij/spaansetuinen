const puppeteer = require('puppeteer');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// OUTPUT: workspace root /scrape_full_dump/
const OUTPUT_ROOT = path.join(__dirname, '..', '..', 'scrape_full_dump');
const BASE_URL = 'https://spaansetuin-enzo.nl';

// Initial seed pages (explicit list from user prompt)
const SEED_PATHS = [
  '/',
  '/mediterrane-potgrond/',
  '/mediterrane-voeding/',
  '/hydrokorrels/',
  '/boomschors/',
  '/verhuur/',
  '/bezorgen/',
  '/plant-en-voedingstips/',
  '/impressie/'
];

// Helpers
if (!fs.existsSync(OUTPUT_ROOT)) fs.mkdirSync(OUTPUT_ROOT, { recursive: true });

function sanitizeSlug(s) {
  const trimmed = String(s).replace(/^\/+|\/+$/g, '');
  return trimmed.replace(/[^a-z0-9-]/gi, '-').toLowerCase() || 'homepage';
}

function getExtFromUrl(u) {
  try {
    const p = new URL(u).pathname;
    const ext = path.extname(p).toLowerCase();
    return ext && ext.length <= 5 ? ext : '.jpg';
  } catch { return '.jpg'; }
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    const req = proto.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      } else {
        file.close(); fs.unlink(filepath, () => {});
        reject(new Error('Status ' + res.statusCode));
      }
    });
    req.on('error', (err) => { file.close(); fs.unlink(filepath, () => {}); reject(err); });
  });
}

function classifyImageCandidate(c, index, total) {
  const low = (s) => (s || '').toLowerCase();
  const cls = low(c.class || '');
  const id = low(c.id || '');
  const alt = low(c.alt || '');
  const parent = low(c.parentClass || '');

  // strong heuristics
  if (cls.includes('hero') || cls.includes('banner') || id.includes('hero') || alt.includes('banner') || parent.includes('hero') || parent.includes('banner')) return 'hero';
  if (cls.includes('slider') || cls.includes('carousel') || cls.includes('gallery') || parent.includes('gallery') || parent.includes('fotos') || cls.includes('gallery')) return 'gallery';
  // first visible image fallback to hero
  if (index === 0) return 'hero';
  // content otherwise
  return 'content';
}

async function scrapePage(browser, pageUrl) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  try {
    await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 60000 });
  } catch (err) {
    console.error('Failed to open', pageUrl, err.message);
    await page.close();
    return null;
  }

  // Extract content
  const data = await page.evaluate(() => {
    // collect textual content
    const title = document.title || '';
    const html = document.documentElement ? document.documentElement.outerHTML : document.body.innerHTML;
    const text = document.body ? document.body.innerText : '';

    // find images (img tags + background-image)
    const out = [];
    document.querySelectorAll('img').forEach(img => {
      try {
        const srcCandidates = [img.getAttribute('src'), img.getAttribute('data-src'), img.src, img.dataset && img.dataset.src].filter(Boolean);
        const src = srcCandidates[0] || '';
        if (src && !src.startsWith('data:')) {
          out.push({ src: src, alt: img.alt || '', class: img.className || '', id: img.id || '', parentClass: img.parentElement ? img.parentElement.className || '' : '', type: 'img' });
        }
      } catch (e) { }
    });

    // background images via computed styles + inline
    document.querySelectorAll('*').forEach(el => {
      try {
        const style = window.getComputedStyle(el).getPropertyValue('background-image') || '';
        const inline = el.getAttribute && (el.getAttribute('style') || '');
        const combined = style + '|' + inline;
        const m = combined.match(/url\((?:'|\")?(.*?)(?:'|\")?\)/);
        if (m && m[1] && !m[1].startsWith('data:')) {
          const url = m[1].startsWith('http') ? m[1] : (window.location.origin + m[1]);
          out.push({ src: url, alt: 'background', class: el.className || '', id: el.id || '', parentClass: el.parentElement ? el.parentElement.className || '' : '', type: 'background' });
        }
      } catch(e) { }
    });

    // dedupe preserving order
    const seen = new Set();
    const imgs = [];
    out.forEach(i => { if (i.src && !seen.has(i.src)) { seen.add(i.src); imgs.push(i); } });

    // find links on same host for product discovery
    const anchors = Array.from(document.querySelectorAll('a[href]')).map(a => a.href).filter(Boolean);

    return { title, html, text, images: imgs, anchors };
  });

  const slug = sanitizeSlug(new URL(pageUrl).pathname);
  const pageDir = path.join(OUTPUT_ROOT, slug);
  if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });
  const imagesDir = path.join(pageDir, 'images');
  if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

  // save text files
  fs.writeFileSync(path.join(pageDir, 'text.html'), data.html, 'utf8');
  fs.writeFileSync(path.join(pageDir, 'text.txt'), data.text, 'utf8');

  // download images and create meta entries
  const imagesMeta = [];
  for (let i = 0; i < data.images.length; i++) {
    const img = data.images[i];
    const abs = img.src.startsWith('http') ? img.src : (new URL(img.src, pageUrl).href);
    const ext = getExtFromUrl(abs);
    const type = classifyImageCandidate(img, i, data.images.length) || 'unknown';
    const seq = String(imagesMeta.filter(im => im.type === type).length + 1).padStart(2, '0');
    const filename = `${slug}__${type}__${seq}${ext}`;
    const filepath = path.join(imagesDir, filename);
    try {
      await downloadImage(abs, filepath);
      imagesMeta.push({ filename, type, source_url: abs });
    } catch (err) {
      // on failure, still record as failed with source_url and mark type unknown
      imagesMeta.push({ filename: `${slug}__${type}__${seq}${ext}`, type, source_url: abs, error: err.message });
    }
  }

  // write meta.json
  const meta = {
    slug,
    url: pageUrl,
    page_title: data.title,
    scrape_date: new Date().toISOString().slice(0,10),
    text_files: ['text.html','text.txt'],
    images: imagesMeta
  };
  fs.writeFileSync(path.join(pageDir, 'meta.json'), JSON.stringify(meta, null, 2), 'utf8');

  await page.close();
  return { slug, url: pageUrl, textLength: (data.text || '').split(/\s+/).filter(Boolean).length, images: imagesMeta.length };
}

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    // BFS crawler within domain but seeded with explicit paths
    const toVisit = SEED_PATHS.map(p => new URL(p, BASE_URL).href);
    const visited = new Set();
    const overviewEntries = [];

    while (toVisit.length) {
      const url = toVisit.shift();
      if (!url || visited.has(url)) continue;
      if (!url.startsWith(BASE_URL)) continue; // enforce domain

      console.log('\nVisiting:', url);
      const result = await scrapePage(browser, url);
      visited.add(url);
      if (result) overviewEntries.push(result);

      // open the page in a new page to harvest anchors for discovery
      try {
        const p = await browser.newPage();
        await p.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
        const anchors = await p.evaluate(() => Array.from(document.querySelectorAll('a[href]')).map(a => a.href));
        await p.close();
        anchors.forEach(h => {
          if (!h) return;
          if (!h.startsWith(BASE_URL)) return;
          // only follow product-like or relevant paths
          const pathPart = new URL(h).pathname.toLowerCase();
          const accept = [
            '/index.php/onze-bomen-en-planten',
            '/onze-bomen-en-planten',
            '/palmbomen',
            '/ficus-carica',
            '/olea-europea',
            '/bonsai-olijfboom',
            '/trachycarpus-fortunei',
            '/vijgenbomen',
            '/bloembakken',
            '/bloembakken-op-maat',
            '/mediterrane-potgrond'
          ];
          if (accept.some(a => pathPart.includes(a)) && !visited.has(h) && !toVisit.includes(h)) {
            toVisit.push(h);
          }
        });
      } catch (err) {
        // ignore discovery errors
      }

      // small delay
      await new Promise(r => setTimeout(r, 800));
    }

    // create overview file
    const overviewLines = ['# Scrape overview', ''];
    for (const e of overviewEntries) {
      let textAmount = 'weinig';
      if (e.textLength > 800) textAmount = 'veel';
      else if (e.textLength > 200) textAmount = 'middel';
      const noteParts = [];
      if (e.images > 8) noteParts.push('veel beeldmateriaal');
      // no interpretation beyond these constatations
      overviewLines.push(`- ${e.slug} — tekst: ${textAmount} — afbeeldingen: ${e.images}`);
      if (noteParts.length) overviewLines.push(`  - opmerkingen: ${noteParts.join('; ')}`);
    }
    fs.writeFileSync(path.join(OUTPUT_ROOT, '_overview.md'), overviewLines.join('\n'), 'utf8');

    console.log('\nVolledige her-scrape afgerond — alle content is traceerbaar en klaar voor vergelijking.');
  } catch (err) {
    console.error('Error during full scrape:', err.message);
  } finally {
    await browser.close();
  }
})();
