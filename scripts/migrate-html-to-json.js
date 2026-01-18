const fs = require('fs');
const path = require('path');

const files = [
  'cycca-revoluta.html',
  'ficus-carica.html',
  'trachycarpus-fortunei.html',
  'bonsai-olijfboom.html',
  'granaatappelbomen.html',
  'hojia-blanca.html',
  'olea-europea.html',
  'olea-europea-andalusia.html',
  'olea-europea-bonsai-doble.html',
  'olea-europea-bonsai-ramif.html',
  'olea-europea-copa.html',
  'olea-europea-hoija-blanca.html',
  'olea-europea-lechin.html',
  'olea-europea-multi-bola-multi-plato.html',
  'olea-europea-pata-bola.html',
  'olea-europea-piel-joven.html',
  'olea-europea-piel-vieja.html',
  'olea-europea-plato.html',
  'olea-europea-tarrina.html',
  'olea-europea-tubo.html'
];

const srcDir = path.join(process.cwd(), 'website', 'public');
const destDir = path.join(process.cwd(), 'spaansetuinen-next', 'content');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

files.forEach((file) => {
  const srcPath = path.join(srcDir, file);
  if (!fs.existsSync(srcPath)) {
    console.warn(`SKIP: source not found: ${srcPath}`);
    return;
  }

  const raw = fs.readFileSync(srcPath, 'utf8');
  const slug = path.basename(file, '.html');
  const out = {
    slug,
    filename: file,
    html: raw
  };

  const destPath = path.join(destDir, `${slug}.json`);
  fs.writeFileSync(destPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(`WROTE: ${destPath}`);
});

console.log('Done.');
