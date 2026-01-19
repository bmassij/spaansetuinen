import content from '../../content/bezorgen.json';
const contentData: any = content;
export const dynamic = 'force-dynamic';

export default function Page(): JSX.Element {
  const hero = contentData?.hero ?? {};
  const coreHtml = contentData?.core?.html ?? contentData?.core?.content ?? contentData?.core?.text ?? '';
  const sections = Array.isArray(contentData?.sections) ? contentData.sections : [];
  const benefits = Array.isArray(contentData?.benefits) ? contentData.benefits : [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {(hero.title || hero.subtitle || hero.image) && (
        <header className="mb-8 text-center">
          {hero.title && <h1 className="text-3xl font-bold">{hero.title}</h1>}
          {hero.subtitle && <p className="mt-2 text-lg text-gray-700">{hero.subtitle}</p>}
          {hero.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.image} alt={hero.title ?? 'Hero image'} className="mx-auto mt-4" />
          )}
        </header>
      )}

      {coreHtml && (
        <section className="prose mb-8" dangerouslySetInnerHTML={{ __html: coreHtml }} />
      )}

      {sections.length > 0 && (
        <section className="mb-8">
          {sections.map((sec: any, i: number) => (
            <div key={i} className="mb-6">
              {sec.title && <h2 className="text-2xl font-semibold mb-2">{sec.title}</h2>}

              {Array.isArray(sec.items) ? (
                <ul className="list-disc pl-6 space-y-2">
                  {sec.items.map((it: any, j: number) => (
                    <li key={j}>
                      {it.title && <strong>{it.title}</strong>}
                      {it.description && <div className="mt-1">{it.description}</div>}
                    </li>
                  ))}
                </ul>
              ) : sec.html ? (
                <div dangerouslySetInnerHTML={{ __html: sec.html }} />
              ) : sec.text ? (
                <p>{sec.text}</p>
              ) : null}
            </div>
          ))}
        </section>
      )}

      {benefits.length > 0 && (
        <section>
          {benefits.map((b: any, k: number) => (
            <div key={k} className="mb-4" dangerouslySetInnerHTML={{ __html: b.html ?? b.content ?? b.text ?? '' }} />
          ))}
        </section>
      )}
    </main>
  );
}
