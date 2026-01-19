import ProductLayout from '../../components/ProductLayout';
import content from '../../content/mediterrane-potgrond.json';

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

  const coreBlock = content.core as ContentBlock | undefined;

  const short_description = (() => {
    if (content?.hero?.subtitle) return String(content.hero.subtitle).trim();
    const p = extractParagraphs(coreBlock?.html ?? coreBlock?.text ?? coreBlock?.content ?? '')[0];
    return p || '';
  })();

  const coreParas = extractParagraphs(coreBlock?.html ?? coreBlock?.text ?? coreBlock?.content ?? '');
  const long_description = coreParas.map(p => `<p>${p}</p>`).join('\n');

  // typed arrays
  const sections = (content.sections ?? []) as ContentBlock[];

  const verzorging: Array<{ title?: string; text?: string }> = [];

  if (coreBlock) {
    const h = extractHeading(coreBlock.html ?? coreBlock.text ?? coreBlock.content ?? '');
    const body = coreBlock.html ?? coreBlock.text ?? coreBlock.content ?? '';
    if (h || body) verzorging.push({ title: h || '', text: body || '' });
  }

  const plaatsing: Array<{ title?: string; text?: string }> = [];
  for (const s of sections) {
    const title = s.title ?? '';
    const body = s.html ?? s.text ?? s.content ?? '';
    if (title || body) {
      plaatsing.push({ title: title || '', text: body || '' });
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
    plaatsing: plaatsing.length > 0 ? plaatsing : null,
    price: null,
    cta: null,
  };

  return <ProductLayout page={page} />;
}
