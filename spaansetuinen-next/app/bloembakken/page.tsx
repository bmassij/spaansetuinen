import MainMenuTemplate from '../../components/layouts/MainMenuTemplate';
import content from '../../content/bloembakken.json';

export default function BloembakkenPage() {
  const c = content as any;

  return (
    <MainMenuTemplate
      heroTitle={c?.hero?.title}
      heroSubtitle={c?.hero?.subtitle ?? undefined}
      heroImage={c?.hero?.image ?? undefined}
      intro={undefined}
      blocks={undefined}
    >
      {/* Intro / core content — rendered as a single prose card */}
      {c?.core?.html && (
        <section className="bg-white p-6 rounded-lg shadow-sm mb-6 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: c.core.html }} />
        </section>
      )}

      {/* Sections arranged in responsive grid of cards */}
      {Array.isArray(c?.sections) && c.sections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {c.sections.map((section: any, idx: number) => (
            <article key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              {section?.title && <h2 className="text-xl font-semibold mb-3">{section.title}</h2>}

              {section?.html ? (
                <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.html }} />
              ) : section?.content ? (
                <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.content }} />
              ) : section?.text ? (
                <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: section.text }} />
              ) : null}
            </article>
          ))}
        </div>
      )}

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
