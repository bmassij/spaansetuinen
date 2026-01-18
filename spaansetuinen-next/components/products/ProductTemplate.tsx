import React from 'react';

export type ProductProps = {
  title?: string;
  short_description?: string;
  long_description?: string;
  heroImage?: string;
  gallery?: string[];
  kenmerken?: string[];
  verzorging?: Record<string, any> | string;
  plaatsing?: Record<string, any> | string;
  price?: string | null;
  cta?: any;
};

// Helper: safe extract first non-empty line
function firstLine(s?: string) {
  if (!s) return '';
  const parts = s.split('\n').map(p => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts[0] : '';
}

// Helper: produce a short readable summary for info-boxes
function getSummaryText(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return firstLine(value);
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === 'string') return firstLine(item);
      if (item && typeof item === 'object') {
        const c = item.content || item.text || item.body || item.intro;
        if (typeof c === 'string' && c.trim()) return firstLine(c);
      }
    }
    return '';
  }
  if (typeof value === 'object') {
    // common shape: { sections: [ { title, content } ] }
    if (Array.isArray(value.sections) && value.sections.length > 0) {
      const s = value.sections[0];
      return (s && (s.content || s.text || s.body || s.intro)) ? firstLine(s.content || s.text || s.body || s.intro) : '';
    }
    // fallback: pick first string property
    for (const v of Object.values(value)) {
      if (typeof v === 'string' && v.trim()) return firstLine(v);
      if (Array.isArray(v)) {
        for (const item of v) {
          if (typeof item === 'string' && item.trim()) return firstLine(item);
        }
      }
      if (v && typeof v === 'object') {
        const c = v.content || v.text || v.body || v.intro;
        if (typeof c === 'string' && c.trim()) return firstLine(c);
      }
    }
  }
  return '';
}

// Helper: render sections for detailed rendering (verzorging / plaatsing)
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
    // fallback: render first string properties
    const nodes: JSX.Element[] = [];
    Object.values(value).forEach((v, i) => {
      if (typeof v === 'string') nodes.push(<p key={i}>{v}</p>);
      else if (Array.isArray(v)) {
        v.forEach((it, j) => { if (typeof it === 'string') nodes.push(<p key={`${i}-${j}`}>{it}</p>); });
      }
    });
    return nodes.length > 0 ? nodes : null;
  }
  return null;
}

// Helper: render CTA content safely
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

export default function ProductTemplate(props: ProductProps) {
  const {
    title,
    short_description,
    long_description,
    heroImage,
    gallery,
    kenmerken,
    verzorging,
    plaatsing,
    price,
    cta,
  } = props;

  // helper: choose main visual
  const mainImage = (gallery && gallery.length > 0) ? gallery[0] : heroImage;

  return (
    <div className="min-h-screen">
      {/* Hero (preserve existing look) */}
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">{title || ''}</h1>
              <p className="text-lg sm:text-xl text-emerald-50 leading-relaxed">{short_description || ''}</p>
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

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-6">
          <ol className="flex items-center space-x-2">
            <li>Home</li>
            <li>/</li>
            <li>Onze bomen</li>
            <li>/</li>
            <li className="font-medium">{title || ''}</li>
          </ol>
        </nav>

        {/* 1) Intro (full width) */}
        {(short_description || (props as any).intro) && (
          <>
            <section className="mb-6">
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{short_description || (props as any).intro}</p>
              </div>
            </section>

            {/* Info-box grid (compact summaries) */}
            <section className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Standplaats */}
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Standplaats</h4>
                  <p className="text-sm text-gray-700">{getSummaryText(plaatsing)}</p>
                </div>

                {/* Kenmerken */}
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Kenmerken</h4>
                  <p className="text-sm text-gray-700">{(kenmerken && kenmerken.length > 0) ? kenmerken.slice(0, 3).join(', ') : ''}</p>
                </div>

                {/* Verzorging */}
                <div className="bg-emerald-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Verzorging</h4>
                  <p className="text-sm text-gray-700">{getSummaryText(verzorging)}</p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* 2) Two-column section: left=content, right=visual */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: structured text in fixed order */}
          <div className="space-y-8">
            {/* Plaatsing */}
            {plaatsing && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-emerald-600 pl-4">Ideale standplaats</h2>
                <div className="text-gray-700 space-y-4">
                  {renderSections(plaatsing)}
                </div>
              </div>
            )}

            {/* Kenmerken */}
            {kenmerken && kenmerken.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-3">Kenmerken</h3>
                <ul className="space-y-2 bg-emerald-50 rounded-lg p-6 list-disc pl-5 text-gray-700">
                  {kenmerken.map((k, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1 text-emerald-600">✓</span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verzorging */}
            {verzorging && (
              <div>
                <h3 className="text-2xl font-semibold mb-3">Verzorging</h3>
                <div className="space-y-4 text-gray-700">
                  {renderSections(verzorging)}
                </div>
              </div>
            )}

            {/* Details / lange beschrijving */}
            {long_description && (
              <div>
                <h3 className="text-2xl font-semibold mb-3">Details</h3>
                <div className="prose max-w-none text-gray-700">{long_description}</div>
              </div>
            )}
          </div>

          {/* Right: visual block (large image or decorative) */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white/10 border border-white/20 h-96 flex items-center justify-center">
              {mainImage ? (
                // show main image
                // eslint-disable-next-line @next/next/no-img-element
                <img src={mainImage} alt={title || ''} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🌿</div>
                  <p className="text-emerald-50 font-medium">{title || ''}</p>
                  <p className="text-emerald-200 text-sm mt-2">Afbeelding volgt</p>
                </div>
              )}
            </div>

            {/* small gallery thumbnails if present */}
            {gallery && gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {gallery.slice(1, 5).map((g, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={g} alt={`${title || ''} ${i + 2}`} className="w-full h-24 object-cover rounded" />
                ))}
              </div>
            )}

          </aside>
        </section>

        {/* 3) Full-width gallery section (if many images) */}
        {gallery && gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">Afbeeldingen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {gallery.map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={g} alt={`${title || ''} ${i + 1}`} className="w-full h-60 object-cover rounded" />
              ))}
            </div>
          </section>
        )}

        {/* 4) CTA block full width */}
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
      </main>
    </div>
  );
}
