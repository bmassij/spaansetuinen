/**
 * UNIFIED PAGE LAYOUT — derived from ProductTemplate
 * --------------------------------------------------
 * Purpose: single, visual-consistent template for all pages.
 * Reuses ProductTemplate structure and classes; product-specific blocks
 * (price / kenmerken / cta / variants) render only if the corresponding
 * data exists on the incoming `page` object. No new design introduced.
 */

import React from 'react';

export type UnifiedProps = {
  page: any;
};

function firstLine(s?: string) {
  if (!s) return '';
  const parts = s.split('\n').map(p => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts[0] : '';
}

function getSummaryText(value: unknown): string {
  if (!value) return '';
  if (typeof value === 'string') return firstLine(value);
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === 'string') return firstLine(item);
      if (item && typeof item === 'object') {
        const obj = item as Record<string, unknown>;
        if ('content' in obj && typeof obj.content === 'string' && obj.content.trim()) return firstLine(obj.content as string);
        if ('text' in obj && typeof obj.text === 'string' && obj.text.trim()) return firstLine(obj.text as string);
        if ('body' in obj && typeof obj.body === 'string' && obj.body.trim()) return firstLine(obj.body as string);
        if ('intro' in obj && typeof obj.intro === 'string' && obj.intro.trim()) return firstLine(obj.intro as string);
      }
    }
    return '';
  }
  if (typeof value === 'object' && value !== null) {
    const obj = value as Record<string, unknown>;
    if ('sections' in obj && Array.isArray(obj.sections) && obj.sections.length > 0) {
      const s = obj.sections[0];
      if (s && typeof s === 'object') {
        const so = s as Record<string, unknown>;
        if ('content' in so && typeof so.content === 'string' && so.content.trim()) return firstLine(so.content as string);
        if ('text' in so && typeof so.text === 'string' && so.text.trim()) return firstLine(so.text as string);
        if ('body' in so && typeof so.body === 'string' && so.body.trim()) return firstLine(so.body as string);
        if ('intro' in so && typeof so.intro === 'string' && so.intro.trim()) return firstLine(so.intro as string);
      }
      return '';
    }
    for (const v of Object.values(obj)) {
      if (typeof v === 'string' && v.trim()) return firstLine(v);
      if (Array.isArray(v)) {
        for (const item of v) {
          if (typeof item === 'string' && item.trim()) return firstLine(item);
        }
      }
      if (v && typeof v === 'object') {
        const vo = v as Record<string, unknown>;
        if ('content' in vo && typeof vo.content === 'string' && vo.content.trim()) return firstLine(vo.content as string);
        if ('text' in vo && typeof vo.text === 'string' && vo.text.trim()) return firstLine(vo.text as string);
        if ('body' in vo && typeof vo.body === 'string' && vo.body.trim()) return firstLine(vo.body as string);
        if ('intro' in vo && typeof vo.intro === 'string' && vo.intro.trim()) return firstLine(vo.intro as string);
      }
    }
  }
  return '';
}

function renderSections(value: any) {
  if (!value) return null;
  if (typeof value === 'string') return <p>{value}</p>;
  if (Array.isArray(value)) {
    return value.map((item: any, i: number) => {
      if (typeof item === 'string') return <p key={i}>{item}</p>;
      if (item && typeof item === 'object') {
        const title = item.title || item.heading || '';
        const content = item.content || item.text || item.body || item.intro || '';
        return (
          <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
            {title && <h4 className="font-semibold text-gray-900">{title}</h4>}
            {content && <p className="mt-2 text-sm">{String(content)}</p>}
          </div>
        );
      }
      return null;
    });
  }
  if (typeof value === 'object') {
    if (Array.isArray(value.sections)) {
      return value.sections.map((s: any, i: number) => (
        <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
          {s.title && <h4 className="font-semibold text-gray-900">{s.title}</h4>}
          {(s.content || s.text || s.body || s.intro) && (
            <p className="mt-2 text-sm">{String(s.content || s.text || s.body || s.intro)}</p>
          )}
        </div>
      ));
    }
    const nodes: JSX.Element[] = [];
    Object.values(value).forEach((v: any, i: number) => {
      if (typeof v === 'string') nodes.push(<p key={i}>{v}</p>);
      else if (Array.isArray(v)) {
        v.forEach((it: any, j: number) => { if (typeof it === 'string') nodes.push(<p key={`${i}-${j}`}>{it}</p>); });
      }
    });
    return nodes.length > 0 ? nodes : null;
  }
  return null;
}

function renderCTAContent(cta: any) {
  if (!cta) return null;
  if (typeof cta === 'string') return <p className="text-lg text-emerald-50 mb-4">{cta}</p>;
  if (typeof cta === 'object') {
    const heading = cta.heading || cta.title || '';
    const intro = cta.intro || cta.body || cta.text || cta.description || '';
    return (
      <>
        {heading && <p className="text-lg text-emerald-50 font-semibold mb-2">{heading}</p>}
        {intro && <p className="text-lg text-emerald-50 mb-4">{intro}</p>}
      </>
    );
  }
  return null;
}

export default function UnifiedPageLayout({ page }: UnifiedProps) {
  // Map incoming page data to familiar variables — this is intentionally simple.
  const mapped = {
    title: page?.title ?? page?.name,
    short_description: page?.short_description ?? page?.intro,
    long_description: page?.long_description ?? page?.longDescription,
    heroImage: page?.heroImage ?? page?.image,
    gallery: Array.isArray(page?.gallery) ? page.gallery : [],
    kenmerken: Array.isArray(page?.kenmerken) ? page.kenmerken : [],
    verzorging: page?.verzorging ?? null,
    plaatsing: page?.plaatsing ?? null,
    price: page?.price ?? null,
    cta: page?.cta ?? null,
  };

  const { title, short_description, long_description, heroImage, gallery, kenmerken, verzorging, plaatsing, price, cta } = mapped;
  const mainImage = (gallery && gallery.length > 0) ? gallery[0] : heroImage;

  return (
    <div className="min-h-screen">
      {/* HERO — reused 1:1 from ProductTemplate: same height, overlays, container */}
      <header className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white pt-24 pb-16">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: heroImage ? `url('${heroImage}')` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/30 to-emerald-900/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">{title}</h1>
              {String(short_description || '').replace(/\r\n/g, '\n').split('\n\n').filter(p => p.trim()).map((p: string, i: number) => (
                <p key={i} className="mb-4 leading-relaxed text-lg sm:text-xl text-emerald-50">
                  {p}
                </p>
              ))}
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div className="w-full max-w-md h-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🌳</div>
                  <p className="text-white/80 text-sm">Afbeelding volgt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Body intro under breadcrumbs disabled per task */}

        {/* Two-column main section: left=content, right=visual (reused structure) */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            {plaatsing && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-emerald-600 pl-4">Ideale standplaats</h2>
                <div className="text-gray-700 space-y-4">{renderSections(plaatsing)}</div>
              </div>
            )}

            {kenmerken && kenmerken.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-3">Kenmerken</h3>
                <ul className="space-y-2 bg-emerald-50 rounded-lg p-6 list-disc pl-5 text-gray-700">
                  {kenmerken.map((k: any, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1 text-emerald-600">✓</span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {verzorging && (
              <div>
                <h3 className="text-2xl font-semibold mb-3">Verzorging</h3>
                <div className="space-y-4 text-gray-700">{renderSections(verzorging)}</div>
              </div>
            )}

            {long_description && (
              <div>
                <h3 className="text-2xl font-semibold mb-3">Details</h3>
                <div className="prose max-w-none text-gray-700">
                  {String(long_description).replace(/\r\n/g, '\n').split('\n\n').filter(p => p.trim()).map((p: string, i: number) => (
                    <p key={i} className="mb-4 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white/10 border border-white/20 h-96 flex items-center justify-center">
              {mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mainImage} alt={title || ''} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(6,95,70,0.04))' }}>
                  <div className="w-5/6 h-5/6 rounded-2xl bg-gradient-to-br from-emerald-600/6 to-emerald-800/6 flex items-center justify-center shadow-inner">
                    <div className="text-center p-8">
                      <div className="text-8xl mb-4 text-emerald-100 opacity-80">🌿</div>
                      <p className="text-emerald-50 font-medium opacity-90">{title || ''}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {gallery && gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {gallery.slice(1, 5).map((g: any, i: number) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={g} alt={`${title || ''} ${i + 2}`} className="w-full h-24 object-cover rounded" />
                ))}
              </div>
            )}

          </aside>
        </section>

        {/* Full-width gallery (if images) */}
        {gallery && gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">Afbeeldingen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {gallery.map((g: any, i: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={g} alt={`${title || ''} ${i + 1}`} className="w-full h-60 object-cover rounded" />
              ))}
            </div>
          </section>
        )}

        {/* CTA block: render only if price or cta exists (product-specific, conditional) */}
        {(price || cta) && (
          <section className="w-full py-12">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Interesse?</h2>
                {price && <p className="text-lg text-emerald-50 mb-2">{price}</p>}
                {renderCTAContent(cta)}
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="tel:+31611929392" className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg">📞 +31 6 11929392</a>
                  <a href="mailto:lisette@spaansetuin-enzo.nl" className="inline-flex items-center px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg">✉️ E-mail ons</a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
