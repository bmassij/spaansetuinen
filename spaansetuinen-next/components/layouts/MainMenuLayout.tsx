import React from 'react';

type MainMenuLayoutProps = {
  content?: any;
  highlights?: Record<string, string[]>;
  getActionHref?: (title?: string) => string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  children?: React.ReactNode;
};

export default function MainMenuLayout({
  content,
  highlights = {},
  getActionHref = () => '/contact',
  heroTitle,
  heroSubtitle,
  heroImage,
  children,
}: MainMenuLayoutProps) {
  const c = content ?? {};

  const resolvedHeroTitle = heroTitle ?? c.hero?.title ?? c.title ?? '';
  const resolvedHeroSubtitle = heroSubtitle ?? c.hero?.subtitle ?? c.subtitle ?? undefined;
  const resolvedHeroImage = heroImage ?? c.hero?.image ?? undefined;

  const getHighlightsFor = (title?: string) => (title ? highlights[title] ?? [] : []);

  return (
    <div className="min-h-screen">
      <header className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white pt-24 pb-16">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: resolvedHeroImage ? `url('${resolvedHeroImage}')` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/30 to-emerald-900/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-8">
            <div>
              {resolvedHeroTitle && (
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white" dangerouslySetInnerHTML={{ __html: String(resolvedHeroTitle) }} />
              )}
              {resolvedHeroSubtitle && (
                <div className="text-lg sm:text-xl text-emerald-50 leading-relaxed" dangerouslySetInnerHTML={{ __html: String(resolvedHeroSubtitle) }} />
              )}
              {c.hero?.intro && (
                <div className="mt-4 text-emerald-50 leading-relaxed" dangerouslySetInnerHTML={{ __html: String(c.hero.intro) }} />
              )}
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
        <div className="grid gap-6">
          {/* Core / intro block */}
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

          {/* Sections rendered as two-column cards */}
          {Array.isArray(c?.sections) &&
            c.sections.map((section: any, idx: number) => {
              const hls = getHighlightsFor(section.title);
              const href = getActionHref ? getActionHref(section.title) : '/contact';
              const isEven = idx % 2 === 0;

              const TextColumn = (
                <div>
                  {hls.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {hls.map((h: string, i: number) => (
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
                    <img src="/images/placeholder-bloembakken.jpg" alt={section.title ?? 'Afbeelding'} className="w-full h-full object-cover rounded-lg" />
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

          {/* Benefits */}
          {c?.benefits && (
            <div>
              {c.benefits.html ? (
                <div className="prose" dangerouslySetInnerHTML={{ __html: c.benefits.html }} />
              ) : Array.isArray(c.benefits) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {c.benefits.map((b: any, i: number) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                      {b?.title && <h3 className="text-lg font-medium mb-2">{b.title}</h3>}
                      {b?.html ? (
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: b.html }} />
                      ) : b?.text ? (
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: b.text }} />
                      ) : (
                        null
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <aside className="mt-12">
                  <div className="prose">{c.benefits}</div>
                </aside>
              )}
            </div>
          )}

          {children}
        </div>
      </main>
    </div>
  );
}
