import React from 'react';
import Image from 'next/image';
import ServiceCard from '@/components/cards/ServiceCard';
import FourBlocks from '@/components/home/FourBlocks';
import home from '@/content/home.json';

type RichContentLayoutProps = {
  content: any;
  showServiceCards?: boolean;
};

// Helper: render rich text with proper paragraph breaks
function renderRichText(text: string): JSX.Element[] {
  const normalized = text.replace(/\r\n/g, '\n');
  const paragraphs = normalized.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map((block, i) => (
    <p key={i} className="mb-4">
      {block.split('\n').join(' ')}
    </p>
  ));
}

// Helper: render plain text with \n as paragraphs
function renderParagraphs(text?: string | null): JSX.Element[] | null {
  if (!text || typeof text !== 'string') return null;
  const normalized = text.replace(/\r\n/g, '\n');
  const parts = normalized.split(/\n+/).filter(p => p.trim());
  if (parts.length === 0) return null;
  return parts.map((p, i) => <p key={i} className="mb-2">{p}</p>);
}

export default function RichContentLayout({ content, showServiceCards }: RichContentLayoutProps) {
  const c = content ?? {};

  const headerTitle = c?.hero?.title ?? c?.title ?? c?.name ?? '';
  const resolvedHeroSubtitle = c.hero?.subtitle ?? c.subtitle ?? undefined;
  const resolvedHeroImage = c.hero?.image ?? undefined;
  const resolvedHeroSecondaryImage = c.hero?.secondaryImage ?? c.secondaryImage ?? undefined;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
          {/* Service Cards */}
          {showServiceCards !== false && (
            <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <FourBlocks blocks={c?.blocks ?? home.blocks} />
            </section>
          )}

          {/* Benefits Grid */}
          {Array.isArray(c?.benefits) && c.benefits.length > 0 && (
            <div className="mb-8">
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
            </div>
          )}

          {/* Rich Content Section */}
          <section className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
            <div className="prose max-w-none text-gray-700">
              {/* Main Description */}
              {c.description && (
                <div className="mb-6">
                  {renderRichText(c.description)}
                </div>
              )}

              {/* Sections */}
              {Array.isArray(c.sections) && c.sections.length > 0 && (
                <div className="space-y-8">
                  {c.sections.map((section: any, idx: number) => (
                    <div key={idx}>
                      {section.title && (
                        <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                          {String(section.title)}
                        </h3>
                      )}
                      {section.content && (
                        <div className="mb-4">
                          {renderRichText(section.content)}
                        </div>
                      )}
                      {section.image && (
                        <div className="my-6">
                          <Image
                            src={String(section.image)}
                            alt={String(section.title ?? 'Sectie afbeelding')}
                            width={800}
                            height={600}
                            className="rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              {c.cta?.intro && (
                <div className="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                  {renderRichText(c.cta.intro)}
                  <div className="mt-4">
                    <a href="/contact" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700">
                      Contactformulier
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
