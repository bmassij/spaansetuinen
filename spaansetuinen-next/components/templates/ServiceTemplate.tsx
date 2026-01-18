import React from 'react';

// ServiceTemplate — strict, predictable template
// Purpose: ProductLayout zonder productlogica. Geen heuristiek, geen fallback, vaste blokken en volgorde.
// Visuele classes en structuur zijn 1-op-1 gebaseerd op ProductTemplate voor consistent ritme/gewicht.

export default function ServiceTemplate({ content }: { content: any }) {
  return (
    <div className="min-h-screen">
      {/* HERO — exact dezelfde visuele behandeling als ProductTemplate */}
      <header className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white pt-24 pb-16">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            // Render alleen als content.hero.image aanwezig is — geen fallback-logica
            backgroundImage: content?.hero?.image ? `url('${content.hero.image}')` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/30 to-emerald-900/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-8">
            <div>
              {/* content.hero.title is required to render here; render nothing if absent (template is dumb) */}
              {content?.hero?.title && (
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">
                  {content.hero.title}
                </h1>
              )}

              {/* optional subtitle — only render if present */}
              {content?.hero?.subtitle && (
                <p className="text-lg sm:text-xl text-emerald-50 leading-relaxed">{content.hero.subtitle}</p>
              )}
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div className="w-full max-w-md h-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20">
                <div className="text-center p-8">
                  {/* Intentionally render nothing else here; visuals come strictly from content.hero.image or content.hero.icon (if supplied) */}
                  {content?.hero?.icon && <div className="text-6xl mb-4">{content.hero.icon}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* SERVICE CORE — centraal, compact, visueel afgebakend
            This block maps to the "kenmerken/specs" area in ProductTemplate in terms of visual weight and centering. */}
        {content?.core && (
          <section className="mb-12">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border-2 border-emerald-100">
                {content.core.title && <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.core.title}</h2>}
                {content.core.html && (
                  <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: content.core.html }} />
                )}
              </div>
            </div>
          </section>
        )}

        {/* SERVICE ITEMS — secundair (grid of cards). Render only if content.services is an array. */}
        {Array.isArray(content?.services) && content.services.length > 0 && (
          <section className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {content.services.map((item: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  {/* Strict fields: title + html only */}
                  {item?.title && <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>}
                  {item?.html && <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: item.html }} />}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BENEFITS — render only content.benefits array; each item must contain html */}
        {Array.isArray(content?.benefits) && content.benefits.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{content?.benefitsTitle || 'Voordelen'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {content.benefits.map((b: any, i: number) => (
                <div key={i} className="bg-emerald-50 rounded-lg p-6">
                  {b?.html && <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: b.html }} />}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* OVERIGE SECTIES — render only content.sections array with explicit fields title + html */}
        {Array.isArray(content?.sections) && content.sections.length > 0 && (
          <section className="mb-12 space-y-8">
            {content.sections.map((s: any, i: number) => (
              <div key={i}>
                {s?.title && <h3 className="text-2xl font-semibold text-gray-900 mb-3">{s.title}</h3>}
                {s?.html && <div className="prose text-gray-700" dangerouslySetInnerHTML={{ __html: s.html }} />}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
