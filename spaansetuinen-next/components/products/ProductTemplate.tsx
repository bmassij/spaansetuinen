/**
 * PRODUCT TEMPLATE — LOCKED
 * ------------------------------------------------
 * Deze component is visueel en structureel definitief.
 * Geen layout-, styling- of structuurwijzigingen toegestaan.
 * Alleen bugfixes bij crashes of TypeScript errors.
 *
 * Wijzigingen aan content gebeuren uitsluitend via JSON.
 * Datum lock: 2026-01-18
 */


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
  isTreePage?: boolean;
};
// Helper: safe extract first non-empty line
function firstLine(s?: string) {
  if (!s) return '';
  const parts = s.split('\n').map(p => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts[0] : '';
}

// Helper: extract the first sentence (used for hero intro)
function firstSentence(s?: string) {
  if (!s) return '';
  const m = s.trim().match(/[^.!?]+[.!?]?/);
  return m ? m[0].trim() : firstLine(s);
}

// Helper: produce a short readable summary for info-boxes
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
    // common shape: { sections: [ { title, content } ] }
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
    // fallback: pick first string property
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

// Helper: boolean check for non-empty structured content
function hasContent(value: unknown): boolean {
  if (!value) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0 && value.some((it) => (typeof it === 'string' ? (it as string).trim().length > 0 : (it && typeof it === 'object')));
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if ('sections' in obj && Array.isArray(obj.sections) && obj.sections.length > 0) return true;
    for (const v of Object.values(obj)) {
      if (typeof v === 'string' && v.trim()) return true;
      if (Array.isArray(v) && v.length > 0) return true;
      if (v && typeof v === 'object') return true;
    }
  }
  return false;
}

// Helper: render sections for detailed rendering (verzorging / plaatsing)
function renderSections(value: any) {
  if (!value) return null;
  if (typeof value === 'string') return <div dangerouslySetInnerHTML={{ __html: value }} />;
  if (Array.isArray(value)) {
    return value.map((item: any, i: number) => {
      if (typeof item === 'string') return <div key={i} dangerouslySetInnerHTML={{ __html: item }} />;
      if (item && typeof item === 'object') {
        const title = item.title || item.heading || '';
        const content = item.content || item.text || item.body || item.intro || '';
        return (
          <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
            {title && <h4 className="font-semibold text-gray-900">{title}</h4>}
            {content && <div className="mt-2 text-sm" dangerouslySetInnerHTML={{ __html: String(content) }} />}
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
            <div className="mt-2 text-sm" dangerouslySetInnerHTML={{ __html: String(s.content || s.text || s.body || s.intro) }} />
          )}
        </div>
      ));
    }
    // fallback: render first string properties
    const nodes: JSX.Element[] = [];
    Object.values(value).forEach((v, i) => {
      if (typeof v === 'string') nodes.push(<div key={i} dangerouslySetInnerHTML={{ __html: v }} />);
      else if (Array.isArray(v)) {
        v.forEach((it, j) => { if (typeof it === 'string') nodes.push(<div key={`${i}-${j}`} dangerouslySetInnerHTML={{ __html: it }} />); });
      }
    });
    return nodes.length > 0 ? nodes : null;
  }
  return null;
}

// Helper: render CTA content safely
function renderCTAContent(cta: any) {
  if (!cta) return null;
  if (typeof cta === 'string') return <div className="text-lg text-emerald-50 mb-4" dangerouslySetInnerHTML={{ __html: cta }} />;
  if (typeof cta === 'object') {
    const heading = cta.heading || cta.title || '';
    const intro = cta.intro || cta.body || cta.text || cta.description || '';
    return (
      <>
        {heading && <div className="text-lg text-emerald-50 font-semibold mb-2" dangerouslySetInnerHTML={{ __html: heading }} />}
        {intro && <div className="text-lg text-emerald-50 mb-4" dangerouslySetInnerHTML={{ __html: intro }} />}
      </>
    );
  }
  return null;
}

export default function ProductTemplate(props: ProductProps & { topContent?: React.ReactNode; rawData?: any }) {
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
    isTreePage = false,
  } = props as ProductProps & { topContent?: React.ReactNode; rawData?: any };

  // STRICT MODE for tree pages
  if (isTreePage) {
    // rawData not required for tree rendering; kept for compatibility
    const mainImage = (gallery && gallery.length > 0) ? gallery[0] : heroImage;
    
    return (
      <div className="min-h-screen">
        {/* Hero */}
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
                {(() => {
                  const heroIntro = typeof (props as any).heroIntro === 'string' ? String((props as any).heroIntro) : (typeof (props as any).rawData?.heroIntro === 'string' ? String((props as any).rawData.heroIntro) : undefined);
                  return heroIntro ? <p className="text-lg sm:text-xl text-emerald-50 leading-relaxed">{firstSentence(heroIntro)}</p> : null;
                })()}
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

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {props.topContent && (
            <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
              {props.topContent}
            </section>
          )}

          {(() => {
            const introText = typeof (props as any).intro === 'string' ? String((props as any).intro) : (typeof (props as any).rawData?.intro === 'string' ? String((props as any).rawData.intro) : undefined);
            if (!introText) return null;
            return (
              <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="text-gray-700 whitespace-pre-line">{introText}</div>
              </section>
            );
          })()}

          <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="space-y-8">
              {/* Kenmerken - STRICT: only render explicit arrays */}
              {kenmerken && kenmerken.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-3">BELANGRIJKE EIGENSCHAPPEN</h3>
                  <ul className="space-y-2 bg-emerald-50 rounded-lg p-6 list-disc pl-5 text-gray-700">
                    {kenmerken.map((k: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1 text-emerald-600">✓</span>
                        <span>{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verzorging - STRICT: only render if sections exist */}
              {verzorging && typeof verzorging === 'object' && 'sections' in verzorging && Array.isArray(verzorging.sections) && verzorging.sections.length > 0 && (
                <div>
                  {'heading' in verzorging && verzorging.heading && <h3 className="text-2xl font-semibold mb-3">{String(verzorging.heading)}</h3>}
                  <div className="space-y-4 text-gray-700">
                    {verzorging.sections.map((s: any, i: number) => (
                      <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
                        {s.title && <h4 className="font-semibold text-gray-900">{s.title}</h4>}
                        {s.content && <p className="mt-2 text-sm">{s.content}</p>}
                        {Array.isArray(s.list) && s.list.length > 0 && (
                          <ul className="mt-2 text-sm list-disc pl-5">
                            {s.list.map((item: string, j: number) => (
                              <li key={j}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Plaatsing + Locatie for tree pages — render only when data exists */}
              {(() => {
                const plaatsingObj = (plaatsing && typeof plaatsing === 'object') ? plaatsing : undefined;
                const inVolleGrond = plaatsingObj ? (plaatsingObj.inVolleGrond ?? plaatsingObj.inVollegrond ?? plaatsingObj.inVolledigeGrond) : undefined;
                const inPotOfBloembak = plaatsingObj ? (plaatsingObj.inPotOfBloembak ?? plaatsingObj.inPotOrBloembak ?? plaatsingObj.inPot) : undefined;
                const hasPlaatsingSections = plaatsingObj && Array.isArray(plaatsingObj.sections) && plaatsingObj.sections.length > 0;
                const hasPlaatsingParts = hasPlaatsingSections || hasContent(inVolleGrond) || hasContent(inPotOfBloembak);

                const locatieObj = (props as any).locatie ?? (props as any).rawData?.locatie;
                const hasLocatie = locatieObj && typeof locatieObj === 'object' && typeof locatieObj.content === 'string' && locatieObj.content.trim().length > 0;

                return (
                  <>
                    {hasPlaatsingParts && (
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-emerald-600 pl-4">{plaatsingObj && plaatsingObj.heading ? String(plaatsingObj.heading) : 'Plaatsing'}</h2>

                        <div className="text-gray-700 space-y-4">
                          {hasPlaatsingSections && plaatsingObj.sections.map((s: any, i: number) => (
                            <div key={i} className="bg-white rounded-lg p-4 border border-gray-100">
                              {s.title && <h4 className="font-semibold text-gray-900">{s.title}</h4>}
                              {s.content && typeof s.content === 'string' && <p className="mt-2 text-sm">{s.content}</p>}
                              {Array.isArray(s.list) && s.list.length > 0 && (
                                <ul className="mt-2 text-sm list-disc pl-5">
                                  {s.list.map((item: string, j: number) => <li key={j}>{item}</li>)}
                                </ul>
                              )}
                            </div>
                          ))}

                          {!hasPlaatsingSections && hasContent(inVolleGrond) && (
                            <div className="bg-white rounded-lg p-4 border border-gray-100">
                              <h4 className="font-semibold text-gray-900">In de volle grond</h4>
                              <div className="mt-2 text-sm" dangerouslySetInnerHTML={{ __html: String(inVolleGrond) }} />
                            </div>
                          )}

                          {!hasPlaatsingSections && hasContent(inPotOfBloembak) && (
                            <div className="bg-white rounded-lg p-4 border border-gray-100">
                              <h4 className="font-semibold text-gray-900">In een bloembak of pot</h4>
                              <div className="mt-2 text-sm" dangerouslySetInnerHTML={{ __html: String(inPotOfBloembak) }} />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {hasLocatie && (
                      <div className="mt-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-emerald-600 pl-4">{String(locatieObj.heading || 'Locatie')}</h2>
                        <div className="text-gray-700">
                          {typeof locatieObj.content === 'string' && <p>{locatieObj.content}</p>}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}

              {/* Long description - STRICT: plain text only */}
              {long_description && (
                <div>
                  <p className="text-gray-700">{long_description}</p>
                </div>
              )}
            </div>

            {/* Right visual */}
            <aside className="flex flex-col gap-6">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white/10 border border-white/20 h-96 flex items-center justify-center">
                {mainImage ? (
                  <img src={mainImage} alt={title || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">🌿</div>
                    <p className="text-emerald-50 font-medium">{title || ''}</p>
                    <p className="text-emerald-200 text-sm mt-2">Afbeelding volgt</p>
                  </div>
                )}
              </div>
            </aside>
          </section>

          {/* CTA - STRICT: only if cta exists, use JSON content */}
          {cta && (
            <section className="w-full py-12">
              <div className="max-w-5xl mx-auto">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
                  {cta.heading && <h2 className="text-3xl font-bold mb-4">{cta.heading}</h2>}
                  {cta.intro && <p className="text-lg text-emerald-50 mb-4">{cta.intro}</p>}
                  {cta.body && <p className="text-lg text-emerald-50 mb-4">{cta.body}</p>}
                  <div className="flex flex-wrap justify-center gap-4">
                    {cta.phone && (
                      <a href={cta.phone.href} className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg">
                        📞 {cta.phone.text}
                      </a>
                    )}
                    {cta.email && (
                      <a href={cta.email.href} className="inline-flex items-center px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg">
                        ✉️ {cta.email.text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    );
  }

  // ORIGINAL BEHAVIOR for non-tree pages (unchanged)
  const mainImage = (gallery && gallery.length > 0) ? gallery[0] : heroImage;
  const pageType = (props as any).page?.type || (props as any).type || '';
  const excludedTypes = ['potgrond', 'voeding', 'verhuur', 'tips'];
const hasPlaatsing = hasContent(plaatsing);
const hasKenmerken = Array.isArray(kenmerken) && kenmerken.length > 0;
const hasVerzorging = hasContent(verzorging);


  // Verzorging should appear either as summary in intro-grid OR as full section, not both
  const showFullVerzorging = hasVerzorging; // full section renders when verzorging exists
  const showVerzorgingSummaryInGrid = hasVerzorging && !showFullVerzorging ? true : false; // effectively false

  // Intro info-grid should only render for trees OR when standplaats/kenmerken exist, and never for excluded types
  const showInfoGrid = !excludedTypes.includes(String(pageType).toLowerCase()) && (String(pageType).toLowerCase() === 'tree' || hasPlaatsing || hasKenmerken);

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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">{firstLine(title)}</h1>
              {(() => {
                const heroIntro = typeof (props as any).heroIntro === 'string' ? String((props as any).heroIntro) : (typeof (props as any).rawData?.heroIntro === 'string' ? String((props as any).rawData.heroIntro) : undefined);
                return heroIntro ? <div className="text-lg sm:text-xl text-emerald-50 leading-relaxed">{firstSentence(heroIntro)}</div> : null;
              })()}
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div className="w-full max-w-md h-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20">
                <div className="text-center p-8">
                  {!isTreePage && (
                    <>
                      <div className="text-6xl mb-4">🌳</div>
                      <p className="text-white/80 text-sm">Afbeelding volgt</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        {!isTreePage && (
          <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-6">
            <ol className="flex items-center space-x-2">
              <li>Home</li>
              <li>/</li>
              <li>Onze bomen</li>
              <li>/</li>
              <li className="font-medium">{title || ''}</li>
            </ol>
          </nav>
        )}

        {props.topContent && (
          <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
            {props.topContent}
          </section>
        )}

        {(() => {
          const introText = typeof (props as any).intro === 'string' ? String((props as any).intro) : (typeof (props as any).rawData?.intro === 'string' ? String((props as any).rawData.intro) : undefined);
          if (!introText) return null;
          return (
            <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="text-gray-700 whitespace-pre-line">{introText}</div>
            </section>
          );
        })()}

        {/* Body intro under breadcrumbs disabled per task */}

        {/* 2) Two-column section: left=content, right=visual */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: structured text in fixed order */}
          <div className="space-y-8">
            {/* Plaatsing */}
            {hasPlaatsing && (
              <div>
                {!isTreePage && <h2 className="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-emerald-600 pl-4">Ideale standplaats</h2>}
                <div className="text-gray-700 space-y-4">
                  {renderSections(plaatsing)}
                </div>
              </div>
            )}

            {/* Kenmerken */}
            {hasKenmerken && (
              <div>
                {!isTreePage && <h3 className="text-2xl font-semibold mb-3">Kenmerken</h3>}
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
            {hasVerzorging && (
              <div>
                {!isTreePage && <h3 className="text-2xl font-semibold mb-3">Verzorging</h3>}
                <div className="space-y-4 text-gray-700">
                  {renderSections(verzorging)}
                </div>
              </div>
            )}

            {/* Details / lange beschrijving */}
            {long_description && (
              <div>
                {!isTreePage && <h3 className="text-2xl font-semibold mb-3">Details</h3>}
                <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: long_description }} />
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
                  {!isTreePage && <div className="text-8xl mb-4">🌿</div>}
                  <p className="text-emerald-50 font-medium">{title || ''}</p>
                  {!isTreePage && <p className="text-emerald-200 text-sm mt-2">Afbeelding volgt</p>}
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
