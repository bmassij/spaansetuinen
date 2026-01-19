import ProductLayout from '../../components/ProductLayout';
import content from '../../content/bezorgen.json';

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
    // fallback: first paragraph from core
    const p = extractParagraphs(coreBlock?.html ?? coreBlock?.text ?? coreBlock?.content ?? '')[0];
    return p || '';
  })();

  // long_description must contain only <p> paragraphs (no headings, no wrappers)
  const coreParas = extractParagraphs(coreBlock?.html ?? coreBlock?.text ?? coreBlock?.content ?? '');
  const long_description = coreParas.map(p => `<p>${p}</p>`).join('\n');

  // typed content arrays
  const services = (content.services ?? []) as ContentBlock[];
  const sections = (content.sections ?? []) as ContentBlock[];
  const benefits = (content.benefits ?? []) as ContentBlock[];

  // Map service sections into verzorging
  const verzorging: Array<{ title?: string; text?: string }> = [];

  // core: try to extract heading + raw body
  if (coreBlock) {
    const h = extractHeading(coreBlock.html ?? coreBlock.text ?? coreBlock.content ?? '');
    const body = coreBlock.html ?? coreBlock.text ?? coreBlock.content ?? '';
    if (h || body) {
      verzorging.push({ title: h || '', text: body || '' });
    }
  }

  // services -> verzorging
  for (const s of services) {
    const title = s.title ?? extractHeading(s.html ?? s.text ?? s.content ?? '');
    const body = s.html ?? s.text ?? s.content ?? '';
    if (title || body) {
      verzorging.push({ title: title || '', text: body || '' });
    }
  }

  // sections -> plaatsing
  const plaatsing: Array<{ title?: string; text?: string }> = [];
  for (const s of sections) {
    const title = s.title ?? '';
    const body = s.html ?? s.text ?? s.content ?? '';
    if (title || body) {
      plaatsing.push({ title: title || '', text: body || '' });
    }
  }

  // benefits -> details
  const details: Array<{ title?: string; text?: string }> = [];
  for (const b of benefits) {
    const title = b.title ?? '';
    const body = b.html ?? b.text ?? b.content ?? '';
    if (body) details.push({ title, text: body });
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
    // map details into long_description fallback area if desired; keep as null to avoid altering ProductTemplate
    price: null,
    cta: null,
  };

  return <ProductLayout page={page} />;
}
