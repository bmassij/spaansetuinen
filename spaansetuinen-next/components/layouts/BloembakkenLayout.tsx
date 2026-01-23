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
  // Use description (or intro) and render as paragraphs
  const descriptionSource: string = String(content?.description ?? content?.intro ?? "");
  const paragraphs = descriptionSource
    .replace(/\r\n/g, '\n')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p class="text-gray-700 leading-relaxed">${p}</p>`)
    .join("");

  // Prefer explicit `details` array, fall back to `sections` (used by many voeding/planten pages)
  const sections = Array.isArray(content?.details) ? content.details : (Array.isArray(content?.sections) ? content.sections : []);
  const renderSectionContent = (txt: string) => String(txt ?? '').replace(/\r\n/g, '\n').split(/\n+/).map(t => `<p class="text-gray-700 text-sm mb-2">${t.trim()}</p>`).join('');
  // For specific pages we skip rendering the details column (boomschors and bloembakken-prijzen)
  const skipDetailsForBoomschors = /boomschors/i.test(String(title));
  const skipDetailsForPrijzen = /prijzen/i.test(String(title)) || String(content?.slug ?? '').includes('prijzen');
  const detailsHtml = (!skipDetailsForBoomschors && !skipDetailsForPrijzen && sections && sections.length > 0)
    ? `<section class="bg-emerald-50 rounded-lg p-6 mb-8"><h3 class="text-2xl font-semibold mb-3 text-gray-900">Details</h3><ul class="list-disc pl-6 space-y-4 text-gray-700">${sections.map((s: any) => {
        if (typeof s === 'string') return `<li>${String(s)}</li>`;
        const title = s.title ? `<strong class="block text-gray-900">${String(s.title)}</strong>` : '';
        const contentHtml = s.content ? renderSectionContent(s.content) : '';
        return `<li>${title}${contentHtml}</li>`;
      }).join('')}</ul></section>`
    : "";

  // Text content (left column)
  const textContentHtml = `${paragraphs}${detailsHtml}`;

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

  const ctaBodyText = cta && (cta.body || cta.intro) ? String(cta.body ?? cta.intro).replace(/\r\n/g, '\n').split(/\n+/).map(p => `<p class="text-lg text-emerald-50 mb-2">${p.trim()}</p>`).join('') : '';
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
