import React from "react";
import FourBlocks from '@/components/home/FourBlocks';
import home from '@/content/home.json';

type Props = {
  content: {
    hero?: {
      title?: string;
      subtitle?: string;
    };
    core?: {
      html?: string;
    };
    details?: string[];
  };
};

export default function BloembakkenLayout({ content }: Props) {
  return (
    <>
      {/* Hero — gebruik alleen hero.title en hero.subtitle */}
      <header className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white pt-24 pb-16">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">{content?.hero?.title ?? ''}</h1>
              {content?.hero?.subtitle && (
                <div className="text-lg sm:text-xl text-emerald-50 leading-relaxed" dangerouslySetInnerHTML={{ __html: String(content.hero.subtitle) }} />
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* FourBlocks — dezelfde component als homepage */}
        <section className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <FourBlocks blocks={home.blocks} />
        </section>

        {/* Hoofdtekst — core.html EXACT één keer */}
        {content?.core?.html && (
          <section className="bg-white p-6 rounded-lg shadow-sm mb-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: content.core.html }} />
        )}

        {/* Details checklist */}
        {Array.isArray(content?.details) && content.details.length > 0 && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-3">Details</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {content.details.map((d, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: String(d) }} />
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
