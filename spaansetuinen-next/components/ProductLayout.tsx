export default function ProductLayout({ page }: { page: any }) {
  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {page?.title && (
            <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
          )}

          {page?.heroText && (
            <p className="text-lg mb-4">{page.heroText}</p>
          )}

          {page?.image && (
            <div className="mb-4">
              <img
                src={page.image}
                alt={page.title || ''}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {page?.intro && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Intro</h2>
              <p>{page.intro}</p>
            </section>
          )}

          {page?.kenmerken && Array.isArray(page.kenmerken) && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Kenmerken</h2>
              <ul className="list-disc pl-5">
                {page.kenmerken.map(
                  (k: any, i: number) => k && <li key={i}>{k}</li>
                )}
              </ul>
            </section>
          )}

          {page?.verzorging && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Verzorging</h2>
              <p>{page.verzorging}</p>
            </section>
          )}

          {page?.plaatsing && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Plaatsing</h2>
              <p>{page.plaatsing}</p>
            </section>
          )}

          {page?.cta && (
            <section className="mb-6">
              <div>{page.cta}</div>
            </section>
          )}

          {page?.short_description && (
            <p className="mb-4">{page.short_description}</p>
          )}

          {page?.long_description && (
            <div className="prose max-w-none">{page.long_description}</div>
          )}
        </div>
      </main>
    </>
  );
}
