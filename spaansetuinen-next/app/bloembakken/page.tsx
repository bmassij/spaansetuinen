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

      {/* Sections rendered as separate two-column cards (text + placeholder image) */}
      {Array.isArray(c?.sections) &&
        c.sections.map((section: any, idx: number) => (
          <section key={idx} className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Text */}
              <div>
                {section.title && <h2 className="text-xl font-semibold mb-3">{section.title}</h2>}

                {section.html ? (
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.html }} />
                ) : section.content ? (
                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
                ) : section.text ? (
                  <p className="text-gray-700 leading-relaxed">{section.text}</p>
                ) : null}
              </div>

              {/* Image placeholder */}
              <div className="hidden md:block">
                <img
                  src="/images/placeholder-bloembakken.jpg"
                  alt={section.title ?? 'Bloembakken'}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </section>
        ))}

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
