import React from 'react';
import ServiceCard from '@/components/cards/ServiceCard';
import FourBlocks from '@/components/home/FourBlocks';
import home from '@/content/home.json';

type MainMenuTemplateProps = {
  content: any;
  showServiceCards?: boolean;
  children?: React.ReactNode;
};

// Helper: render plain text with \n as paragraphs
function renderParagraphs(text?: string | null): JSX.Element[] | null {
  if (!text || typeof text !== 'string') return null;
  const normalized = text.replace(/\r\n/g, '\n');
  const parts = normalized.split(/\n+/).filter(p => p.trim());
  if (parts.length === 0) return null;
  return parts.map((p, i) => <p key={i} className="mb-2">{p}</p>);
}

export default function MainMenuTemplate({ content, showServiceCards, children }: MainMenuTemplateProps) {
  const c = content ?? {};

  const headerTitle = c?.hero?.title ?? c?.title ?? c?.name ?? '';
  const resolvedHeroSubtitle = c.hero?.subtitle ?? c.subtitle ?? undefined;
  const resolvedHeroImage = c.hero?.image ?? undefined;
  const resolvedHeroSecondaryImage = c.hero?.secondaryImage ?? c.secondaryImage ?? undefined;

  const getActionHref = (section: any) => section?.link ?? '/contact';

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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">
                {String(headerTitle)}
              </h1>
              {resolvedHeroSubtitle && (() => {
                const subtitleText = String(resolvedHeroSubtitle);
                const isPlain = !/<[^>]+>/.test(subtitleText);
                return isPlain ?
                  <div className="text-lg sm:text-xl text-emerald-50 leading-relaxed">{renderParagraphs(subtitleText)}</div> :
                  <div className="text-lg sm:text-xl text-emerald-50 leading-relaxed" dangerouslySetInnerHTML={{ __html: subtitleText }} />;
              })()}
              {c.hero?.intro && (() => {
                const introText = String(c.hero.intro);
                const isPlain = !/<[^>]+>/.test(introText);
                return isPlain ?
                  <div className="mt-4 text-emerald-50 leading-relaxed">{renderParagraphs(introText)}</div> :
                  <div className="mt-4 text-emerald-50 leading-relaxed" dangerouslySetInnerHTML={{ __html: introText }} />;
              })()}
            </div>

            {resolvedHeroSecondaryImage ? (
              <div className="hidden md:flex justify-center items-center">
                <div className="w-full max-w-md h-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20 overflow-hidden">
                  <img src={resolvedHeroSecondaryImage} alt={headerTitle ?? 'Afbeelding'} className="w-full h-full object-cover rounded-2xl" />
                </div>
              </div>
            ) : (
              <div className="hidden md:flex justify-center items-center">
                <div className="w-full max-w-md h-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🌳</div>
                    <p className="text-white/80 text-sm">Afbeelding volgt</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {showServiceCards !== false && (
            <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <FourBlocks blocks={c?.blocks ?? home.blocks} />
            </section>
          )}

          {(c?.core?.html || c?.core?.content || c?.core?.text) && (
            <section className="bg-white p-6 rounded-lg shadow-sm mb-6 prose max-w-none">
              {c?.core?.html ? (
                <div dangerouslySetInnerHTML={{ __html: c.core.html }} />
              ) : c?.core?.content ? (
                (() => {
                  const coreText = String(c.core.content);
                  const isPlain = !/<[^>]+>/.test(coreText);
                  return isPlain ?
                    <div>{renderParagraphs(coreText)}</div> :
                    <div dangerouslySetInnerHTML={{ __html: coreText }} />;
                })()
              ) : (
                <div>{renderParagraphs(c.core.text)}</div>
              )}
            </section>
          )}

          {Array.isArray(c?.sections) &&
            c.sections.map((section: any, idx: number) => {
              const href = getActionHref(section);
              const isEven = idx % 2 === 0;

              const TextColumn = (
                <div>
                  {Array.isArray(section.highlights) && section.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {section.highlights.map((h: string, i: number) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {section.title && (
                    <h2 className="text-xl font-semibold mb-3">{String(section.title)}</h2>
                  )}

                  {section.html ? (
                    <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.html }} />
                  ) : section.content ? (
                    (() => {
                      const sectionText = String(section.content);
                      const isPlain = !/<[^>]+>/.test(sectionText);
                      return isPlain ?
                        <div className="text-gray-700 leading-relaxed">{renderParagraphs(sectionText)}</div> :
                        <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: sectionText }} />;
                    })()
                  ) : section.text ? (
                    <div className="text-gray-700 leading-relaxed">{renderParagraphs(section.text)}</div>
                  ) : null}

                  <div className="mt-4">
                    <a href={href} className="text-indigo-600 hover:underline text-sm font-medium">
                      Meer informatie
                    </a>
                  </div>
                </div>
              );

              const imageSrc = section.image ?? '/images/placeholder-bloembakken.jpg';

              const ImageColumn = (
                <div className="w-full">
                  <div className="w-full h-48 md:h-56 lg:h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img src={imageSrc} alt={section.title ?? 'Afbeelding'} className="w-full h-full object-cover rounded-lg" />
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

          {c?.benefits && (
            <div>
              {c.benefits.html ? (
                <div className="prose" dangerouslySetInnerHTML={{ __html: c.benefits.html }} />
              ) : Array.isArray(c.benefits) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {c.benefits.map((b: any, i: number) => {
                    const desc = b?.text ?? (b?.html ? String(b.html).replace(/<[^>]+>/g, '') : '');
                    return (
                      <ServiceCard
                        key={i}
                        icon={<span aria-hidden>🌿</span>}
                        title={b?.title ?? ''}
                        description={desc}
                      />
                    );
                  })}
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
