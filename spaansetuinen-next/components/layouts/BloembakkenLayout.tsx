import React from "react";
import MainMenuTemplate from "./MainMenuTemplate";

type Props = {
  content: any;
  showServiceCards?: boolean;
};

export default function BloembakkenLayout({ content, showServiceCards = false }: Props) {
  const title: string = String(content?.title ?? "");
  const description: string = content?.description ? String(content.description) : "";
  const details: string[] = Array.isArray(content?.details) ? content.details : [];
  const pricing: any = content?.pricing ?? null;
  const cta: any = content?.cta ?? null;
  
  const hasRealImages = Array.isArray(content?.images) && content.images.length > 0;
  const realImages: string[] = hasRealImages ? content.images.slice(0, 2) : [];

  // Build text content (description + details/sections)
  // Use description (or intro) and render as paragraphs with smart formatting
  const descriptionSource: string = String(content?.description ?? content?.intro ?? "");

  // Helper: renderRichText — conservative formatter (no HTML parsing, no rewriting)
  const renderRichText = (text: string) => {
    if (!text) return '';
    const normalized = String(text).replace(/\r\n/g, '\n').trim();
    if (!normalized) return '';

    // Split on double newlines into paragraphs (user requirement)
    const blocks = normalized.split(/\n{2,}/g).map(b => b.trim()).filter(Boolean);
    let out = '';

    blocks.forEach(block => {
      const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length === 0) return;

      // If block contains list-like lines (starting with "- "), render as <ul>
      if (lines.some(l => l.startsWith('- '))) {
        const items: string[] = [];
        for (let i = 0; i < lines.length; i++) {
          const l = lines[i];
          if (l.startsWith('- ')) {
            // start new item
            items.push(l.substring(2));
          } else {
            // continuation line: append to previous item
            if (items.length > 0) {
              items[items.length - 1] = items[items.length - 1] + ' ' + l;
            } else {
              // fallback: treat as paragraph
              out += `<p class="text-gray-700 leading-relaxed mb-4">${l}</p>`;
            }
          }
        }
        if (items.length > 0) {
          out += `<ul class="list-disc pl-6 mb-4 space-y-2 text-gray-700">${items.map(it => `<li>${it}</li>`).join('')}</ul>`;
        }
      } else {
        // No lists: if single short line and looks like a heading, render as <h3>
        if (lines.length === 1 && lines[0].length < 80) {
          out += `<h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900">${lines[0]}</h3>`;
        } else {
          // join lines into a single paragraph preserving intra-line breaks as spaces
          out += `<p class="text-gray-700 leading-relaxed mb-4">${lines.join(' ')}</p>`;
        }
      }
    });

    return out;
  };

  const isTargetPage = String(title ?? '').trim() === 'Plant- en voedingstips';

  // default fallback paragraph builder (keeps previous behavior for other pages)
  const defaultParagraphs = descriptionSource
    .replace(/\r\n/g, '\n')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p class="text-gray-700 leading-relaxed">${p}</p>`)
    .join('');

  const paragraphs = isTargetPage ? renderRichText(descriptionSource) : defaultParagraphs;

  // Prefer explicit `details` array, fall back to `sections` (used by many voeding/planten pages)
  const sections = Array.isArray(content?.details) ? content.details : (Array.isArray(content?.sections) ? content.sections : []);
  
  // Apply renderRichText to sections content when on target page
  const renderSectionContent = (txt: string) => {
    return isTargetPage ? renderRichText(String(txt ?? '')) : String(txt ?? '').replace(/\r\n/g, '\n').split(/\n+/).map(t => `<p class="text-gray-700 text-sm mb-2">${t.trim()}</p>`).join('');
  };
  // For specific pages we may skip rendering the details column (boomschors, bloembakken-prijzen) or render sections inline for voeding
  const skipDetailsForBoomschors = /boomschors/i.test(String(title));
  const skipDetailsForPrijzen = /prijzen/i.test(String(title)) || String(content?.slug ?? '').includes('prijzen');
  const skipDetailsForVoeding = /voeding/i.test(String(title)) || String(content?.slug ?? '').includes('voeding');
  // Build either a separate details column or inline sections for voeding pages
  let detailsHtml = "";
  let inlineSectionsHtml = "";
  if (!skipDetailsForBoomschors && !skipDetailsForPrijzen && sections && sections.length > 0 && !skipDetailsForVoeding) {
    detailsHtml = `<section class="bg-emerald-50 rounded-lg p-6 mb-8"><h3 class="text-2xl font-semibold mb-3 text-gray-900">Details</h3><ul class="list-disc pl-6 space-y-4 text-gray-700">${sections.map((s: any) => {
      if (typeof s === 'string') return `<li>${String(s)}</li>`;
      const title = s.title ? `<strong class="block text-gray-900">${String(s.title)}</strong>` : '';
      const contentHtml = s.content ? renderSectionContent(s.content) : '';
      return `<li>${title}${contentHtml}</li>`;
    }).join('')}</ul></section>`;
  } else if (skipDetailsForVoeding && sections && sections.length > 0) {
    inlineSectionsHtml = sections.map((s: any) => {
      if (typeof s === 'string') return `<div class="mb-4"><p class="text-gray-700">${String(s)}</p></div>`;
      const heading = s.title ? `<h3 class="text-xl font-semibold mb-2 text-gray-900">${String(s.title)}</h3>` : '';
      const contentHtml = s.content ? renderSectionContent(s.content) : '';
      return `<div class="mb-6">${heading}<div class="text-gray-700">${contentHtml}</div></div>`;
    }).join('');
  }

  // Text content (left column)
  const textContentHtml = `${paragraphs}${detailsHtml}${inlineSectionsHtml}`;
  // Placeholder JSX for styled placeholders
  const placeholderHtml = `
    <div class="h-64 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 border border-white/20 shadow-lg flex items-center justify-center">
      <div class="text-center text-white/80">
        <div class="text-3xl mb-2">🌳</div>
        <div class="text-sm tracking-wide">Afbeelding volgt</div>
      </div>
    </div>
  `;

  // Image container HTML (right column)
  const imageContainerHtml = hasRealImages
    ? `<div class="space-y-6">${realImages.map(img => `<img src="${String(img)}" alt="Bloembakken" class="w-full h-64 object-cover rounded-lg shadow-lg" />`).join("")}</div>`
    : `<div class="space-y-6">${placeholderHtml}${placeholderHtml}</div>`;

  // Always show 2-column layout
  const mainContentHtml = `<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"><div>${textContentHtml}</div><div>${imageContainerHtml}</div></div>`;

  const pricingHtml = pricing && Array.isArray(pricing.items) && pricing.items.length > 0
    ? `<section class="bg-blue-50 rounded-lg p-6 mb-8"><h3 class="text-2xl font-semibold mb-4 text-gray-900">${pricing.title || "Prijzen"}</h3>${pricing.description ? `<div class="mb-4 text-gray-700">${String(pricing.description).replace(/\r\n/g, '\n').split(/\n+/).map(p => `<p class="mb-2">${p.trim()}</p>`).join('')}</div>` : ''}<div class="space-y-3">${pricing.items.map((item: any) => `<div class="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm"><span class="text-gray-700 font-medium">${String(item.description)}</span><span class="text-emerald-600 font-bold text-lg">${String(item.price)}</span></div>`).join("")}</div></section>`
    : "";

  const ctaBodyText = cta && (cta.body || cta.intro) ? (isTargetPage ? renderRichText(String(cta.body ?? cta.intro)) : String(cta.body ?? cta.intro).replace(/\r\n/g, '\n').split(/\n+/).map(p => `<p class="text-lg text-emerald-50 mb-2">${p.trim()}</p>`).join('')) : '';
  const ctaHtml = cta
    ? `<section class="w-full py-12"><div class="max-w-5xl mx-auto"><div class="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">${cta.heading ? `<h2 class=\"text-3xl font-bold mb-4\">${String(cta.heading)}</h2>` : ""}${ctaBodyText ? `<div class="mb-4">${ctaBodyText}</div>` : ""}<div class=\"flex flex-wrap justify-center gap-4\">${cta.phone && cta.phone.href ? `<a href=\"${String(cta.phone.href)}\" class=\"inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg\">📞 ${String(cta.phone.text ?? cta.phone)}</a>` : ""}${cta.email && cta.email.href ? `<a href=\"${String(cta.email.href)}\" class=\"inline-flex items-center px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg\">✉️ ${String(cta.email.text ?? cta.email)}</a>` : ""}</div></div></div></section>`
    : "";

  const coreHtml = `${mainContentHtml}${pricingHtml}${ctaHtml}`;

  const payload = {
    hero: { title },
    core: { html: coreHtml },
    // keep details present for tooling that may inspect it
    details: details,
  };

  return <MainMenuTemplate content={payload} showServiceCards={showServiceCards} />;
}
