import React from 'react';

export type ProductProps = {
  title?: string;
  short_description?: string;
  long_description?: string;
  heroImage?: string;
  gallery?: string[];
  kenmerken?: string[];
  verzorging?: Record<string, any> | string;
  plaatsing?: Record<string, any> | string;
  price?: string;
  cta?: string;
};

export default function ProductTemplate(props: ProductProps) {
  const {
    title,
    short_description,
    long_description,
    heroImage,
    gallery,
    kenmerken,
    verzorging,
    plaatsing,
    price,
    cta,
  } = props;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 text-white pt-24 pb-16">
        {/* Image layer(s) */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: heroImage ? `url('${heroImage}')` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Extra gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/30 to-emerald-900/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center py-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">{title || ''}</h1>
              <p className="text-lg sm:text-xl text-emerald-50 leading-relaxed">{short_description || ''}</p>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div className="w-full max-w-md h-80 bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex items-center justify-center border-2 border-white/20">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🌳</div>
                  <p className="text-white/80 text-sm">Afbeelding volgt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-6">
          <ol className="flex items-center space-x-2">
            <li>Home</li>
            <li>/</li>
            <li>Onze bomen</li>
            <li>/</li>
            <li className="font-medium">{title || ''}</li>
          </ol>
        </nav>

        {/* Intro / Leadtekst */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Intro</h2>
          <p className="text-gray-700">{short_description || ''}</p>
        </section>

        {/* Plaatsing / Standplaats */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Plaatsing</h2>
          <div className="text-gray-700">
            <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border border-gray-100">{typeof plaatsing === 'string' ? plaatsing || '' : JSON.stringify(plaatsing || {}, null, 2)}</pre>
          </div>
        </section>

        {/* Afbeelding / Visual block */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Afbeeldingen</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(gallery || []).map((g, i) => (
              <img key={i} src={g} alt={`${title || ''} ${i + 1}`} className="w-full h-40 object-cover rounded" />
            ))}
          </div>
        </section>

        {/* Product-specific sections (long_description) */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Details</h2>
          <div className="prose max-w-none text-gray-700">{long_description || ''}</div>
        </section>

        {/* Verzorging */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Verzorging</h2>
          <div className="text-gray-700">
            <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded border border-gray-100">{typeof verzorging === 'string' ? verzorging || '' : JSON.stringify(verzorging || {}, null, 2)}</pre>
          </div>
        </section>

        {/* Kenmerken - render as list even if empty */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Kenmerken</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {(kenmerken || []).map((k, i) => (
              <li key={i}>{k}</li>
            ))}
          </ul>
        </section>

        {/* CTA / Prijs / Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Interesse</h2>
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl p-6">
            <p className="text-lg font-medium">{price || ''}</p>
            <p className="mt-3">{cta || ''}</p>
            <div className="mt-4 flex gap-4">
              <a href={`tel:+31611929392`} className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg">📞 +31 6 11929392</a>
              <a href={`mailto:lisette@spaansetuin-enzo.nl`} className="inline-flex items-center px-6 py-3 bg-emerald-800 text-white font-semibold rounded-lg">✉️ E-mail ons</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
