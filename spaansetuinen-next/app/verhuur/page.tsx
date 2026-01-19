import fs from 'fs/promises';
import path from 'path';
export const dynamic = 'force-dynamic';

export default async function Page() {
  const filePath = path.join(process.cwd(), 'content', 'verhuur.json');
  let content: any = {};
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    content = JSON.parse(raw);
  } catch (err) {
    content = {};
  }

  // Presentation-only highlights per section title
  const HIGHLIGHTS: Record<string, string[]> = {
    'Verhuur opties': ['Flexibel', 'Kort & lang'],
    'Service': ['Levering', 'Installatie'],
  };
  const getHighlights = (title?: string) => (title ? HIGHLIGHTS[title] ?? [] : []);
  const getActionHref = (title?: string) => (title && title.toLowerCase().includes('verhuur') ? '/verhuur' : '/contact');

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8">
        {content.hero?.title && (
          <h1 className="text-3xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: content.hero.title }} />
        )}
        {content.hero?.subtitle && (
          <p className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: content.hero.subtitle }} />
        )}
      </header>

      {content.core?.html ? (
        <section className="bg-white p-6 rounded-lg shadow-sm mb-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: content.core.html }} />
      ) : content.core?.content ? (
        <section className="bg-white p-6 rounded-lg shadow-sm mb-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: content.core.content }} />
      ) : content.core?.text ? (
        <section className="bg-white p-6 rounded-lg shadow-sm mb-6 prose max-w-none">{content.core.text}</section>
      ) : null}

      {Array.isArray(content.sections) &&
        content.sections.map((section: any, idx: number) => {
          const highlights = getHighlights(section.title);
          const href = getActionHref(section.title);
          const isEven = idx % 2 === 0;

          const TextColumn = (
            <div>
              {highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {highlights.map((h: string, i: number) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{h}</span>
                  ))}
                </div>
              )}

              {section.title && (
                <h2 className="text-2xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: section.title }} />
              )}

              {section.html ? (
                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.html }} />
              ) : section.content ? (
                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
              ) : section.text ? (
                <div className="text-gray-700 leading-relaxed">{section.text}</div>
              ) : null}

              <div className="mt-4">
                <a href={href} className="text-indigo-600 hover:underline text-sm font-medium">Meer informatie</a>
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
            <section key={idx} className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
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

      {content.benefits ? (
        <aside className="mt-12">
          {content.benefits.html ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: content.benefits.html }} />
          ) : Array.isArray(content.benefits) ? (
            <ul className="list-disc ml-6">
              {content.benefits.map((b: any, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
              ))}
            </ul>
          ) : (
            <div className="prose">{content.benefits}</div>
          )}
        </aside>
      ) : null}
    </main>
  );
}
