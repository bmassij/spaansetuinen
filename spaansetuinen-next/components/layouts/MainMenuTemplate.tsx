import React from 'react';
import ServiceCard from '@/components/cards/ServiceCard';
import FourBlocks from '@/components/home/FourBlocks';
import home from '@/content/home.json';

type MainMenuTemplateProps = {
  content: any;
};

export default function MainMenuTemplate({ content }: MainMenuTemplateProps) {
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white" dangerouslySetInnerHTML={{ __html: String(headerTitle) }} />
              {resolvedHeroSubtitle && (
                <div className="text-lg sm:text-xl text-emerald-50 leading-relaxed" dangerouslySetInnerHTML={{ __html: String(resolvedHeroSubtitle) }} />
              )}
              {c.hero?.intro && (
                <div className="mt-4 text-emerald-50 leading-relaxed" dangerouslySetInnerHTML={{ __html: String(c.hero.intro) }} />
              )}
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
          {/* Four-blocks (homepage cards) rendered inside white content wrapper above core text */}
          <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <FourBlocks blocks={home.blocks} />
          </section>

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
              const href = getActionHref(section);
              const isEven = idx % 2 === 0;

              const TextColumn = (
                <div>
                  {/* Highlights (if present in JSON) */}
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
                    <h2 className="text-xl font-semibold mb-3" dangerouslySetInnerHTML={{ __html: String(section.title) }} />
                  )}

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

          {/* Benefits */}
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

        </div>
      </main>
    </div>
  );
}
