import React from "react";
import MainMenuTemplate from "./MainMenuTemplate";

type Props = {
  content: any;
};

export default function BloembakkenLayout({ content }: Props) {
  const title: string = String(content?.title ?? "");
  const description: string = content?.description ? String(content.description) : "";
  const details: string[] = Array.isArray(content?.details) ? content.details : [];
  const cta: any = content?.cta ?? null;

  // Build core.html: description -> details -> CTA as raw HTML so MainMenuTemplate renders it inline
  const paragraphs = description
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p class="text-gray-700 leading-relaxed">${p}</p>`)
    .join("");

  const detailsHtml = details && details.length > 0
    ? `<section class="bg-emerald-50 rounded-lg p-6 mb-8"><h3 class="text-2xl font-semibold mb-3 text-gray-900">Details</h3><ul class="list-disc pl-6 space-y-2 text-gray-700">${details.map(d => `<li>${String(d)}</li>`).join("")}</ul></section>`
    : "";

  const ctaHtml = cta
    ? `<section class="w-full py-12"><div class="max-w-5xl mx-auto"><div class="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">${cta.heading ? `<h2 class=\"text-3xl font-bold mb-4\">${String(cta.heading)}</h2>` : ""}${(cta.body || cta.intro) ? `<p class=\"text-lg text-emerald-50 mb-4\">${String(cta.body ?? cta.intro)}</p>` : ""}<div class=\"flex flex-wrap justify-center gap-4\">${cta.phone && cta.phone.href ? `<a href=\"${String(cta.phone.href)}\" class=\"inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg\">📞 ${String(cta.phone.text ?? cta.phone)}</a>` : ""}${cta.email && cta.email.href ? `<a href=\"${String(cta.email.href)}\" class=\"inline-flex items-center px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg\">✉️ ${String(cta.email.text ?? cta.email)}</a>` : ""}</div></div></div></section>`
    : "";

  const coreHtml = `${paragraphs}${detailsHtml}${ctaHtml}`;

  const payload = {
    hero: { title },
    core: { html: coreHtml },
    // keep details present for tooling that may inspect it
    details: details,
  };

  return <MainMenuTemplate content={payload} showServiceCards={false} />;
}
