// Script om fix-links.js toe te voegen aan alle HTML bestanden
const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'bezorgen.html',
  'bloembakken-op-maat.html',
  'bloembakken.html',
  'bonsai-olijfboom.html',
  'cycca-revoluta.html',
  'druivenranken.html',
  'ficus-carica.html',
  'granaatappelbomen.html',
  'hojia-blanca.html',
  'impressie.html',
  'index.html',
  'mediterrane-potgrond.html',
  'olea-europea.html',
  'page-template.html',
  'plant-en-voedingstips.html',
  'trachycarpus-fortunei.html',
  'verhuur.html'
];

const scriptTag = '  <script src="fix-links.js"></script>\n';

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check of script tag al bestaat
  if (content.includes('fix-links.js')) {
    console.log(`✓ ${file} already has fix-links.js`);
    return;
  }
  
  // Voeg script tag toe vlak voor </body>
  content = content.replace('</body>', `${scriptTag}</body>`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Added fix-links.js to ${file}`);
});

console.log('\n✅ All HTML files updated!');
