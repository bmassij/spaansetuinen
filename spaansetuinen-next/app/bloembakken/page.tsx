import MainMenuTemplate from '../../components/layouts/MainMenuTemplate';
import content from '../../content/bloembakken.json';

export default function BloembakkenPage() {
  const c = content as any;

  // Define highlights per section title (presentation only)
  const HIGHLIGHTS: Record<string, string[]> = {
    'Prijzen bloembakken': ['Transparante prijzen', 'Snel overzicht', 'Meer opties'],
    'Bloembakken voor beplanting': ['Op maat', 'Klaar voor beplanting', 'Duurzaam materiaal'],
  };

  const getHighlights = (title?: string) => {
    if (!title) return [];
    return HIGHLIGHTS[title] ?? [];
  };

  const getActionHref = (title?: string) => {
    if (!title) return '/contact';
    const t = title.toLowerCase();
    if (t.includes('prijzen') || t.includes('prijs')) return '/bloembakken/prijzen';
    if (t.includes('beplant') || t.includes('beplanting')) return '/bloembakken-op-maat';
    return '/contact';
  };

  return (
    <MainMenuTemplate
      heroTitle={c?.hero?.title}
      heroSubtitle={c?.hero?.subtitle ?? undefined}
      heroImage={c?.hero?.image ?? undefined}
      intro={undefined}
      blocks={undefined}
    >
      {/* Intro / core content — always render first as a wide prose card */}
      {(c?.core?.html || c?.core?.content || c?.core?.text) && (
        <section className="bg-white p-6 rounded-lg shadow-sm mb-6 prose max-w-none">
          {c?.core?.html ? (
            <div dangerouslySetInnerHTML={{ __html: c.core.html }} />
          ) : c?.core?.content ? (
            <div dangerouslySetInnerHTML={{ __html: c.core.content }} />
          ) : (
            <div>{c.core.text}</div>
          )}
        </section>
      )}

      {/* Sections rendered as separate two-column cards (text + placeholder image), alternating layout */}
      {Array.isArray(c?.sections) &&
        c.sections.map((section: any, idx: number) => {
          const highlights = getHighlights(section.title);
          const href = getActionHref(section.title);
          const isEven = idx % 2 === 0; // even: text left, image right

          const TextColumn = (
            <div>
              {/* Highlights as chips/pills */}
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {highlights.map((h: string, i: number) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {h}
                    </span>
                  ))}
                </div>
              )}

              {section.title && <h2 className="text-xl font-semibold mb-3">{section.title}</h2>}

              {section.html ? (
                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.html }} />
              ) : section.content ? (
                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
              ) : section.text ? (
                <p className="text-gray-700 leading-relaxed">{section.text}</p>
              ) : null}

              {/* Action link */}
              <div className="mt-4">
                <a href={href} className="text-indigo-600 hover:underline text-sm font-medium">
                  Meer informatie
                </a>
              </div>
            </div>
          );

          const ImageColumn = (
            <div className="hidden md:block">
              <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="/images/placeholder-bloembakken.jpg"
                  alt={section.title ?? 'Bloembakken'}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          );

          return (
            <section key={idx} className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {isEven ? (
                  <>
                    {TextColumn}
                    {ImageColumn}
                  </>
                ) : (
                  <>
                    {ImageColumn}
                    {TextColumn}
                  </>
                )}
              </div>
            </section>
          );
        })}

      {/* Benefits shown as compact cards in a grid */}
      {Array.isArray(c?.benefits) && c.benefits.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.benefits.map((b: any, i: number) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
              {b?.title && <h3 className="text-lg font-medium mb-2">{b.title}</h3>}
              {b?.html ? (
                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: b.html }} />
              ) : b?.text ? (
                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: b.text }} />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </MainMenuTemplate>
  );
}
