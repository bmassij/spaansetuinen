const puppeteer = require('puppeteer');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const BASE_URL = 'https://spaansetuin-enzo.nl';
const OUTPUT_DIR = path.join(__dirname, 'scraped-images');

// Pagina's om te scrapen
const PAGES = [
  { url: '/', name: 'index' },
  { url: '/over-ons/', name: 'over-ons' },
  { url: '/palmbomen/', name: 'palmbomen' },
  { url: '/trachycarpus-fortunei/', name: 'trachycarpus-fortunei' },
  { url: '/cycca-revoluta/', name: 'cycca-revoluta' },
  { url: '/vijgenbomen/', name: 'vijgenbomen' },
  { url: '/ficus-carica/', name: 'ficus-carica' },
  { url: '/olijfbomen/', name: 'olijfbomen' },
  { url: '/bonsai-olijfboom/', name: 'bonsai-olijfboom' },
  { url: '/olea-europea/', name: 'olea-europea' },
  { url: '/hojia-blanca/', name: 'hojia-blanca' },
  { url: '/overige-bomen/', name: 'overige-bomen' },
  { url: '/druivenranken/', name: 'druivenranken' },
  { url: '/granaatappelbomen/', name: 'granaatappelbomen' },
  { url: '/bloembakken/', name: 'bloembakken' },
  { url: '/bloembakken-op-maat/', name: 'bloembakken-op-maat' },
  { url: '/mediterrane-potgrond/', name: 'mediterrane-potgrond' },
  { url: '/verhuur/', name: 'verhuur' },
  { url: '/plant-en-voedingstips/', name: 'plant-en-voedingstips' },
  { url: '/bezorgen/', name: 'bezorgen' },
  { url: '/impressie/', name: 'impressie' }
];

// Maak output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Download een afbeelding
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Krijg extensie van URL
function getExtension(url) {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
    return ext;
  }
  return '.jpg'; // default
}

// Scrape een pagina
async function scrapePage(browser, pageInfo) {
  const page = await browser.newPage();
  const pageUrl = BASE_URL + pageInfo.url;
  const pageDir = path.join(OUTPUT_DIR, pageInfo.name);
  
  console.log(`\nScraping: ${pageUrl}`);
  
  // Maak directory voor deze pagina
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }
  
  try {
    await page.goto(pageUrl, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Haal alle afbeeldingen op
    const images = await page.evaluate(() => {
      const imgs = [];
      
      // Reguliere img tags
      document.querySelectorAll('img').forEach((img) => {
        if (img.src && !img.src.includes('data:')) {
          imgs.push({
            src: img.src,
            alt: img.alt || '',
            type: 'img'
          });
        }
      });
      
      // Background images in style attributes
      document.querySelectorAll('[style*="background"]').forEach((el) => {
        const style = el.getAttribute('style');
        const match = style.match(/url\(['"]?([^'")\s]+)['"]?\)/);
        if (match && match[1] && !match[1].includes('data:')) {
          imgs.push({
            src: match[1].startsWith('http') ? match[1] : window.location.origin + match[1],
            alt: 'background',
            type: 'background'
          });
        }
      });
      
      return imgs;
    });
    
    console.log(`Found ${images.length} images`);
    
    // Download alle afbeeldingen
    const imageMap = [];
    let counter = { hero: 1, product: 1, background: 1, other: 1 };
    
    for (const img of images) {
      try {
        // Bepaal type afbeelding
        let prefix = 'other';
        if (img.type === 'background' || img.alt.toLowerCase().includes('hero') || img.alt.toLowerCase().includes('banner')) {
          prefix = 'hero';
        } else if (img.alt.toLowerCase().includes('product') || img.alt.toLowerCase().includes('boom') || img.alt.toLowerCase().includes('palm')) {
          prefix = 'product';
        } else if (img.type === 'background') {
          prefix = 'background';
        }
        
        const ext = getExtension(img.src);
        const filename = `${prefix}${counter[prefix]}${ext}`;
        counter[prefix]++;
        
        const filepath = path.join(pageDir, filename);
        
        await downloadImage(img.src, filepath);
        console.log(`  ✓ Downloaded: ${filename}`);
        
        imageMap.push({
          filename,
          originalUrl: img.src,
          alt: img.alt,
          type: img.type,
          prefix
        });
      } catch (err) {
        console.log(`  ✗ Failed: ${img.src} - ${err.message}`);
      }
    }
    
    // Sla mapping op
    const mappingFile = path.join(pageDir, 'mapping.json');
    fs.writeFileSync(mappingFile, JSON.stringify({
      page: pageInfo.name,
      url: pageUrl,
      scrapedAt: new Date().toISOString(),
      images: imageMap
    }, null, 2));
    
    console.log(`✓ Completed: ${pageInfo.name} (${imageMap.length} images saved)`);
    
  } catch (error) {
    console.error(`✗ Error scraping ${pageUrl}:`, error.message);
  } finally {
    await page.close();
  }
}

// Main functie
async function main() {
  console.log('Starting image scraper for spaansetuin-enzo.nl');
  console.log(`Output directory: ${OUTPUT_DIR}\n`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    for (const pageInfo of PAGES) {
      await scrapePage(browser, pageInfo);
      // Wacht even tussen requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Maak overzichtsbestand
    const summary = {
      scrapedAt: new Date().toISOString(),
      baseUrl: BASE_URL,
      totalPages: PAGES.length,
      pages: PAGES.map(p => p.name)
    };
    
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    console.log('\n✓ All pages scraped successfully!');
    console.log(`Check ${OUTPUT_DIR} for results`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
