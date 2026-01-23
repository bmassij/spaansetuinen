"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import ServiceCard from '@/components/cards/ServiceCard';
import FourBlocks from '@/components/home/FourBlocks';
import home from '@/content/home.json';
import ContactForm from '@/components/ui/ContactForm';

type RichContentLayoutProps = {
  content: any;
  showServiceCards?: boolean;
};

// Helper: render rich text with proper paragraph breaks
function renderRichText(text: string): JSX.Element[] {
  const normalized = text.replace(/\r\n/g, '\n');
  const paragraphs = normalized.split('\n\n').filter(p => p.trim());
  
  return paragraphs.map((block, i) => (
    <p key={i} className="mb-4 leading-relaxed">
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
  return parts.map((p, i) => <p key={i} className="mb-4 leading-relaxed">{p}</p>);
}

// Render description into the three required blocks for the verhuur page
function renderDescriptionSplit(description: string, headerTitle: string) {
  const normalized = description.replace(/\r\n/g, '\n');
  const paragraphs = normalized.split('\n\n').filter(p => p.trim());
  const blocks: { intro: string[]; how: string[]; occasions: string[] } = { intro: [], how: [], occasions: [] };

  // Block 1: first two paragraphs
  blocks.intro = paragraphs.slice(0, 2);

  // Remaining paragraphs: classify by keywords into how / occasions
  const howKeywords = ['plaats', 'plaatsen', 'verzorg', 'ophaal', 'ophalen'];
  const occKeywords = ['bruiloft', 'event', 'wow', 'gelegenheid', 'gelegenheden'];

  paragraphs.slice(2).forEach(p => {
    const lower = p.toLowerCase();
    if (howKeywords.some(k => lower.includes(k))) {
      blocks.how.push(p);
    } else if (occKeywords.some(k => lower.includes(k))) {
      blocks.occasions.push(p);
    } else {
      // If unclear, prefer 'how' to keep flow (most description text about process)
      blocks.how.push(p);
    }
  });

  return (
    <>
      <section>
        {blocks.intro.map((p, i) => <p key={`intro-${i}`} className="mb-4 leading-relaxed">{p.split('\n').join(' ')}</p>)}
      </section>

      {blocks.how.length > 0 && (
        <section className="mt-10">
          <h2 className="mt-10 mb-4 text-2xl font-semibold text-gray-900">Hoe werkt verhuur?</h2>
          {blocks.how.map((p, i) => <p key={`how-${i}`} className="mb-4 leading-relaxed">{p.split('\n').join(' ')}</p>)}
        </section>
      )}

      {blocks.occasions.length > 0 && (
        <section className="mt-10">
          <h2 className="mt-10 mb-4 text-2xl font-semibold text-gray-900">Voor welke gelegenheden?</h2>
          {blocks.occasions.map((p, i) => <p key={`occ-${i}`} className="mb-4 leading-relaxed">{p.split('\n').join(' ')}</p>)}
        </section>
      )}
    </>
  );
}

export default function RichContentLayout({ content, showServiceCards }: RichContentLayoutProps) {
  const c = content ?? {};
  const [showContactForm, setShowContactForm] = useState(false);

  const headerTitle = c?.hero?.title ?? c?.title ?? c?.name ?? '';
  const resolvedHeroSubtitle = c.hero?.subtitle ?? c.subtitle ?? undefined;
  const resolvedHeroImage = c.hero?.image ?? undefined;
  const resolvedHeroSecondaryImage = c.hero?.secondaryImage ?? c.secondaryImage ?? undefined;

  // Detect verhuur page by title or slug
  const isVerhuur = String(headerTitle).toLowerCase().includes('verhuur') || String(c?.slug ?? '').toLowerCase() === 'verhuur';

  // CTA values (use existing fields when present)
  const ctaText = c.cta?.intro ?? null;
  const phoneObj = c.cta?.phone ?? c.contact?.phone ?? c.phone ?? null;
  const emailObj = c.cta?.email ?? c.contact?.email ?? c.email ?? null;
  const phone = phoneObj?.text ?? (typeof phoneObj === 'string' ? phoneObj : null);
  const email = emailObj?.text ?? (typeof emailObj === 'string' ? emailObj : null);

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

          {isVerhuur && Array.isArray(c?.benefits) && c.benefits.length > 0 ? (
            // Verhuur layout: two-column grid with text left and benefits right
            <section className="bg-white p-6 md:p-8 rounded-lg shadow-sm mt-10">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: description + sections (text) */}
                <div className="prose max-w-none text-gray-700">
                  {/* Main Description */}
                  {c.description && (
                    <div className="mb-6">
                      {renderDescriptionSplit(String(c.description), String(headerTitle))}
                    </div>
                  )}

                  {/* Sections */}
                  {Array.isArray(c.sections) && c.sections.length > 0 && (
                    <div className="space-y-8 mt-10">
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
                          {/* Section images: do NOT render on the verhuur page */}
                          {!isVerhuur && section.image && (
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
                </div>

                {/* Right: benefits grid */}
                <div className="">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
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
              </div>
            </section>
          ) : (
            // Default layout: benefits above, then rich content as before
            <>
              {/* Benefits Grid */}
              {Array.isArray(c?.benefits) && c.benefits.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
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
              <section className="bg-white p-6 md:p-8 rounded-lg shadow-sm mt-10">
                <div className="prose max-w-none text-gray-700">
                  {/* Main Description */}
                  {c.description && (
                    <div className="mb-6">
                      {isVerhuur ? renderDescriptionSplit(String(c.description), String(headerTitle)) : renderRichText(String(c.description))}
                    </div>
                  )}

                  {/* Sections */}
                  {Array.isArray(c.sections) && c.sections.length > 0 && (
                    <div className="space-y-8 mt-10">
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
                          {/* Section images: do NOT render on the verhuur page */}
                          {!isVerhuur && section.image && (
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

                  {/* Note: top-level content.images are intentionally not rendered on the verhuur page */}
                </div>
              </section>
            </>
          )}

          {/* CTA block — rendered as final, visually separated block */}
          {ctaText && (
            isVerhuur ? (
              <section className="w-full py-12">
                <div className="max-w-5xl mx-auto">
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">{(c.cta && c.cta.heading && String(c.cta.heading).trim()) ? String(c.cta.heading) : 'Interesse?'}</h2>
                    {ctaText && <p className="text-lg text-emerald-50 mb-4">{ctaText}</p>}
                    <div className="flex flex-wrap justify-center gap-4">
                      {c.cta?.phone && c.cta.phone.href && (
                        <a href={String(c.cta.phone.href)} className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg">📞 {String(c.cta.phone.text ?? phone)}</a>
                      )}
                      {c.cta?.email && c.cta.email.href && (
                        <a href={String(c.cta.email.href)} className="inline-flex items-center px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg">✉️ {String(c.cta.email.text ?? email)}</a>
                      )}
                      {/* Extra button opening the contactformulier modal */}
                      <button onClick={() => setShowContactForm(true)} className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg">Contactformulier</button>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <section className="mt-14">
                <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="prose max-w-none text-gray-700">
                    {renderRichText(String(ctaText))}
                    {phone && <p className="mb-4">{phone}</p>}
                    {email && <p className="mb-4">{email}</p>}
                    <div>
                      <a href="/contact" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700">
                        Contactformulier
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            )
          )}

          {/* Modal for ContactForm (verhuur) */}
          {isVerhuur && showContactForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowContactForm(false)} />
              <div className="relative z-60 max-w-xl w-full mx-4">
                <div className="bg-white rounded-lg shadow-xl p-6">
                  <div className="flex justify-end">
                    <button aria-label="Sluit" onClick={() => setShowContactForm(false)} className="text-gray-500 hover:text-gray-700">✕</button>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
