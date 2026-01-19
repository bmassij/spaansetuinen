import ProductLayout from '../../components/ProductLayout';
import content from '../../content/mediterrane-voeding.json';

type ContentBlock = {
  title?: string;
  html?: string;
  text?: string;
  content?: string;
};

function stripTags(html?: string) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function extractParagraphs(html?: string) {
  if (!html) return [];
  const matches = html.match(/<p[\s\S]*?>[\s\S]*?<\/p>/gi);
  if (!matches) {
    const text = stripTags(html);
    return text ? [text] : [];
  }
  return matches.map(p => {
    const inner = p.replace(/<p[^>]*>/i, '').replace(/<\/p>/i, '');
    return stripTags(inner);
  });
}

function extractHeading(html?: string) {
  if (!html) return '';
  const m = html.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
  return m ? stripTags(m[1]) : '';
}

export default function Page() {
  const title = content?.hero?.title || '';

  const short_description = (() => {
    if (content?.hero?.subtitle) return String(content.hero.subtitle).trim();
    const p = extractParagraphs(content?.core?.html || '')[0];
    return p || '';
  })();

  const coreParas = extractParagraphs(content?.core?.html || '');
  const long_description = coreParas.map(p => `<p>${p}</p>`).join('\n');

  const verzorging: Array<{ title?: string; text?: string }> = [];

  if (content?.core) {
    const h = extractHeading(content.core.html ?? '');
    const paras = extractParagraphs(content.core.html ?? '');
    if (h || paras.length > 0) {
      verzorging.push({ title: h || '', text: paras.join('\n\n') || '' });
    }
  }

  const page = {
    title,
    short_description,
    long_description,
    heroImage: content?.hero?.image || '',
    gallery: [],
    kenmerken: [],
    verzorging: verzorging.length > 0 ? verzorging : null,
    plaatsing: null,
    price: null,
    cta: null,
  };

  return <ProductLayout page={page} />;
}
